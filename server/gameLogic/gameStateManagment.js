const { FIELD_SIZE } = require("../serverUtils/constant")
const { randomCoordinates_safe } = require("./coordinateManagment")

module.exports={
    createGameState,
    resetGameState
}

function createGameState(creatorId) {
    let newState = createEmptyGameState();
    newState.food = randomCoordinates_safe(newState);
    return newState
}

function createEmptyGameState() {
    return newState = {
        players: {},
        food: [],
        fieldSize : FIELD_SIZE,
        bestScore: 0
    };
}

function resetGameState(state)
{
    //reset players dots
    Object.values(state.players).forEach((player) => {
        player.dots= [randomCoordinates_safe(state)];
        player.direction=[0,0];
        player.score=0;
        player.isReady=false;
    });
    //reset food
    state.food=randomCoordinates_safe(state);
}