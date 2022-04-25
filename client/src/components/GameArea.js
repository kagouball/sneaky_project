import React, { Component } from 'react'
import Snake from "./Snake"
import Food from './Food'

const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  let y = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  return [x, y];
}

class GameArea extends Component{

  state = {
    food: getRandomCoordinates(),
    snakeDots: [
      [0,0],
      [2,0],
      [4,0],
    ]
  }
  render(){
    return (
      <div className="game-area">
        <Snake Dots={this.state.snakeDots}></Snake>
        <Food Dot={this.state.food}></Food>
      </div>
    )
  }
}

export default GameArea