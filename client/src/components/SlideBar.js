import React, { Component } from 'react';
import Slider from '@mui/material/Slider';

class SlideBar extends Component{

    onSliderChangeValue(value){
        this.props.updateArenaLength(value)
    }

    render(){
        return(
            <div className='slide-bar'>
              <p>Arena Length : {this.props.arenaLength}</p>
              <Slider 
              orientation='vertical'
              value={this.props.arenaLength} 
              step={1}
              marks 
              min={1} 
              max={50} 
              onChange={(e, val) => this.onSliderChangeValue(val)}/>
            </div>
        )
    }
}

export default SlideBar