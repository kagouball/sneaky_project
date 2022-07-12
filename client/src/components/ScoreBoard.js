import React from 'react';

const ScoreBoard = ({ players }) => {
    return (
        <div className='score-board'>
            <h2>ScoreBoard</h2>
            <table>
                <tbody>
                    <tr>
                        <th>Color</th>
                        <th>Name</th>
                        <th>Snake length</th>
                        <th>Score</th>
                    </tr>
                    {
                        Object.values(players).map((player,i) => {
                            return (
                                <tr key={i}>
                                    <td>{player.color}</td>
                                    <td>{player.name}</td>
                                    <td>{player.dots.length}</td>
                                    <td>{player.score}</td>
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