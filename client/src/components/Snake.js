import React from 'react';

const Snake = ({Dots, Size}) => {
    return(
        <div>
            {Dots.map((dot, i) => {
                const style = {
                    left: `${dot[0]}%`,
                    top: `${dot[1]}%`,
                    height: `${Size}%`,
                    width: `${Size}%`
                }
                return (
                    <div className='snake-dot' 
                    key={i}
                    style={style}></div>
                )
            })}
        </div>
    )
}

export default Snake