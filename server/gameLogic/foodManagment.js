const {getRandomCoordinates, isInASnake} = require("./helper")

module.exports = {
    randomFoodCoordinates
}

function randomFoodCoordinates(fieldSize, snakeDots) {
    let foodInSnake = true;
    let newFood;
    while (foodInSnake) {
        newFood = getRandomCoordinates(fieldSize);
        foodInSnake = isInASnake(snakeDots, newFood)
    }
    return newFood
}