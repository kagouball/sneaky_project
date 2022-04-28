const express = require('express');
const app = express();

//socket.io
const server = require('http').Server(app);
const io = require('socket.io')(server);

let user_count = 0;

app.use(express.static("public"));
app.get('/', function(req, res){
    res.sendFile('index.html', {root: __dirname})
})


//etablissement de la connexion
io.on('connection', (socket) =>{
    console.log(`New user connect : ${socket.id}`);
    user_count += 1;
    io.emit('new_user', user_count);
    socket.on('disconnect', (reason) =>{
        user_count -=1;
        io.emit('new_user', user_count);
        console.log( `${socket.id} has disconnected`);
    })
});

//on change app par server
server.listen(3000, function(){
    console.log("Server ready on port 3000");
});
