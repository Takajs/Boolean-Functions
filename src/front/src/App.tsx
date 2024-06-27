import './App.css'
import { BooleanFunction } from '../../modules/boolean-function/class/BooleanFunction'
import { useState , useEffect} from 'react'
import BooleanFunctionVisualizer from './components/BooleanFunctionVisualizer'
import InputsSetter from './components/InputsSetter'
function App() {

  const [inputs, setInputs] = useState(['A', 'B', 'C', 'D'])
  const [booleanFunction, setBooleanFunction] = useState(new BooleanFunction({
    inputs: inputs,
    activatedminterms: [7, 1, 3]
  }))

  useEffect(() => {
    setBooleanFunction(new BooleanFunction({
      inputs: inputs,
      activatedminterms: [7,1,3]
    }))
  }, [inputs])
  return (
    <>
      <InputsSetter
        inputs={inputs}
        setInputs={setInputs}
      />
      <BooleanFunctionVisualizer booleanFunction={booleanFunction} setBooleanFunction={setBooleanFunction} />
    </>
  )
}

export default App
