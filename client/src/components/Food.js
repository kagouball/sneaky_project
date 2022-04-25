import React from "react";

const Food = ({Dot}) => {

    const style = {
        left: `${Dot[0]}%`,
        top: `${Dot[1]}%`,
    }
    return(
        <div className="snake-food" style={style}></div>
    )
}

export default Food