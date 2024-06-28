import { BooleanFunction } from '../../../modules/boolean-function/class/BooleanFunction'
import { minTerm } from '../../../modules/boolean-function/class/minTerm'
import { useState } from 'react'

export default function TruthTable({ booleanFunction, setBooleanFunction, inputs, setInputs }: { booleanFunction: BooleanFunction, setBooleanFunction: (booleanFunction: BooleanFunction) => void, inputs: Array<string>, setInputs: (inputs: Array<string>) => void }) {
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

    function renderCheckboxActivateminTerm(minTerm: minTerm, index: number) {
        return (
            <td>
                <input
                    className={minTerm.getValue()[minTerm.getValue().length - 1] ? 'checkbox activated' : 'checkbox'}
                    key={index}
                    type="checkbox"
                    checked={minTerm.getValue()[minTerm.getValue().length - 1]}
                    onChange={() => {
                        const newBooleanFunction = booleanFunction.clone()
                        newBooleanFunction.invertminTerm(index);
                        setBooleanFunction(newBooleanFunction)
                    }}
                />
            </td>
        )
    }


    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'start',
                justifyContent: 'start',
            }}>
                <th
                    style={{
                        backgroundColor: 'transparent',
                    }}
                ><button onClick={() => removeInput(inputs.length - 1)}>-</button></th>

                <table>

                    <thead>
                        <tr>
                            {inputs.map((inputName, index) => (
                                <th><input
                                    className="inputs-setter__inputs"
                                    key={index}
                                    value={inputName}
                                    onChange={(e) => { handleOnChange(e, index) }}
                                /></th>
                            ))}
                            <th className="activated">Y</th>
                        </tr>
                    </thead>
                    <tbody>
                        {booleanFunction.getTruthTable().map((minTerm: minTerm, index: number) => (
                            <tr key={index}>
                                {minTerm.getValue().slice(0, minTerm.getValue().length - 1).map((value: boolean, index: number) => (
                                    <td key={index}>
                                        {value ? '1' : '0'}
                                    </td>
                                ))}
                                {renderCheckboxActivateminTerm(minTerm, index)}
                            </tr>
                        ))}
                    </tbody>

                </table>
                <th style={{
                    backgroundColor: 'transparent',
                }}><button onClick={() => addInput(generateInputName())}>+</button></th>

            </div>
        </div>
    )
}

