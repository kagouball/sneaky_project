import React, { Component } from 'react'
import Snake from "./Snake"
import Food from './Food'

const stepLength = 1;

const initialState = {
  direction: -1,
  dots: [[0, 0]],
  food: [0, 0],
  fieldSize: 0
}

class GameArea extends Component {

  state = initialState;

  emitKeyCode(keyCode) {
    this.props.socket.emit("keydown", keyCode);
  }

  componentDidMount() {
    document.onkeydown = this.onKeyDown;
    this.props.changePlayingState(false);
    this.props.socket.on("gameState", (data) => {
      if(data)
      {
        this.setState({ dots: Object.values(data.players).map(player => player.dots).flat() })
        this.setState({ food: data.food });
        this.props.changeScore(data.players[this.props.socket.id].score)
        this.props.changeBestScore(data.bestScore);
      }
    });

    this.props.socket.on("init", (data) => {
      if (data) {
        console.log(data);
        this.setState({ dots: Object.values(data.players).map(player => player.dots).flat() })
        this.setState({ fieldSize: data.fieldSize })
        this.setState({ food: data.food });
        this.props.changeScore(data.players[this.props.socket.id].score)
        this.props.changeBestScore(data.bestScore);
      }
    })

    this.props.socket.on("gameOver", (loosers) => {
      this.onGameOver(loosers)
    })
  }

  onKeyDown = (e) => {
    this.props.changePlayingState(false);
    e = e || window.event;
    this.emitKeyCode(e.keyCode)
  }

  onGameOver(loosers) {
    alert(`Game Over`)
    this.props.changePlayingState(false);
    this.setState(initialState)
  }

  getActualSize()
  {
    return stepLength * (100 / (stepLength * this.state.fieldSize));
  }

  render() {
    return (
      <div className="game-area" style={{ width: this.state.fieldSize * stepLength * this.props.arenaLength + "px", height: this.state.fieldSize * stepLength * this.props.arenaLength + "px" }}>
        <Snake Dots={this.state.dots.map((x) => {
          return [x[0] * this.getActualSize(), x[1] * this.getActualSize()]
        })}
          Size={this.getActualSize()}></Snake>
        <Food Dot={[this.state.food[0] * this.getActualSize(), this.state.food[1] * this.getActualSize()]}
          Size={this.getActualSize()}></Food>
      </div>
    )
  }
}

export default GameArea