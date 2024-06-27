export default function InputsSetter({ inputs, setInputs }: { inputs: Array<string>, setInputs: Function }) {

  const addInput = (inputName: string) => {
    setInputs([...inputs, inputName])
  }

  const removeInput = (index: number) => {
    setInputs(inputs.filter((_, i) => i !== index))
  }

  const generateInputName = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZαβγδεζηθικλμνξοπρστυφχψω'
    const availableLetters = letters.split('').filter(letter => !inputs.includes(letter))
    return availableLetters[0]
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newInputs = [...inputs]
    newInputs[index] = e.target.value
    setInputs(newInputs)
  }

  return (
    <div>
      <button onClick={() => addInput(generateInputName())}>+</button>
      <button onClick={() => removeInput(inputs.length - 1)}>-</button>
      {inputs.map((inputName, index) => (
        <input
          key={index}
          value={inputName}
          onChange={(e) => { handleOnChange(e, index) }}
        />
      ))}
    </div>
  )

}
