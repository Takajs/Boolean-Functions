import './App.css'
import { BooleanFunction } from '../../modules/boolean-function/class/BooleanFunction'
import { useState, useEffect } from 'react'
import BooleanFunctionVisualizer from './components/BooleanFunctionVisualizer'
import InputsSetter from './components/InputsSetter'
import GameOfLife from './components/GameOfLife'
function App() {

  const [inputs, setInputs] = useState(['A', 'B', 'C', 'D'])
  const [booleanFunction, setBooleanFunction] = useState(new BooleanFunction({
    inputs: inputs,
    activatedminterms: []
  }))

  useEffect(() => {
    setBooleanFunction(new BooleanFunction({
      inputs: inputs,
      activatedminterms: booleanFunction.getActivatedminTerms()
    }))


  }, [inputs])
  return (
    <>
      <GameOfLife />
      <BooleanFunctionVisualizer 
      booleanFunction={booleanFunction} setBooleanFunction={setBooleanFunction} inputs={inputs} setInputs={setInputs} />
    </>
  )
}

export default App
