import React, { Component } from 'react'
import { GithubPicker } from 'react-color';
import { Slider, Box } from '@mui/material';

class StartingForm extends Component {

    state = {
        player_name: "",
        player_color: '#000',
        roomName: "",
        fieldSize: 10
    };

    handleChangeComplete = (color) => {
        this.setState({ player_color: color.hex })
    }

    componentDidMount() {
        this.props.socket.on("unknownCode", () => {
            this.showErrorOnForm("The code does not exist");
        })
        this.props.socket.on("tooManyPlayers", () => {
            this.showErrorOnForm("The room is full");
        })
    }

    showErrorOnForm(message) {
        let error_zone = document.getElementsByClassName("error-message")[0];
        error_zone.textContent = message;
    }

    emitCreateRoom = () => {
        this.props.socket.emit("create_room", this.state);
    }

    emitJoinRoom = () => {
        console.log("try to Join room : ", this.state.roomName)
        this.props.socket.emit("join_room", this.state);
    }
    
    render() {
        const colorStyle ={
            backgroundColor: `${this.state.player_color}`,
            height: `50px`,
            width: `50px`,
            margin: "auto",
        }
        return (
            <div className='start-grid'>
                <Box display="grid" gridTemplateColumns="repeat(2 ,1fr)" gap={2}>
                    <Box gridColumn="span 2">
                        <div className='player-info'>
                            <div>
                                <h1>Customisation</h1>
                                <p>name</p>
                                <input type='text' className='playerName' onChange={() => {
                                    let playerName = document.getElementsByClassName("playerName")[0].value;
                                    this.setState({ player_name: playerName})
                                }}></input>
                                <p>Choose your snake colour</p>
                                <div style={colorStyle}></div>
                                <Box sx={{ display: 'inline-block'}}>
                                    <GithubPicker
                                        color={this.state.player_color}
                                        onChangeComplete={this.handleChangeComplete} />
                                </Box>
                            </div>
                        </div>
                    </Box>
                    <Box gridColumn="span 1">
                        <div className='create-game'>
                            <h1>New Game</h1>
                            <p>Create new party</p>
                            <p>field Size : {this.state.fieldSize}</p>
                            <p><Slider
                                value={this.state.fieldSize}
                                step={5}
                                marks
                                min={5}
                                max={100}
                                onChange={(e, val) => this.setState({ fieldSize: val })} /></p>
                            <button onClick={() => { this.emitCreateRoom() }}>Create</button>
                        </div>
                    </Box>
                    <Box gridColumn="span 1">
                        <div className='join-game'>
                            <h1>Join Game</h1>
                            <p>Join party</p>
                            <input type='text' className='roomName'></input>
                            <button onClick={() => {
                                let text = document.getElementsByClassName("roomName")[0].value;
                                this.setState({ roomName: text }, () => this.emitJoinRoom());
                            }}>Join</button>
                            <p className='error-message'></p>
                        </div>
                    </Box>
                </Box>
            </div>
        )
    }
}

export default StartingForm