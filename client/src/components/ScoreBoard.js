import React from 'react';

const ScoreBoard = ({ players }) => {

    function isReadyCase(playerIsReady)
    {
        if(playerIsReady)
        {
            return (<td>YES</td>);
        }
        else
        {
            return (<td>NO</td>);
        }
    }

    return (
        <div className='score-board'>
            <h2>Score Board</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Score</th>
                        <th>Game win</th>
                        <th>Is Ready</th>
                    </tr>
                    {
                        Object.values(players).map((player,i) => {
                            const colorStyle ={
                                backgroundColor: `${player.color}`
                            }
                            return (
                                <tr key={i}>
                                    <td style={colorStyle}/>
                                    <td>{player.name}</td>
                                    <td>{player.score}</td>
                                    <td>{player.gameWin}</td>
                                    {isReadyCase(player.isReady)}
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ScoreBoard;