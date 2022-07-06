import React, { Component } from 'react'
import { GithubPicker } from 'react-color';
import Slider from '@mui/material/Slider';

class StartingForm extends Component{

    state = {
        player_color: '#000',
        roomName: "",
        fieldSize: 10
    };

    handleChangeComplete = (color) => {
        this.setState({player_color: color.hex})
    }

    componentDidMount()
    {
        this.props.socket.on("unknownCode", () => {
            this.showErrorOnForm("The code does not exist");
        })
        this.props.socket.on("tooManyPlayers", () => {
            this.showErrorOnForm("The room is full");
        })
    }

    showErrorOnForm (message){
        let error_zone = document.getElementsByClassName("error-message")[0];
        error_zone.textContent = message;
    }

    emitCreateRoom = () => {
        this.props.socket.emit("create_room", this.state);
    }
    
    emitJoinRoom = () => {
        console.log("try to Join room : ",this.state.roomName)
        this.props.socket.emit("join_room", this.state);
    }

    render()
    {
        return(
        <div>
            <div>
                <p>Choose your snake colour</p>
                <GithubPicker
                color={this.state.background}
                onChangeComplete={this.handleChangeComplete}/>
            </div>
            <div>
                <p>Create new party</p>
                <p>field Size : {this.state.fieldSize}</p>
                    <p><Slider 
              value={this.state.fieldSize} 
              step={5}
              marks 
              min={5} 
              max={100} 
              onChange={(e, val) => this.setState({fieldSize:val})}/></p>
                <button onClick={()=>{this.emitCreateRoom()}}>Create</button>
            </div>
            <div>
                <p>Join party</p>
                <input type='text' className='roomName'></input>
                <button onClick={()=>{
                    let text = document.getElementsByClassName("roomName")[0].value;
                    this.setState({roomName: text}, ()=>this.emitJoinRoom());
                }}>Join</button>
                <p className='error-message'></p>
            </div>
        </div> 
     )
    } 
}

export default StartingForm