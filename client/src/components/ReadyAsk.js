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
            console.log("start!")
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

// class ReadyAsk extends Component
// {
//     constructor()
//     {
//         super();
//         this.onClick = this.onClick.bind(this);
//         this.GameOn = false;
//         this.setGameOn = undefined;
//     }


//     state = 
//     {
//         isReady : false,
//     }

//     emitIsReady(isReady) {
//         this.props.socket.emit("isReady", isReady);
//     }

//     componentDidMount() {
//         this.props.socket.on("gameState", (data) => {
//           this.onGameState(data)
//         });
//     }

//     onGameState(data) {
//         if (data) {
//           this.setState({ isReady: data.isReady });
//         }
//     }

//     onClick()
//     {
//         this.emitIsReady(true);
//     }

//     render()
//     {
//         return(
//             <div className="ready-ask" hidden={ this.GameOn }>
//                 <Button onClick={this.onClick} variant="contained">
//                     Ready?
//                 </Button>
//             </div>
//             )
//     }
// }

export default ReadyAsk;