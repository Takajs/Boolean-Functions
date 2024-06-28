import StringRepresentation from "./StringRepresentation"

export default function InputsSetter({ inputs, setInputs, booleanFunction }: { inputs: Array<string>, setInputs: (inputs: Array<string>) => void, booleanFunction: BooleanFunction }) {

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
    <div
    className="header">
      <div
        className="inputs-setter"
      >
        <button onClick={() => removeInput(inputs.length - 1)}>-</button>
        <div
          className="inputs-setter__inputs"
        >
          {inputs.map((inputName, index) => (
            <input
              className="inputs-setter__inputs"
              key={index}
              value={inputName}
              onChange={(e) => { handleOnChange(e, index) }}
            />
          ))}
        </div>
        <button onClick={() => addInput(generateInputName())}>+</button>
      </div>
      <StringRepresentation booleanFunction={booleanFunction} />
    </div>

  )

}
