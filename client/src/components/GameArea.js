import React, { Component } from 'react'
import Snake from "./Snake"
import Food from './Food'

const stepLength = 5;

const initialState = {
  direction: -1,
  dots: [[0,0]],
  food: [0,0],
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
    this.props.socket.on("update_dots", (data) => {
      this.setState({ dots: data })
    });
    
    this.props.socket.on("init", (data) => {
      if(data)
      {
        console.log(data);
        this.setState({dots: data.players.map(player=>player.dots)})
        this.setState({fieldSize: data.fieldSize})
        this.setState({food: data.food});
      }
    })
  }

  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }

  onKeyDown = (e) => {
    this.props.changePlayingState(true);
    e = e || window.event;
    this.emitKeyCode(e.keyCode)
  }

  // increaseSpeed() {
  //   if(this.state.speed > 10){
  //     this.setState({
  //       speed : this.state.speed - 10
  //     })
  //     clearInterval(this.interval)
  //     this.interval = setInterval(this.moveSnake,this.state.speed);
  //   }
  // }

  onGameOver() {
    alert(`Game Over. Score : ${this.state.snakeDots.length}`)
    this.props.changePlayingState(false);
    this.setState(initialState, () => {
      //callback because of setState being async
      this.updateInterval()
    })
    this.props.changeScore(0)
  }

  // updateInterval()
  // {
  //   clearInterval(this.interval);
  //   this.interval = setInterval(this.moveSnake,this.state.speed);
  // }

  render() {
    return (
      <div className="game-area" style={{ width: this.state.fieldSize*stepLength*this.props.arenaLength + "px", height: this.state.fieldSize*stepLength*this.props.arenaLength + "px" }}>
        <Snake Dots={this.state.dots[0].map((x)=>{
          return [x[0]*stepLength*(100/(stepLength*this.state.fieldSize)),x[1]*stepLength*(100/(stepLength*this.state.fieldSize))]
        })}
        Size={stepLength*(100/(stepLength*this.state.fieldSize))}></Snake>
        <Food Dot={[this.state.food[0]*stepLength*(100/(stepLength*this.state.fieldSize)),this.state.food[1]*stepLength*(100/(stepLength*this.state.fieldSize))]}
        Size={stepLength*(100/(stepLength*this.state.fieldSize))}></Food>
      </div>
    )
  }
}

export default GameArea