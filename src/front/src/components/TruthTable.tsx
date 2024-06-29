import { BooleanFunction } from '../../../modules/boolean-function/class/BooleanFunction'
import { minTerm } from '../../../modules/boolean-function/class/minTerm'
import { useEffect, useRef, useState } from 'react'
import GameOfLife from './GameOfLife'
import ActivatedMintermsVisualizer from './ActivatedMintermsVisualizer'


export default function TruthTable({ booleanFunction, setBooleanFunction, inputs, setInputs, windowWidth, windowHeight }: { booleanFunction: BooleanFunction, setBooleanFunction: (booleanFunction: BooleanFunction) => void, inputs: Array<string>, setInputs: (inputs: Array<string>) => void, windowWidth: number, windowHeight: number }) {
    const [simulating, setSimulating] = useState(false)
    const [timeBetweenSimulations, setTimeBetweenSimulations] = useState(1000)
    const addInput = (inputName: string) => {
        setSimulating(false)
        setInputs([...inputs, inputName])

    }

    //A component that renders a slider to change the time between simulations
    function TimeBetweenSimulations() {
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '2rem',
                }}
            >
                <input
                    type="range"
                    min="50"
                    max="5000"
                    value={timeBetweenSimulations}
                    onChange={(e) => {
                        setTimeBetweenSimulations(parseInt(e.target.value))
                    }}
                />
            </div>
        )
    }

    const removeInput = (index: number) => {
        setSimulating(false)
        setInputs(inputs.filter((_, i) => i !== index))

    }

    const generateInputName = () => {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZαβγδεζηθικλμνξοπρστυφχψω'
        const availableLetters = letters.split('').filter(letter => !inputs.includes(letter))
        return availableLetters[0]
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        setSimulating(false)
        const newInputs = [...inputs]
        newInputs[index] = e.target.value
        setInputs(newInputs)
    }

    const intervalRef: any = useRef(null);


    const myFunction = () => {
        if (!simulating) {
            return;
        }

        const newFunction = new BooleanFunction({
            inputs: inputs,
            activatedminterms: booleanFunction.getActivatedminTerms(),
            board: booleanFunction.nextStateGameOfLife()
        });
        setBooleanFunction(newFunction)
    };

    useEffect(() => {
        intervalRef.current = setInterval(myFunction, timeBetweenSimulations);

        return () => {
            clearInterval(intervalRef.current);
        };

    }, [simulating, timeBetweenSimulations]);


    function renderCheckboxActivateminTerm(minTerm: minTerm, index: number) {
        return (
            <td>
                <input
                    className={minTerm.getValue()[minTerm.getValue().length - 1] ? 'checkbox activated' : 'checkbox'}
                    key={index}
                    type="checkbox"
                    checked={minTerm.getValue()[minTerm.getValue().length - 1]}
                    onChange={() => {
                        setSimulating(false)
                        const newFunction = new BooleanFunction({
                            inputs: inputs,
                            activatedminterms: booleanFunction.getActivatedminTerms(),
                            board: booleanFunction.getGameOfLife().getBoard()
                        });
                        newFunction.invertminTerm(index)
                        setBooleanFunction(newFunction)
                    }}
                />
            </td>
        )
    }

    function renderTable() {
        return (<>{booleanFunction.getTruthTable().map((minTerm: minTerm, index: number) => (
            <tr key={index}>
                {minTerm.getValue().slice(0, minTerm.getValue().length - 1).map((value: boolean, index: number) => (
                    <td key={index}>
                        {value ? '1' : '0'}
                    </td>
                ))}
                {renderCheckboxActivateminTerm(minTerm, index)}
            </tr>
        ))}
        </>)
    }


    return (
        <div
            id="my-element"
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'start',
                    alignItems: 'center',
                    marginBottom: '2rem',
                    position: 'absolute',
                    zIndex: 11,
                    top: '0',
                    left: '80%',
                }}>
                {timeBetweenSimulations && <TimeBetweenSimulations />}

            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'space-between ',
                    marginBottom: '2rem',
                }}>
                <button onClick={() => {
                    setSimulating(!simulating)

                }}><ActivatedMintermsVisualizer booleanFunction={booleanFunction} simulating={simulating} /></button>
            </div>
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
                            {renderTable()}
                        </tbody>

                    </table>
                    <th style={{
                        backgroundColor: 'transparent',
                    }}><button onClick={() => addInput(generateInputName())}>+</button></th>

                </div>
            </div>
            <GameOfLife booleanFunction={booleanFunction} setBooleanFunction={setBooleanFunction} />
        </div>
    )
}

