import React from 'react';
import Popup from 'reactjs-popup';

const SimplePopup = () => {
    return(
        <Popup trigger={<button className="button"> Open Modal </button>} modal>
            <div  style={{ width: "200px", height: "200px" }}> Modal content </div>
        </Popup>
    );
}

export default SimplePopup;