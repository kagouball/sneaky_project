import React, { Component } from 'react';
import Slider from '@mui/material/Slider';

class SlideBar extends Component{
    
    onSliderChangeValue(value){
        this.props.changeArenaLength(value)
    }

    render(){
        return(
            <div className='slide-bar'>
              <h1>Arena Length : {this.props.arenaLength}</h1>
              <Slider 
              value={this.props.arenaLength} 
              step={1}
              marks 
              min={1} 
              max={50} 
              onChange={(e, val) => this.onSliderChangeValue(val)} disabled={this.props.gameOn}/>
            </div>
        )
    }
}

export default SlideBar