let clientRooms = {};
let state = {};

const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.static("../client/build"));
// Cors allow all origins
app.get("/", function (req, res) {
  res.sendFile("index.html", { root: __dirname });
});

//socket.io
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: "*",
  mehtods: ["GET", "POST", "PUT", "DELETE"],
});

module.exports = {
    server,
    io,
    clientRooms,
    state
}