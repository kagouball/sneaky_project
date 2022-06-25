import React, { Component, useState } from "react";
import Header from "./components/Header";
import Scores from "./components/Scores";
import GameArea from "./components/GameArea";
import SlideBar from "./components/SlideBar";
import Field from "./components/FieldTest/Field";
import socketIOClient from "socket.io-client";
import StartingForm from "./components/StartingForm";
import { useEffect } from "react";

const ENDPOINT = "http://127.0.0.1:3030";
const socket = socketIOClient.connect(ENDPOINT)

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [arenaLength, setArenaLength] = useState(20);
  const [userCount, setUserCount] = useState(0);
  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    socket.on("new_user", (data) => {
      setUserCount(data.count);
    });

    socket.on("gameCode", (roomName) => {
      setRoomName(roomName);
      hideStartView();
      displayPartyView();
    })

    socket.on("unknownCode", ()=>{
      showErrorOnForm("The code does not exist");
    })
    socket.on("tooManyPlayers", ()=>{
      showErrorOnForm("The room is full");
    })
  }, [])

  const showErrorOnForm = (message) => {
    let error_zone = document.getElementsByClassName("error-message")[0];
    error_zone.textContent = message;
  }

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

  const emitCreateRoom = () => {
    socket.emit("create_room");
  }

  const emitJoinRoom = (roomName) => {
    console.log("try to Join room : ",roomName)
    socket.emit("join_room", roomName);
  }

  return (
    <div className="container">
      <div className="start-view">
        <StartingForm emitCreateRoom={emitCreateRoom} emitJoinRoom={emitJoinRoom}/>
      </div>
      <div className="party-view">
        <Header userCount={userCount} roomName={roomName}/>
        <Scores actualScore={score} bestScore={bestScore} />
        <SlideBar
          gameOn={isPlaying}
          changeArenaLength={updateArenaLength}
          arenaLength={arenaLength}
        />
        <GameArea
          changeScore={setScore}
          changeBestScore={setBestScore}
          changePlayingState={setIsPlaying}
          arenaLength={arenaLength}
          socket={socket}
        />
        {/* <Field draw={draw}/> */}
      </div>
    </div>
  );
}

export default App;
