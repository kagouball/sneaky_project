import React, { Component } from 'react'
import { CirclePicker, GithubPicker, SketchPicker } from 'react-color';

class StartingForm extends Component{

    state = {
        player_color: '#fff',
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
    
    emitJoinRoom = (roomName) => {
        console.log("try to Join room : ",roomName)
        this.props.socket.emit("join_room", roomName);
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
                <button onClick={()=>{this.emitCreateRoom()}}>Create</button>
            </div>
            <div>
                <p>Join party</p>
                <input type='text' className='roomName'></input>
                <button onClick={()=>{
                    let text = document.getElementsByClassName("roomName")[0].value;
                    this.emitJoinRoom(text);
                }}>Join</button>
                <p className='error-message'></p>
            </div>
        </div> 
     )
    } 
}

export default StartingForm