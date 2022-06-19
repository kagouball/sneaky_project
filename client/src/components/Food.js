import React from "react";

const Food = ({Dot, Size}) => {

    const style = {
        left: `${Dot[0]}%`,
        top: `${Dot[1]}%`,
        height: `${Size}%`,
        width: `${Size}%`
    }
    return(
        <div className="snake-food" style={style}></div>
    )
}

export default Food