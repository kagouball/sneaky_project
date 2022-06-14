const express = require("express");
const cors = require("cors");
const app = express();

//socket.io
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: "*",
  mehtods: ["GET", "POST", "PUT", "DELETE"],
});

let user_count = 0;
let clientRooms = {};

app.use(cors());
app.use(express.static("build"));
// Cors allow all origins
app.get("/", function (req, res) {
  res.sendFile("index.html", { root: __dirname });
});

//etablissement de la connexion
io.on("connection", (socket) => {
  console.log(`New user connect : ${socket.id}`);
  //user_count += 1;
  //io.emit("new_user", ({'count' : user_count, 'socket_id' : socket.id}));

  socket.on("disconnect", (reason) => {
    user_count -= 1;
    io.emit("new_user", {'count' : user_count, 'socket_id' : socket.id});
    console.log(`${socket.id} has disconnected`);
  });

  socket.on("test", (value) => {
    console.log(`${value} test`);
    io.emit("test",value)
  });

  socket.on("update_position", (dots) => {
    //console.log(`update position ${dots}`);
    const roomName = clientRooms[socket.id];
    if (!roomName) {
      return;
    }
    io.sockets.in(roomName).emit("update_position", {'dots' : dots, 'socket_id' : socket.id});
  });

  socket.on("create_room", () => {
    let roomName = makeid(5);
    clientRooms[socket.id] = roomName;
    console.log(roomName);
    socket.emit('gameCode', roomName);

    //state[roomName] = initGame();

    socket.join(roomName);
    socket.number = 1;
    socket.emit("new_user", ({'count' : socket.number, 'socket_id' : socket.id}));
  })

  socket.on("join_room", (roomName) => {
    console.log("try to join ", roomName)
    const room = io.sockets.adapter.rooms.get(roomName);
    //const arr = Array.from(io.sockets.adapter.rooms);
    
    console.log("rooms ", room)
    let allSockets;
    if (room) {
      console.log("room : ", room)
      allSockets = room.sockets;
      console.log("all socket ", allSockets)
    }
    console.log("all socket")
    let clientCount = 0;
    if (allSockets) {
      clientCount = Object.keys(allSockets).length;
    }
    console.log("client count ",room.size)
    if (room.size === 0) {
      socket.emit('unknownCode');
      return;
    } else if (room.size > 8) {
      socket.emit('tooManyPlayers');
      return;
    }

    console.log("zdzfzevd")

    clientRooms[socket.id] = roomName;

    socket.join(roomName);
    socket.number = socket.number+1;
    io.sockets.in(roomName).emit("new_user", ({'count' : socket.number, 'socket_id' : socket.id}));
    socket.emit('gameCode', roomName);  
  })
});

//on change app par server
server.listen(3030, function () {
  console.log("Server ready on port 3030");
});

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}