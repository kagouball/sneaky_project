const { getUpdatedVelocity, areVelocityReversed} = require("../gameLogic/velocityManagment")
const { addPlayer } = require('../gameLogic/playerManagment');
const { createGameState } = require('../gameLogic/gameStateManagment');
const { startGameInterval } = require('../gameLogic/gameMain');

const { makeid } = require('./utils');
const { io, state, clientRooms } = require('./serverStarter')
const { MAX_PLAYER } = require('./constant')


module.exports = {
    onIsReady,
    onkeydown,
    onCreateRoom,
    onDisconnect,
    onJoinRoom
}

function onIsReady(socket, isReady) {
    const roomName = clientRooms[socket.id];
    if (!roomName) {
      return;
    }
    state[roomName].players[socket.id].isReady = isReady;
    socket.emit('gameState', state[roomName]);

    if(Object.values(state[roomName].players).every(player => {return player.isReady == true}))
    {
      io.sockets.in(roomName).emit('gameStart');
    }
  }

  function onkeydown(socket, keyCode) {
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

  function onCreateRoom(socket, data) {
    let roomName = makeid(5);
    clientRooms[socket.id] = roomName;
    console.log(`roomName created : ${roomName}`);
    
    let initialState = createGameState(socket.id);
    initialState.fieldSize = data.fieldSize;
    addPlayer(initialState,socket.id,data.player_name,data.player_color);
    state[roomName] = initialState;

    socket.join(roomName);
    socket.emit('gameCode', roomName);
    socket.emit("new_user", ({ 'count': 1, 'socket_id': socket.id }));
    socket.emit("init", state[roomName])

    startGameInterval(roomName);
  }

  function onJoinRoom(socket, data) {
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
    addPlayer(state[data.roomName],socket.id, data.player_name, data.player_color);

    socket.join(data.roomName);
    io.sockets.in(data.roomName).emit("new_user", ({ 'count': playerCount+1, 'socket_id': socket.id }));
    io.sockets.in(data.roomName).emit('init', state[data.roomName]);
    socket.emit('gameCode', data.roomName);
  }

  function onDisconnect(socket)
  {
    const roomName = clientRooms[socket.id];
    //remove socket id from clients room
    delete clientRooms[socket.id];
    //leave room
    socket.leave(roomName);
    if(!state[roomName])
    {
      return
    }
    //remove player from state
    delete state[roomName].players[socket.id]
    if(state[roomName].players.length == 0)
    {
      delete state[roomName];
    }
    console.log(`${socket.id} has disconnected`);
  }