const { createGameState } = require('./gameLogic/gameMain');
const { makeid } = require('./utils');

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
    //updatePlayerDirection(player, keyCode);
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
    console.log(`Init with ${state[roomName]}`)
    socket.emit("init", state[roomName])
  }

  function onJoinRoom(roomName) {
    const room = io.sockets.adapter.rooms.get(roomName);
    let allSockets;
    if (room) {
      allSockets = room.sockets;
    }
    let clientCount = 0;
    if (allSockets) {
      clientCount = Object.keys(allSockets).length;
    }
    if (room.size === 0) {
      socket.emit('unknownCode');
      return;
    } else if (room.size > 8) {
      socket.emit('tooManyPlayers');
      return;
    }

    clientRooms[socket.id] = roomName;

    socket.join(roomName);
    socket.number = socket.number + 1;

    io.sockets.in(roomName).emit("new_user", ({ 'count': socket.number, 'socket_id': socket.id }));
    socket.emit('gameCode', roomName);
    socket.emit('init', state[roomName]);
  }
});

//on change app par server
server.listen(3030, function () {
  console.log("Server ready on port 3030");
});

