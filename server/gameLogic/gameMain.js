const { getRandomCoordinates, isInASnake } = require("./helper")
const { randomFoodCoordinates } = require("./foodManagment")
const { FIELD_SIZE } = require("../constant")

module.exports = {
    createGameState,
    gameLoop,
    addPlayer
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

//get random coordinate not in collision with other dots (food / snake)
function randomCoordinates_safe(state)
{
    let newCoord;
    do
    {
        newCoord = getRandomCoordinates(state.fieldSize);
    }
    while(isInASnake(state.players.map(player => player.dots), newCoord) || isOnFood(state.food,newCoord))
    return newCoord;
}

function addPlayer(state)
{
    const playersNumber = state.players.length;
    let newPlayer = {
        direction: [0, 0],
        dots: [
            randomCoordinates_safe(state)
        ],
        name: `player ${playersNumber + 1}`
    }
    state.players.push(newPlayer);
}

function gameLoop(state)
{
    if(!state)
    {
        return;
    }

    state.players.forEach(player => {
        if(player.direction[0] == 0 && player.direction[1] == 0)
        {
            return;
        }
        moveSnake(player);
        checkIfPlayerEat(state, player);
    });

    let loosers = [];
    state.players.forEach(player => {
        if(isPlayerOutOfBorders(player, state.fieldSize) || isPlayerCollapsed(state.players, player))
        {
            //gameOver
            loosers.push(player);
        }
    });
    return loosers;
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
    let head = player.dots[player.dots.length -1];
    if(head[0] >= fieldSize || head[1] >= fieldSize || head[0] < 0 || head[1] < 0){
      return true;
    }
}

function isPlayerCollapsed(players, player){
    //put player snake dots in last position
    let snake = [...players.filter(p => p !== player).map(p => p.dots).flat().concat([...player.dots])];
    let head = snake[snake.length - 1];
    snake.pop();
    return snake.some(dot => {
        return (head[0] == dot[0] && head[1] == dot[1]);
    })
  }

function checkIfPlayerEat(state, player)
{
    if(isPlayerOnFood(state.food, player))
    {
        state.food = randomFoodCoordinates(FIELD_SIZE, state.players.map(player=>player.dots));
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

function enlargeSnake(player)
{
    let newSnake = [...player.dots];
    newSnake.unshift([]);
    player.dots = newSnake;
}