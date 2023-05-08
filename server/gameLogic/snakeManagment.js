module.exports={
    enlargeSnake,
    moveSnake
}

function enlargeSnake(player)
{
    let newSnake = [...player.dots];
    newSnake.unshift([]);
    player.dots = newSnake;
}

function moveSnake(snake)
{
    let dots = [...snake.dots];
    let head = dots[dots.length-1];
    head = [head[0] + snake.direction[0], head[1] + snake.direction[1]]
    dots.push(head);
    dots.shift();
    
    snake.dots = dots;
}