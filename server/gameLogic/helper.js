module.exports = {
  getRandomCoordinates,
  isInASnake
}

function getRandomCoordinates(dotSize, fieldSize)
{
    //we don't want coordinates in the border or in contacte with it
    let min = 2*dotSize;
    let max = fieldSize - (2*dotSize);
    let x = Math.floor((Math.random()*(max-min+1)+min)/dotSize)*dotSize;
    let y = Math.floor((Math.random()*(max-min+1)+min)/dotSize)*dotSize;
    return [x, y];
}

function isInASnake(snakesDots, coords){
    let coordsInSnake = false;
    snakesDots.forEach(dot => {
      if (coords[0] === dot[0] && coords[1] === dot[1]){
        coordsInSnake = true;
        return
      }
    })
    return coordsInSnake;
}