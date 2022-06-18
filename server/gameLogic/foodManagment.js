const {getRandomCoordinates, isInASnake} = require("./helper")

let food = {};

function getFood()
{
    return food;
}

function randomFoodCoordinate(fieldSize, snakeDots) {
    let foodInSnake = true;
    let newFood;
    while (notGood) {
        newFood = getRandomCoordinates();
        foodInSnake = isInASnake(newFood)
    }
    return newFood
}