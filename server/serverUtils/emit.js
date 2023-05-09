const { io } = require('./serverStarter')

module.exports = {
    emitGameState,
    emitGameOver
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