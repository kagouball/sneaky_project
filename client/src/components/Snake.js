import React from 'react';

const Snake = ({ Elements, Size }) => {
    return (
        <div>
            {Elements.map((element, i) => {
                    const style = {
                        left: `${element.dot[0]*Size}%`,
                        top: `${element.dot[1]*Size}%`,
                        height: `${Size}%`,
                        width: `${Size}%`,
                        backgroundColor: `${element.color}`
                    }
                    return (
                        <div className='snake-dot'
                            key={i}
                            style={style}></div>
                    )
            })
            }
        </div>
    )
}

export default Snake