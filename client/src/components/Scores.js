import React from 'react';
import PropTypes from 'prop-types'

const Scores = ({ actualScore, bestScore }) => {
  return (
      <div className="scores">
        <h1>Best Score : {bestScore}</h1>
        <h2>actual score : {actualScore}</h2>
      </div>
  )
}

Scores.defaultProps = {
    actualScore : 0,
    bestScore: 0,
}

Scores.propTypes = {
    actualScore: PropTypes.number,
    bestScore: PropTypes.number,
}

export default Scores