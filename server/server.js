const { createGameState, gameLoop, addPlayer, resetState } = require('./gameLogic/gameMain');
const { getUpdatedVelocity } = require("./gameLogic/helper")
const { makeid } = require('./utils');
const { FRAME_RATE } = require('./constant')

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

//etablissement de la connexion
io.on("connection", (socket) => {
  console.log(`New user connect : ${socket.id}`);

  socket.on("disconnect", (reason) => {
    console.log(`${socket.id} has disconnected`);
  });

  socket.on("keydown", onkeydown);
  socket.on("create_room", onCreateRoom)
  socket.on("join_room", onJoinRoom)

  function onkeydown(keyCode) {
    //console.log("receive keycode : ", keyCode)
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
    let player = state[roomName].players[socket.number -1]
    const velocity = getUpdatedVelocity(keyCode);
    if(velocity)
    {
      state[roomName].players[socket.number -1].direction = velocity;
    }
  }

  function onCreateRoom() {
    let roomName = makeid(5);
    clientRooms[socket.id] = roomName;
    console.log(roomName);
    socket.emit('gameCode', roomName);

    let initialState = createGameState();
    //console.log(initialState.players[0].dots)
    state[roomName] = initialState;

    socket.join(roomName);
    socket.number = 1;
    socket.emit("new_user", ({ 'count': socket.number, 'socket_id': socket.id }));
    //console.log(`Init with ${state[roomName]}`)
    socket.emit("init", state[roomName])

    startGameInterval(roomName);
  }

  function onJoinRoom(roomName) {
    const room = io.sockets.adapter.rooms.get(roomName);
    if (!room) {
      return
    }

    let playerCount = room.size;
    if (playerCount === 0) {
      socket.emit('unknownCode');
      return;
    } else if (playerCount > 8) {
      socket.emit('tooManyPlayers');
      return;
    }

    socket.number = room.size + 1;
    clientRooms[socket.id] = roomName;
    addPlayer(state[roomName]);
    socket.join(roomName);
    io.sockets.in(roomName).emit("new_user", ({ 'count': playerCount+1, 'socket_id': socket.id }));
    socket.emit('gameCode', roomName);
    io.sockets.in(roomName).emit('init', state[roomName]);
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
  console.log(state[roomName])
  //restart game
  io.sockets.in(roomName).emit('init', state[roomName]);
  startGameInterval(roomName);
}