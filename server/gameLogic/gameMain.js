const { isPlayerCollapsed, isPlayerOutOfBorders} = require("./positionCheckers")
const { checkIfPlayerEat } = require("./foodManagment")
const { moveSnake } = require("./snakeManagment")

module.exports = {
    gameLoop,
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
    
    return getLoosers(state);
}

// PARTY END

function getLoosers(state)
{
    let loosers = [];
    Object.values(state.players).forEach(player => {
        if(isPlayerOutOfBorders(player, state.fieldSize) || isPlayerCollapsed(state.players, player))
        {
            //gameOver
            loosers.push(player);
        }
    });
    //empty if no loosers
    return loosers;
}