import React, { useState } from 'react'
import Header from './components/Header'
import Scores from './components/Scores'
import GameArea from './components/GameArea'
import SlideBar from './components/SlideBar'
import Field from './components/FieldTest/Field'

function App() {

  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [arenaLength, setArenaLength] = useState(200);

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
      setArenaLength(length);
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
