const { createGameState, gameLoop, addPlayer, resetState } = require('./gameLogic/gameMain');
const { getUpdatedVelocity, areVelocityReversed} = require("./gameLogic/helper")
const { makeid } = require('./utils');
const { FRAME_RATE, MAX_PLAYER } = require('./constant')

const express = require("express");
const cors = require("cors");
const app = express();

//socket.io
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: "*",
  mehtods: ["GET", "POST", "PUT", "DELETE"],
});

let clientRooms = {};
let state = {};

app.use(cors());
app.use(express.static("../client/build"));
// Cors allow all origins
app.get("/", function (req, res) {
  res.sendFile("index.html", { root: __dirname });
});

//Connexion
io.on("connection", (socket) => {
  console.log(`New user connect : ${socket.id}`);

  socket.on("disconnect", (reason) => {
    console.log(`${socket.id} has disconnected`);
  });

  socket.on("keydown", onkeydown);
  socket.on("create_room", onCreateRoom)
  socket.on("join_room", onJoinRoom)

  function onkeydown(keyCode) {
    const roomName = clientRooms[socket.id];
    if (!roomName) {
      return;
    }
    try {
      keyCode = parseInt(keyCode);
    } catch(e) {
      console.error(e);
      return;
    }
    const velocity = getUpdatedVelocity(keyCode);
    let playerDirection =  state[roomName].players[socket.id].direction;
    if(velocity && !areVelocityReversed(velocity, playerDirection))
    {
      state[roomName].players[socket.id].direction = velocity;
    }
  }

  function onCreateRoom(data) {
    let roomName = makeid(5);
    clientRooms[socket.id] = roomName;
    console.log(`roomName created : ${roomName}`);
    
    let initialState = createGameState(socket.id);
    initialState.fieldSize = data.fieldSize;
    addPlayer(initialState,socket.id,data.player_color);
    state[roomName] = initialState;

    socket.join(roomName);
    socket.emit('gameCode', roomName);
    socket.emit("new_user", ({ 'count': 1, 'socket_id': socket.id }));
    socket.emit("init", state[roomName])

    startGameInterval(roomName);
  }

  function onJoinRoom(data) {
    const room = io.sockets.adapter.rooms.get(data.roomName);
    if (!room) {
      socket.emit('unknownCode');
      return
    }

    let playerCount = room.size;
    if (playerCount == 0) {
      socket.emit('unknownCode');
      return;
    } else if (playerCount > MAX_PLAYER) {
      socket.emit('tooManyPlayers');
      return;
    }

    clientRooms[socket.id] = data.roomName;
    addPlayer(state[data.roomName],socket.id, data.player_color);

    socket.join(data.roomName);
    io.sockets.in(data.roomName).emit("new_user", ({ 'count': playerCount+1, 'socket_id': socket.id }));
    io.sockets.in(data.roomName).emit('init', state[data.roomName]);
    socket.emit('gameCode', data.roomName);
  }
});

//on change app par server
server.listen(3030, function () {
  console.log("Server ready on port 3030");
});

function startGameInterval(roomName) {
  const intervalId = setInterval(() => {
    const loosers = gameLoop(state[roomName]);
    if (loosers.length == 0) {
      emitGameState(roomName, state[roomName])
    } else {
      emitGameOver(roomName, loosers);
      clearInterval(intervalId);
      resetGame(roomName);
    }
  }, 1000 / FRAME_RATE);
}

function emitGameState(room, gameState) {
  // Send this event to everyone in the room.
  io.sockets.in(room)
    .emit('gameState', gameState);
}

function emitGameOver(room, loosers) {
  io.sockets.in(room)
    .emit('gameOver', loosers);
}

function resetGame(roomName)
{
  //clean state
  resetState(state[roomName]);
  //restart game
  io.sockets.in(roomName).emit('init', state[roomName]);
  startGameInterval(roomName);
}