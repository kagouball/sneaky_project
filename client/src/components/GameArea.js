import React, { Component } from 'react'
import Snake from "./Snake"
import Food from './Food'

const stepLength = 5;

const getRandomCoordinates = () => {
  let min = 2*stepLength;
  let max = 100 - (2*stepLength);
  let x = Math.floor((Math.random()*(max-min+1)+min)/stepLength)*stepLength;
  let y = Math.floor((Math.random()*(max-min+1)+min)/stepLength)*stepLength;
  return [x, y];
}

const initialState = {
  food: getRandomCoordinates(),
  speed : 100,
  direction : 'NONE',
  snakeDots: [
    getRandomCoordinates()
  ]
}

class GameArea extends Component{

  state = initialState;

  componentDidMount() {
    this.updateInterval()
    document.onkeydown = this.onKeyDown;
  }

  componentDidUpdate(){
    this.checkIfOutOfBorders();
    this.checkIfCollapsed();
    this.checkIfEat();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onKeyDown = (e) => {
    e = e || window.event;
    let newDirection = 'NONE';
    switch (e.keyCode) {
      case 38:
        newDirection = 'UP';
        break;
      case 40:
        newDirection = 'DOWN';
        break;
      case 37:
        newDirection = 'LEFT';
        break;
      case 39:
        newDirection = 'RIGHT';
        break;
      case 32:
        newDirection = 'NONE';
        break;
    }
    if((newDirection === 'UP' && this.state.direction === 'DOWN') ||
    (newDirection === 'DOWN' && this.state.direction === 'UP') || 
    (newDirection === 'RIGHT' && this.state.direction === 'LEFT') ||
    (newDirection === 'LEFT' && this.state.direction === 'RIGHT'))
    {
      return
    }else{
      this.setState({direction : newDirection})
    }
  }

  moveSnake = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length-1];

    switch(this.state.direction){
      case 'RIGHT':
        head = [head[0] + stepLength, head[1]];
        break;
      case 'LEFT':
        head = [head[0] - stepLength, head[1]];
        break;
      case 'DOWN':
        head = [head[0], head[1] + stepLength];
        break;
      case 'UP':
        head = [head[0], head[1] - stepLength];
        break;
    }

    dots.push(head);
    dots.shift();
    this.setState({
      snakeDots: dots
    })
  }

  isInSnake(coords){
    let snake = [...this.state.snakeDots]
    let coordsInSnake = false;
    snake.forEach(dot => {
      if (coords[0] === dot[0] && coords[1] === dot[1]){
        coordsInSnake = true;
        return
      }
    })
    return coordsInSnake;
  }
  
  getNewFoodCoordinates(){
    let notGood = true;
    let newFood;
    while(notGood){
      newFood = getRandomCoordinates();
      notGood = this.isInSnake(newFood)
    }
    return newFood
  }

  checkIfOutOfBorders() {
    let head = this.state.snakeDots[this.state.snakeDots.length -1];
    if(head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0){
      this.onGameOver();
    }
  }

  checkIfCollapsed(){
    let snake = [...this.state.snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach(dot => {
      if (head[0] === dot[0] && head[1] === dot[1]){
        this.onGameOver();
      }
    })
  }

  checkIfEat(){
    let food = this.state.food;
    let head = this.state.snakeDots[this.state.snakeDots.length -1];

    if(food[0] === head[0] && food[1] === head[1]){
      this.setState({
        food : this.getNewFoodCoordinates()
      })
      this.enlargeSnake();
      this.props.changeScore( this.state.snakeDots.length );
      this.increaseSpeed();
    }
  }

  enlargeSnake(){
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([]);
    this.setState({
      snakeDots: newSnake
    })
  }

  increaseSpeed() {
    if(this.state.speed > 10){
      this.setState({
        speed : this.state.speed - 10
      })
      clearInterval(this.interval)
      this.interval = setInterval(this.moveSnake,this.state.speed);
    }
  }

  onGameOver(){
    alert(`Game Over. Score : ${this.state.snakeDots.length}`)
    this.setState(initialState, () => {
      //callback because of setState being async
      this.updateInterval()
    })
    this.props.changeScore(0)
  }

  updateInterval()
  {
    clearInterval(this.interval);
    this.interval = setInterval(this.moveSnake,this.state.speed);
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