const { isInASnake, isOnFood } = require("./positionCheckers")

module.exports = {
    getRandomCoordinates,
    randomCoordinates_safe
  }

//get random coordinate not in collision with other dots (food / snake)
function randomCoordinates_safe(state)
{
    let newCoord;
    do
    {
        newCoord = getRandomCoordinates(state.fieldSize);
    }
    while(isInASnake(Object.values(state.players).map(player => player.dots).flat(), newCoord) || isOnFood(state.food,newCoord))
    return newCoord;
}

function getRandomCoordinates(fieldSize)
{
    //we don't want coordinates in the border or in contacte with it
    let min = 1;
    let max = fieldSize - 1;
    let x = Math.floor((Math.random()*(max-min)+min));
    let y = Math.floor((Math.random()*(max-min)+min));
    return [x, y];
}