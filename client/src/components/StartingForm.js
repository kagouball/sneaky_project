import React from 'react';

const StartingForm = ({emitCreateRoom, emitJoinRoom}) => {
    return(
       <div>
           <div>
               <p>Create new party</p>
               <button onClick={()=>{emitCreateRoom()}}>Create</button>
           </div>
           <div>
               <p>Join party</p>
               <input type='text' className='roomName'></input>
               <button onClick={()=>{
                   let text = document.getElementsByClassName("roomName")[0].value;
                   emitJoinRoom(text);
               }}>Join</button>
           </div>
       </div> 
    )
}

export default StartingForm