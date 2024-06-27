import './App.css'
import { BooleanFunction } from '../../modules/boolean-function/class/BooleanFunction'

import { useState } from 'react'
import BooleanFunctionVisualizer from './components/BooleanFunctionVisualizer'
function App() {

  const [inputs, setInputs] = useState(['A', 'B', 'C', 'D'])
  const [booleanFunction, setBooleanFunction] = useState(new BooleanFunction({
    inputs: inputs,
    activatedminterms: [7, 1, 4]
  }))

  return (
    <>
      <BooleanFunctionVisualizer booleanFunction={booleanFunction} setBooleanFunction={setBooleanFunction} />
    </>
  )
}

export default App
