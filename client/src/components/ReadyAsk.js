import React, { Component } from "react";
import { Button } from "@mui/material";

class ReadyAsk extends Component
{
    constructor()
    {
        super();
        this.onClick = this.onClick.bind(this);
    }

    state = 
    {
        isReady : false
    }

    emitIsReady(isReady) {
        this.props.socket.emit("isReady", isReady);
    }

    componentDidMount() {
        this.props.socket.on("gameState", (data) => {
          this.onGameState(data)
        });
    }

    onGameState(data) {
        if (data) {
          this.setState({ isReady: data.isReady });
        }
    }

    onClick()
    {
        this.emitIsReady(true);
    }


    render()
    {
        return(
        <div className="ready-ask">
            <Button onClick={this.onClick} variant="contained">
                Ready?
            </Button>
        </div>
        )
    }
}

export default ReadyAsk;