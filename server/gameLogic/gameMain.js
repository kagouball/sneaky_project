const { randomCoordinates_safe } = require("./helper")
const { isOnFood } = require("./foodManagment")
const { FIELD_SIZE } = require("../constant")

module.exports = {
    createGameState,
    gameLoop,
    addPlayer,
    resetState,
    createEmptyGameState,
    rewardWinner
}

// STATE MANAGMENT

function createGameState(creatorId) {
    let newState = createEmptyGameState();
    newState.food = randomCoordinates_safe(newState);
    return newState
}

function createEmptyGameState() {
    //Always create game state with 1 player
    return newState = {
        players: {},
        food: [],
        fieldSize : FIELD_SIZE,
        bestScore: 0
    };
}

function resetState(state)
{
    //reset players dots
    Object.values(state.players).forEach((player) => {
        player.dots= [randomCoordinates_safe(state)];
        player.direction=[0,0];
        player.score=0;
    });
    //reset food
    state.food=randomCoordinates_safe(state);
}

function getNewPlayer(playerName)
{
    return newPlayer = {
        direction: [0, 0],
        dots: [],
        name: playerName,
        score: 0,
        color: '#000',
        gameWin: 0
    }
}

function addPlayer(state, playerId, color)
{
    const playersNumber = Object.keys(state.players).length;
    let newPlayer = getNewPlayer(`player ${playersNumber + 1}`);
    newPlayer.dots.push(randomCoordinates_safe(state));
    newPlayer.color = color;
    state.players[playerId] = newPlayer;
}

//GAME LOOP

function gameLoop(state)
{
    if(!state)
    {
        return;
    }

    Object.values(state.players).forEach((player) => {
        if(player.direction[0] == 0 && player.direction[1] == 0)
        {
            return;
        }
        moveSnake(player);
        checkIfPlayerEat(state, player);
    });

    let loosers = [];
    Object.values(state.players).forEach(player => {
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

function enlargeSnake(player)
{
    let newSnake = [...player.dots];
    newSnake.unshift([]);
    player.dots = newSnake;
}

function rewardWinner(players,loosers)
{
    Object.values(players).forEach(player => {
        if(!loosers.includes(player))
        {
            player.gameWin += 1;
        }
    });
}

//CHECKER

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

function checkIfPlayerEat(state, player)
{
    if(isPlayerOnFood(state.food, player))
    {
        state.food = randomCoordinates_safe(state);
        enlargeSnake(player);
        updateScore(player);
        updateBestScore(state);
        //increaseSpeed();
    }
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

//SCORES MANAGMENT

function updateBestScore(state)
{
    let bestScore = state.bestScore;
    Object.values(state.players).forEach((player)=>{
        if(player.score > bestScore)
        {
            bestScore = player.score;
        }
    })
    state.bestScore = bestScore;
}

function updateScore(player)
{
    player.score = player.dots.length;
}