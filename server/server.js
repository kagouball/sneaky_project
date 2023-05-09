const { server, io } = require('./serverUtils/serverStarter')
const { onIsReady, onkeydown, onCreateRoom, onDisconnect, onJoinRoom} = require('./serverUtils/socketOn');

//Connexion
io.on("connection", (socket) => {
  console.log(`New user connect : ${socket.id}`);

  socket.on("disconnect", (data) => onDisconnect(socket));
  socket.on("keydown", (data) => onkeydown(socket, data));
  socket.on("create_room", (data) => onCreateRoom(socket, data));
  socket.on("join_room", (data) => onJoinRoom(socket, data));
  socket.on("isReady", (data) => onIsReady(socket, data));
});

server.listen(3030, function () {
  console.log("Server ready on port 3030");
});