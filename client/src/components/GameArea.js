import React, { Component } from 'react'
import Snake from "./Snake"
import Food from './Food'
import SimplePopup from './SimplePopup';
import GameAreaResizer from '../tools/GameAreaResizer';
import PlayingState from '../tools/PlayingState';
import ReadyAsk from './ReadyAsk';

const stepLength = 1;
const initialState = {
  direction: -1,
  snakes: {},
  food: [0, 0],
  fieldSize: 0,
  isReady: false
}

class GameArea extends Component {

  state = initialState;
  gameOverState = {
    isGameOver: false,
    loosers: "no one"
  }

  emitKeyCode(keyCode) {
    this.props.socket.emit("keydown", keyCode);
  }

  componentDidMount() {
    document.onkeydown = this.onKeyDown;
    
    this.props.socket.on("gameState", (data) => {
      this.onGameState(data)
    });

    this.props.socket.on("init", (data) => {
      this.oninitialization(data);
    })

    this.props.socket.on("gameOver", (loosers) => {
      this.onGameOver(loosers)
    })
  }

  onGameState(data) {
    if (data) {
      //this.setState({ dots: Object.values(data.players).reduce((acc, player) => ({...acc, [player.color]: player.dots}))})
      this.setState(({ snakes: data.players}))
      //console.log(Object.values(this.state.players))
      this.setState({ food: data.food });
      this.props.changeScore(data.players[this.props.socket.id].score)
      this.props.changeBestScore(data.bestScore);
    }
  }

  oninitialization(data)
  {
    if (data) {
      console.log(data);
      this.setState({ snakes: data.players})
      this.setState({ fieldSize: data.fieldSize })
      this.setState({ food: data.food });
      this.props.changeScore(data.players[this.props.socket.id].score)
      this.props.changeBestScore(data.bestScore);
      this.props.setGameOn(data.players[this.props.socket.id].isReady);
    }
  }

  onKeyDown = (e) => {
    if(this.gameOverState.isGameOver || this.props.isSettingsOpen || !this.props.isGameOn)
    {
      return
    }
    PlayingState.PlayerIsPlaying = true;
    e = e || window.event;
    this.emitKeyCode(e.keyCode)
  }

  onGameOver(loosers) {
    PlayingState.PlayerIsPlaying = false;
    this.setState(initialState);
    this.gameOverState.isGameOver = true;
    //show loosers
    let sentence = "";
    this.gameOverState.loosers = loosers.reduce(
      (prev, cur) => prev + " " + cur.name,
      sentence
    );
  }

  getActualSize()
  {
    return stepLength * (100 / (stepLength * this.state.fieldSize));
  }

  snakesToElement()
  {
    return Object.values(this.state.snakes).map(
      snake=>snake.dots.map((dot)=>{
        return {'color':snake.color,'dot':dot}
      })
      ).flat()
  }

  closePopup()
  {
      this.gameOverState.isGameOver = false;
  }

  render() {
    return (
      
      <div className="game-area" style={{ width: GameAreaResizer.gameAreaHeight + "px", height: GameAreaResizer.gameAreaHeight + "px" }}>
        {this.gameOverState.isGameOver?
          <SimplePopup 
          loosers={this.gameOverState.loosers}
          closePopup={this.closePopup.bind(this)}
          />
        : null}
        <ReadyAsk socket={this.props.socket} ></ReadyAsk>
        <Food Dot={[this.state.food[0] * this.getActualSize(), this.state.food[1] * this.getActualSize()]}
          Size={this.getActualSize()}></Food>
        <Snake Elements={this.snakesToElement()}
          Size={this.getActualSize()}></Snake>
      </div>
    )
  }
}

export default GameArea