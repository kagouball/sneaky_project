const { isOnFood } = require("./foodManagment")

module.exports = {
  getRandomCoordinates,
  isInASnake,
  getUpdatedVelocity,
  randomCoordinates_safe,
  areVelocityReversed
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

function isInASnake(snakesDots, coords){
    let coordsInSnake = false;
    snakesDots.forEach(dot => {
      if (coords[0] == dot[0] && coords[1] == dot[1]){
        coordsInSnake = true;
        return
      }
    })
    return coordsInSnake;
}

function getUpdatedVelocity(keyCode) {
  switch (keyCode) {
    case 37: { // left
      return [-1, 0];
    }
    case 40: { // down
      return [0, 1];
    }
    case 39: { // right
      return [1, 0];
    }
    case 38: { // up
      return [0, -1];
    }
  }
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

function areVelocityReversed(dir1, dir2)
{
  return dir1[0] + dir2[0] == 0 && dir1[1] + dir2[1] == 0;
}