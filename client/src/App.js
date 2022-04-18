import Header from './components/Header'
import Scores from './components/Scores'
import GameArea from './components/GameArea'
import Field from './components/FieldTest/Field'

function App() {
  const BG_COLOUR = '#231f20';

  const draw = ( ctx, frameCount )=> {
    ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = BG_COLOUR
    ctx.beginPath()
    ctx.arc(50,100,20*Math.sin(frameCount*0.05)**2,0,2*Math.PI)
    ctx.fill()
  }

  const drawGameArea = ( ctx ) =>
  {
      ctx.fillStyle = BG_COLOUR;
      ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
  }

  return (
    <div className="container">
      <Header />
      <Scores />
      <GameArea draw={drawGameArea}/>
      <Field draw={draw}/>
    </div>
  );
}

export default App;