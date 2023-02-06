import React, { Component, useState } from "react";
import Header from "./components/Header";
import Scores from "./components/Scores";
import GameArea from "./components/GameArea";
import Field from "./components/FieldTest/Field";
import socketIOClient from "socket.io-client";
import StartingForm from "./components/StartingForm";
import { useEffect } from "react";
import Settings from "./components/Settings";
import ScoreBoard from "./components/ScoreBoard";

const ENDPOINT = "http://127.0.0.1:3030";
const socket = socketIOClient.connect(ENDPOINT)

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [arenaLength, setArenaLength] = useState(20);
  const [userCount, setUserCount] = useState(0);
  const [roomName, setRoomName] = useState("");
  const [isSettingsOpen, openSettings] = useState(false);
  const [players, setPlayers] = useState({});
  const [gameAreaMaxHeight, setGameAreaMaxHeight] = useState(0);
  const { computeGameAreaMaxHeight } = require("./tools/ResizeHelper");


  useEffect(() => {
    socket.on("new_user", (data) => {
      setUserCount(data.count);
    });

    socket.on("gameCode", (roomName) => {
      setRoomName(roomName);
      hideStartView();
      displayPartyView();
    })

    socket.on("gameState", (data) => {
      setPlayers(data.players)
    });

    window.addEventListener("resize", onResize);
  }, [])

  const hideStartView = () => {
    let startView = document.getElementsByClassName("start-view")[0];
    startView.style.visibility = "collapse"
    startView.style.display = "none";
  }

  const displayPartyView = () => {
    let partyView = document.getElementsByClassName("party-view")[0];
    partyView.style.visibility = "visible";
    partyView.style.display = "block";
  }

  const updateArenaLength = (length) => {
    if (!isPlaying) {
      setArenaLength(length);
    }
  };


  const onResize = () =>
  {
    let max = computeGameAreaMaxHeight();
    setGameAreaMaxHeight(max);
  }

  useEffect(()=>{
    if(gameAreaMaxHeight < arenaLength)
    {
      updateArenaLength(gameAreaMaxHeight);
    }
  }, [gameAreaMaxHeight])

  return (
    <div className="container">
      <div className="start-view">
        <StartingForm socket={socket}/>
      </div>
      <div className="party-view">
        <Header userCount={userCount} roomName={roomName}/>
        <Scores actualScore={score} bestScore={bestScore} />
        <div className="main-grid">
        <ScoreBoard players={players}/>
        <GameArea
          changeScore={setScore}
          changeBestScore={setBestScore}
          changePlayingState={setIsPlaying}
          arenaLength={arenaLength}
          socket={socket}
          isSettingsOpen={isSettingsOpen}
        />
        </div>
        <Settings
        updateArenaLength={updateArenaLength}
        arenaLength={arenaLength}
        isSettingsOpen={isSettingsOpen}
        openSettings={openSettings}
        />
        {/* <Field draw={draw}/> */}
      </div>
    </div>
  );
}

export default App;
