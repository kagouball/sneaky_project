import { useState } from 'react'
import Header from './components/Header'
import Scores from './components/Scores'
import GameArea from './components/GameArea'
import SlideBar from './components/SlideBar'
import Field from './components/FieldTest/Field'

function App() {
  const BG_COLOUR = '#231f20';

  const draw = ( ctx, frameCount )=> {
    ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = BG_COLOUR
    ctx.beginPath()
    ctx.arc(50,100,20*Math.sin(frameCount*0.05)**2,0,2*Math.PI)
    ctx.fill()
  }

  const drawGameArea = ( ctx ) =>
  {
      ctx.fillStyle = BG_COLOUR;
      ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
  }

  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [arenaLength, setArenaLength] = useState(50);

  const updateScore = (score) =>
  {
      if(score > bestScore)
      {
        setBestScore(score)
      }
      setScore(score);
  }

  const updateArenaLength = (length) =>
  {
    if(!isPlaying)
    {
      setArenaLength(length*4);
    }
  }

  return (
    <div className="container">
      <Header />
      <Scores actualScore={score} bestScore={bestScore}/>
      <SlideBar gameOn={isPlaying} changeArenaLength={updateArenaLength} arenaLength={arenaLength}/>
      <GameArea changeScore={updateScore} changePlayingState={setIsPlaying} arenaLength={arenaLength}/>
      {/* <Field draw={draw}/> */}
    </div>
  );
}

export default App;
