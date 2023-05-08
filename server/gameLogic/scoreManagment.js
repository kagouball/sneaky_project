module.exports = {
    updateScore,
    updateBestScore,
    rewardWinner
}

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


function rewardWinner(players,loosers)
{
    Object.values(players).forEach(player => {
        if(!loosers.includes(player))
        {
            player.gameWin += 1;
        }
    });
}