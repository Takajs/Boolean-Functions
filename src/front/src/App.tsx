import './App.css'
import { BooleanFunction } from '../../modules/boolean-function/class/BooleanFunction'
import { useState, useEffect } from 'react'
import BooleanFunctionVisualizer from './components/BooleanFunctionVisualizer'
function App() {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [windowHeight, setWindowHeight] = useState(window.innerHeight)

  const [inputs, setInputs] = useState(['A','B','C','D'])
  const [booleanFunction, setBooleanFunction] = useState(new BooleanFunction({
    inputs: inputs,
    activatedminterms: [],
    board: []
  }))

  useEffect(() => {
    setBooleanFunction(new BooleanFunction({
      inputs: inputs,
      activatedminterms: booleanFunction.getActivatedminTerms(),
      board: booleanFunction.getGameOfLife().getBoard()
    }))
  }, [inputs])
  return (
    <>
      <BooleanFunctionVisualizer
        booleanFunction={booleanFunction} setBooleanFunction={setBooleanFunction} inputs={inputs} setInputs={setInputs} windowWidth={windowWidth} windowHeight={windowHeight} />
    </>
  )
}

export default App
