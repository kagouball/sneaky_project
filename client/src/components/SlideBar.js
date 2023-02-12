import React, { Component } from 'react';

import Slider from '@mui/material/Slider';
import GameAreaResizer from '../tools/GameAreaResizer';

class SlideBar extends Component{
    
    onSliderChangeValue(value){
        GameAreaResizer.updateGameAreaHeight(value);
    }

    render(){
        return(
            <div className='slide-bar'>
              <p>Arena Length : {GameAreaResizer.gameAreaHeight}</p>
              <Slider 
              orientation='vertical'
              value={GameAreaResizer.gameAreaHeight} 
              step={1}
              marks 
              min={1} 
              max={GameAreaResizer.gameAreaMaxHeight} 
              onChange={(e, val) => this.onSliderChangeValue(val)}/>
            </div>
        )
    }
}

export default SlideBar