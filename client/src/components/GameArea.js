import React, { Component } from 'react'
import Snake from "./Snake"
import Food from './Food'

const stepLength = 1;

const initialState = {
  direction: -1,
  snakes: {},
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
    }
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

  snakesToElement()
  {
    return Object.values(this.state.snakes).map(
      snake=>snake.dots.map((dot)=>{
        return {'color':snake.color,'dot':dot}
      })
      ).flat()
  }

  render() {
    return (
      <div className="game-area" style={{ width: this.state.fieldSize * stepLength * this.props.arenaLength + "px", height: this.state.fieldSize * stepLength * this.props.arenaLength + "px" }}>
        <Food Dot={[this.state.food[0] * this.getActualSize(), this.state.food[1] * this.getActualSize()]}
          Size={this.getActualSize()}></Food>
        <Snake Elements={this.snakesToElement()}
          Size={this.getActualSize()}></Snake>
      </div>
    )
  }
}

export default GameArea