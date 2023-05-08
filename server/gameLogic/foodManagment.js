const { isPlayerOnFood } = require("./positionCheckers")
const { randomCoordinates_safe } = require("./coordinateManagment")
const { enlargeSnake } = require("./snakeManagment")
const { updateBestScore, updateScore} = require("./scoreManagment");

module.exports={
    checkIfPlayerEat
}

function checkIfPlayerEat(state, player)
{
    if(!isPlayerOnFood(state.food, player))
    {
        return
    }

    state.food = randomCoordinates_safe(state);
    enlargeSnake(player);
    updateScore(player);
    updateBestScore(state);
}