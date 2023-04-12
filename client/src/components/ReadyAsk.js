import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { GameOnContext } from "../contexts/GameOnContextModule";

function ReadyAsk(props)
{
    const [isReady, setIsReady] = useState(false);
    const {gameOn, setGameOn} = React.useContext(GameOnContext);

    const emitIsReady = (isReady) => {
        props.socket.emit("isReady", isReady);
    };

    useEffect(() => {
        props.socket.on("gameState", (data) => {
            onGameState(data)
        });

        props.socket.on("gameStart", () => {
            setGameOn(true);
          });
      }, [onGameState]);
    
    const onGameState = (data) => {
        if (data) {
            setIsReady(data.isReady);
        }
    }

    const onClick = () =>
    {
        emitIsReady(true);
    }

    return(
        <div className="ready-ask" style={{ display: !gameOn ? "flex" : "none" }}>
                <Button onClick={onClick} variant="contained">
                    Ready?
                </Button>
        </div>
    );
};

export default ReadyAsk;