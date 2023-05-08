const { randomCoordinates_safe } = require("./coordinateManagment")

module.exports = {
    addPlayer
}

function addPlayer(state, playerId, name, color)
{
    
    let newPlayer = getNewPlayer();
    if(name == null || name.length == 0)
    {
        const playersNumber = Object.keys(state.players).length;
        newPlayer.name = `player ${playersNumber + 1}`;
    }
    else
    {
        newPlayer.name = name;
    }
    newPlayer.dots.push(randomCoordinates_safe(state));
    newPlayer.color = color;
    state.players[playerId] = newPlayer;
}

function getNewPlayer()
{
    return newPlayer = {
        direction: [0, 0],
        dots: [],
        name: "",
        score: 0,
        color: '#000',
        gameWin: 0,
        isReady : false
    }
}