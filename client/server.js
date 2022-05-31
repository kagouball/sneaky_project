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

app.use(cors());
app.use(express.static("build"));
// Cors allow all origins
app.get("/", function (req, res) {
  res.sendFile("index.html", { root: __dirname });
});

//etablissement de la connexion
io.on("connection", (socket) => {
  console.log(`New user connect : ${socket.id}`);
  user_count += 1;
  io.emit("new_user", user_count);
  socket.on("disconnect", (reason) => {
    user_count -= 1;
    io.emit("new_user", user_count);
    console.log(`${socket.id} has disconnected`);
  });

  socket.on("test", (value) => {
    console.log(`${value} test`);
    io.emit("test",value)
  });
});

//on change app par server
server.listen(3030, function () {
  console.log("Server ready on port 3030");
});
