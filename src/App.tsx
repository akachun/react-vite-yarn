import AnimeJS from "./components/animejs"
import FramerMotion from "./components/framerMotion"
import AnimatedBars from "./components/reactMove"
import ReactSpring from "./components/reactSpring"
import ReactTransitionGroup from "./components/reactTransitionGroup"


function App() {
  
  return (
    <>
      <div style={{display:'flex', alignItems:'center', flexDirection:'column', width: '500px'}}>
        <ReactSpring/>
        <FramerMotion/>
        <ReactTransitionGroup/>
        <AnimatedBars/>
        <AnimeJS/>
      </div>      
    </>
  )
}

export default App
