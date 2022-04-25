import React from 'react';

const Snake = ({Dots}) => {
    return(
        <div>
            {Dots.map((dot, i) => {
                const style = {
                    left: `${dot[0]}%`,
                    top: `${dot[1]}%`
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