import React from 'react';
import Popup from 'reactjs-popup';

const SimplePopup = ({ loosers, closePopup }) => {

    return (
        <div>
            <div className='popup'>
                < div className='popup_inner' >
                    <h1>GAME OVER</h1>
                    <h2>Loosers : {loosers}</h2>
                    <button onClick={closePopup}>continue</button>
                </div >
            </div >
        </div>
    );
}

export default SimplePopup;