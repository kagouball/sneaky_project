module.exports=
{
    isInASnake,
    isPlayerCollapsed,
    isPlayerOnFood,
    isPlayerOutOfBorders,
    isOnFood
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

function isPlayerCollapsed(players, player){
    //put player snake dots in last position
    let snake = [...Object.values(players).filter(p => p !== player).map(p => p.dots).flat().concat([...player.dots])];
    let head = snake[snake.length - 1];
    snake.pop();
    return snake.some(dot => {
        return (head[0] == dot[0] && head[1] == dot[1]);
    })
}

function isPlayerOutOfBorders(player, fieldSize) 
{
    let head = player.dots[player.dots.length -1];
    if(head[0] >= fieldSize || head[1] >= fieldSize || head[0] < 0 || head[1] < 0){
      return true;
    }
}

function isPlayerOnFood(food, player)
{
    let head = player.dots[player.dots.length -1];
    return isOnFood(food, head)
}

function isOnFood(food, coordinate)
{
    if(food[0] === coordinate[0] && food[1] === coordinate[1]){
        return true;
    }
    return false;
}