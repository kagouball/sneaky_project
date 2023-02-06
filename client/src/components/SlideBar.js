import React, { Component } from 'react';
import { computeGameAreaMaxHeight } from "../tools/ResizeHelper.js";

import Slider from '@mui/material/Slider';

class SlideBar extends Component{

    state = {
        max : 0
    }

    setMaxValue()
    {
        let value = computeGameAreaMaxHeight();
        this.setState(({max : value}));
    }

    componentDidMount() {
        window.addEventListener('resize', this.onResize);
        this.setMaxValue();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize);
    }

    onResize = () =>
    {
        this.setMaxValue();
        this.onSliderChangeValue(this.state.max);
    }


    
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
              max={this.state.max} 
              onChange={(e, val) => this.onSliderChangeValue(val)}/>
            </div>
        )
    }
}

export default SlideBar