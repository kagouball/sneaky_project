const { getRandomCoordinates, isInASnake } = require("./helper")
const { randomFoodCoordinates } = require("./foodManagment")
const { FIELD_SIZE } = require("../constant")

module.exports = {
    createGameState
}

function createGameState() {
    //Always create game state with 1 player
    let newState = {
        players: [
            {
                direction: [0, 0],
                dots: [
                    getRandomCoordinates(FIELD_SIZE)
                ],
                name:"player 1"
            }
        ],
        food: [],
        fieldSize : FIELD_SIZE
    };

    newState.food = randomFoodCoordinates(FIELD_SIZE, newState.players[0].dots);
    //console.log(newState.players[0].dots);
    return newState
}

function gameLoop(state)
{
    if(!state)
    {
        return;
    }

    state.players.forEach(player => {
        moveSnake(player);
        checkIfPlayerEat(state);
    });

    state.players.forEach(player => {
        if(isPlayerOutOfBorders(player, state.fieldSize) || isPlayerCollapsed(state.players, player))
        {
            //gameOver
        }
    });
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

function isPlayerOutOfBorders(player, fieldSize) 
{
    let head = player.dots[this.state.snakeDots.length -1];
    if(head[0] >= fieldSize || head[1] >= fieldSize || head[0] < 0 || head[1] < 0){
      return true;
    }
}

function isPlayerCollapsed(players, player){
    //put player snake dots in last position
    let snake = [...players.filter(p => p !== player).map(p => p.dots).flat().concat([...player.dots])];

    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach(dot => {
      if (head[0] === dot[0] && head[1] === dot[1]){
        return true;
      }
    })
    return false;
  }

function checkIfPlayerEat(state, player)
{
    if(isPlayerOnFood(state.food, player))
    {
        state.food = randomFoodCoordinates();
        enlargeSnake(player);
        //changeScore( this.state.snakeDots.length );
        //increaseSpeed();
    }
}

function enlargeSnake(player)
{
    let newSnake = [...player.dots];
    newSnake.unshift([]);
    player.dots = newSnake;
  }

function isPlayerOnFood(food, player)
{
    let head = player.dots[state.dots.length -1];

    if(food[0] === head[0] && food[1] === head[1]){
      return true;
    }
    return false;
}

function enlargeSnake(player)
{
    let newSnake = [...player.dots];
    newSnake.unshift([]);
    player.dots = newSnake;
}