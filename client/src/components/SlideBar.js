import React, { Component } from 'react';
import Slider from '@material-ui/core/Slider';

class SlideBar extends Component{
    
    onSliderChangeValue(value){
        this.props.changeArenaLength(value)
    }

    render(){
        return(
            <div className='slide-bar'>
              <h1>Arena Length : {this.props.arenaLength}</h1>
              <Slider defaultValue={this.props.arenaLength} step={10} marks min={10} max={600} onChange={(e, val) => this.onSliderChangeValue(val)} disabled={this.props.gameOn}/>
            </div>
        )
    }
}

export default SlideBar