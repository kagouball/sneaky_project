import PlayingState from "./PlayingState";
const GAME_AREA_MIN_HEIGHT = 20;

class GameAreaResizer
{
    constructor()
    {
        this.gameAreaMaxHeight = GAME_AREA_MIN_HEIGHT;
        this.gameAreaHeight = GAME_AREA_MIN_HEIGHT;
        window.addEventListener('resize', () => {
            this.onResize();
        });
    }

    initialize()
    {
        Promise.all([document.getElementsByClassName("header")[0], document.getElementsByClassName("scores")[0]]).then((responses) => {
            this.gameAreaMaxHeight = this.computeGameAreaMaxHeight();
            this.gameAreaHeight = this.gameAreaMaxHeight;
        })
    }

    updateGameAreaHeight(height){
        if (!PlayingState.PlayerIsPlaying) {
            this.gameAreaHeight = height;
        }
    }

    onResize()
    {
        let max = this.computeGameAreaMaxHeight();
        this.gameAreaMaxHeight = max;
        if(this.gameAreaMaxHeight < this.gameAreaHeight)
        {
            this.updateGameAreaHeight(this.gameAreaMaxHeight);
        }
    }

    computeGameAreaMaxHeight()
    {
        
        let headerHeight = document.getElementsByClassName("header")[0].clientHeight + 1;
        let scoresHeight = document.getElementsByClassName("scores")[0].clientHeight + 1;
        let scoresH1MarginTopHeight = this.getScoresH1MarginTopHeight();
        let scoresH2MarginBottomHeight = this.getScoresH2MarginBottomHeight();
        let gameAreaMarginTopHeight = this.getGameAreaMarginTopHeight();
        let windowHeight = window.innerHeight;
    
        let maxHeight = windowHeight - headerHeight - scoresHeight - scoresH1MarginTopHeight - scoresH2MarginBottomHeight - gameAreaMarginTopHeight; 
        if(maxHeight<=GAME_AREA_MIN_HEIGHT)
        {
            maxHeight = GAME_AREA_MIN_HEIGHT;
        }
        return Math.floor(maxHeight * 0.9);
    }
    
    getScoresH1MarginTopHeight()
    {
        let scoresh1 = document.getElementsByClassName("scores")[0].getElementsByTagName("h1")[0];
        return parseInt(window.getComputedStyle(scoresh1).marginTop) + 1;
    }
    
    getScoresH2MarginBottomHeight()
    {
        let scoresh2 = document.getElementsByClassName("scores")[0].getElementsByTagName("h2")[0];
        return parseInt(window.getComputedStyle(scoresh2).marginBottom) + 1;
    }
    
    getGameAreaMarginTopHeight()
    {
        let gameArea = document.getElementsByClassName("game-area")[0];
        return parseInt(window.getComputedStyle(gameArea).marginTop) + 1;
    }
}

export default new GameAreaResizer();