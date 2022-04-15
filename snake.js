const BG_COLOUR = '#231f20';
const SNAKE_COLOUR = '#c2c2c2';
const FOOD_COLOUR = '#e66916';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const score_element = document.getElementById('score');
const bestScore_element = document.getElementById('best_score');

canvas.width = canvas.height = 400;

const FR = 10;
const S = 20;
const T = canvas.width / S;

let count, pos, vel, food, snake;
let best_score = 0;

//beginning of the game
function init(){
    pos = {x:10, y:10};
    vel = {x :0, y:0};
    count = 0;

    snake = [
        {x:8,y:10},
        {x:9,y:10},
        {x:10,y:10},
    ]
    updateScore(count);
    randomFood();
}

init();

function eatFood()
{
    updateScore(count+1);
    snake.push({...pos});
    pos.x += vel.x;
    pos.y += vel.y;
    randomFood();
}

function kill()
{
    init();
}

function updateBestScore(value)
{
    if(best_score < count)
    {
        best_score = count;
    }
    bestScore_element.innerHTML = "Best Score : " + best_score;
}

function updateScore(value)
{
    count = value;
    score_element.innerHTML = "Actual Score : " + count;
    updateBestScore(value);
}

function randomFood()
{
    food = {
        x: Math.floor(Math.random() * T),
        y: Math.floor(Math.random() * T),
    }

    for(let cell of snake){
        if(cell.x == food.x && food.y == cell.y)
        {
            return randomFood();
        }
    }
}

function move()
{
    if(vel.x || vel.y)
    {
        for(let cell of snake)
        {
            //dead by snake
            if(cell.x == pos.x && cell.y == pos.y)
            {
                return kill();
            }
        }
        snake.push({...pos});
        snake.shift();
    }
}

document.addEventListener('keydown',keydown);

function keydown(e)
{
    switch(e.keyCode)
    {
        case 37 : {
            return vel = {x:-1, y:0}
        }
        case 38 : {
            return vel = {x:0, y:-1}
        }
        case 39 : {
            return vel = {x:1, y:0}
        }
        case 40 : {
            return vel = {x:0, y:1}
        }
    }
}

setInterval(() => {
    requestAnimationFrame(gameLoop);
}, 1000 /FR);

function gameLoop()
{
    ctx.fillStyle = BG_COLOUR;
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = SNAKE_COLOUR;
    for(let cell of snake)
    {
        ctx.fillRect(cell.x*S,cell.y*S,S,S);
    }
    
    ctx.fillStyle = FOOD_COLOUR;
    ctx.fillRect(food.x*S, food.y*S,S,S);

    //Shadow Move
    pos.x += vel.x;
    pos.y += vel.y;

    //dead by environnement
    if(pos.x < 0 || pos.x > T || pos.y < 0 || pos.y >= T)
    {
        kill();
    }

    //Eat food
    if(food.x == pos.x && pos.y == food.y)
    {
        eatFood();
    }

    //Move
    move();
}