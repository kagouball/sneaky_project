module.exports = {
    computeGameAreaMaxHeight
}

function computeGameAreaMaxHeight()
{
    let headerHeight = document.getElementsByClassName("header")[0].clientHeight + 1;
    let scoresHeight = document.getElementsByClassName("scores")[0].clientHeight + 1;
    let scoresH1MarginTopHeight = getScoresH1MarginTopHeight();
    let scoresH2MarginBottomHeight = getScoresH2MarginBottomHeight();
    let gameAreaMarginTopHeight = getGameAreaMarginTopHeight();
    let windowHeight = window.innerHeight;

    let maxHeight = windowHeight - headerHeight - scoresHeight - scoresH1MarginTopHeight - scoresH2MarginBottomHeight - gameAreaMarginTopHeight; 
    if(maxHeight<=0)
    {
        maxHeight = 20;
    }
    return Math.floor(maxHeight * 0.9);
}

function getScoresH1MarginTopHeight()
{
    let scoresh1 = document.getElementsByClassName("scores")[0].getElementsByTagName("h1")[0];
    return parseInt(window.getComputedStyle(scoresh1).marginTop) + 1;
}

function getScoresH2MarginBottomHeight()
{
    let scoresh2 = document.getElementsByClassName("scores")[0].getElementsByTagName("h2")[0];
    return parseInt(window.getComputedStyle(scoresh2).marginBottom) + 1;
}

function getGameAreaMarginTopHeight()
{
    let gameArea = document.getElementsByClassName("game-area")[0];
    return parseInt(window.getComputedStyle(gameArea).marginTop) + 1;
}