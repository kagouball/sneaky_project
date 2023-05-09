const { isPlayerCollapsed, isPlayerOutOfBorders} = require("./positionCheckers")
const { checkIfPlayerEat } = require("./foodManagment")
const { moveSnake } = require("./snakeManagment")
const { rewardWinner } = require('./scoreManagment');
const { resetGameState} = require('./gameStateManagment');


const { emitGameState, emitGameOver } = require('../serverUtils/emit');
const { state, io } = require('../serverUtils/serverStarter')
const { FRAME_RATE } = require('../serverUtils/constant')

module.exports = {
    startGameInterval,
}

function startGameInterval(roomName) 
{
    const intervalId = setInterval(() => {
      const loosers = gameLoop(state[roomName]);
      if (loosers.length == 0) {
        emitGameState(roomName, state[roomName])
      } else {
        rewardWinner(state[roomName].players, loosers)
        emitGameOver(roomName, loosers);
        clearInterval(intervalId);
        resetGame(roomName);
      }
    }, 1000 / FRAME_RATE);
}

function gameLoop(state)
{
    if(!state)
    {
        return;
    }

    moveAllSnakes(state);
    return getLoosersIfExist(state);
}

function moveAllSnakes(state)
{
    Object.values(state.players).forEach((player) => {
        if(player.direction[0] == 0 && player.direction[1] == 0)
        {
            return;
        }
        moveSnake(player);
        checkIfPlayerEat(state, player);
    });
}

function getLoosersIfExist(state)
{
    let loosers = [];
    Object.values(state.players).forEach(player => {
        if(isPlayerOutOfBorders(player, state.fieldSize) || isPlayerCollapsed(state.players, player))
        {
            //gameOver
            loosers.push(player);
        }
    });
    //empty if no looser
    return loosers;
}

function resetGame(roomName)
{
  //clean state
  resetGameState(state[roomName]);
  //restart game
  io.sockets.in(roomName).emit('init', state[roomName]);
  startGameInterval(roomName);
}