import React, { useState } from "react";
import Header from "./components/Header";
import Scores from "./components/Scores";
import GameArea from "./components/GameArea";
import SlideBar from "./components/SlideBar";
import Field from "./components/FieldTest/Field";
import socketIOClient from "socket.io-client";
import { useEffect } from "react";

const ENDPOINT = "http://127.0.0.1:3030";
const socket = socketIOClient.connect(ENDPOINT)

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [arenaLength, setArenaLength] = useState(200);
  const [userCount, setUserCount] = useState(0);
  const [testValue, setTest] = useState(false)

  useEffect(() => {
    socket.on("new_user", (data) => {
      console.log("id  : ", data.socket_id);
      setUserCount(data.count);
    });

    socket.on("test", (data) => {
      console.log("receiving test : ", data);
      setTest(data)
    })
  }, [])

  const updateScore = (score) => {
    if (score > bestScore) {
      setBestScore(score);
    }
    setScore(score);
  };

  const updateArenaLength = (length) => {
    if (!isPlaying) {
      setArenaLength(length);
    }
  };

  const emitTest = (value) => {
    setTest(value)
    console.log(`target value : ${value}`);
    socket.emit("test",value)
  }

  return (
    <div className="container">
      <input type="checkbox" onChange={(e)=>{}} checked={testValue} onClick={(e)=>{
        emitTest(e.target.checked)
        }}/>
      <Header userCount={userCount} />
      <Scores actualScore={score} bestScore={bestScore} />
      <SlideBar
        gameOn={isPlaying}
        changeArenaLength={updateArenaLength}
        arenaLength={arenaLength}
      />
      <GameArea
        changeScore={updateScore}
        changePlayingState={setIsPlaying}
        arenaLength={arenaLength}
      />
      {/* <Field draw={draw}/> */}
    </div>
  );
}

export default App;
