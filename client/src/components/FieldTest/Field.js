import React from 'react'
import useCanvas from './useCanvas'

const Field = ({ draw, options, ...rest }) => {
  const canvasRef = useCanvas(draw)

  return (
    <canvas ref={canvasRef}/>
  )
}

export default Field