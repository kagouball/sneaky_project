

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
}