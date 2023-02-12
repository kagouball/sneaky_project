import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

import Header from "./components/Header";
import Scores from "./components/Scores";
import GameArea from "./components/GameArea";
import StartingForm from "./components/StartingForm";
import Settings from "./components/Settings";
import ScoreBoard from "./components/ScoreBoard";
import GameAreaResizer from "./tools/GameAreaResizer";

const ENDPOINT = "http://127.0.0.1:3030";
const socket = socketIOClient.connect(ENDPOINT)

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [roomName, setRoomName] = useState("");
  const [isSettingsOpen, openSettings] = useState(false);
  const [players, setPlayers] = useState({});
  
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
    GameAreaResizer.initialize();
  }

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
          socket={socket}
          isSettingsOpen={isSettingsOpen}
        />
        </div>
        <Settings
        isSettingsOpen={isSettingsOpen}
        openSettings={openSettings}
        />
      </div>
    </div>
  );
}

export default App;
