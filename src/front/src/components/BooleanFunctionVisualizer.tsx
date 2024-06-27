import { BooleanFunction as BooleanFunctionClass } from '../../../modules/boolean-function/class/BooleanFunction'
import { InputBooleanVariable } from '../../../modules/boolean-function/class/InputBooleanVariable'
import { minTerm } from '../../../modules/boolean-function/class/minTerm'
export default function BooleanFunctionVisualizer({ booleanFunction, setBooleanFunction }: { booleanFunction: BooleanFunctionClass, setBooleanFunction: Function }) {

    //We need to render:
    //The inputs
    //The truth table from which we can get:
    //The string representation of the function
    //The table containing the minterms
    //The Karnaugh Map

    //Render the Karnaugh Map, which are n tables, being n the number of minTerms/16 round up,
    //Each table contains 4 rows and 4 columns at most, any other number if the number of minTerms is less than 16

    function renderKarnaughIndexesMap() {
        const karnaughIndexesMap = booleanFunction.getKarnaughIndexesMap();
        const karnaughActivationsMap = booleanFunction.getKarnaughActivationsMap();


        console.log(karnaughIndexesMap)
        let result = [];

        //Iterate 4 subarrays each time to add them to a new table and append it to the result
        for (let i = 0; i < karnaughIndexesMap.length; i += 4) {
            const table = [];
            for (let j = i; j < i + 4; j++) {
                if (karnaughIndexesMap[j]) {
                    table.push(
                        <tr key={j}>
                            {karnaughIndexesMap[j].map((value: number, index: number) => <td key={index}>{
                                //If the minterm is activated, render it in bold
                                karnaughActivationsMap[j][index] ? <b>{value}</b> : value
                            }</td>)}


                        </tr>
                    )
                }
            }
            result.push(
                <table key={i}
                    style={{
                        border: '1px solid black',
                        margin: '5px'

                    }}>
                    <tbody>
                        {table}
                    </tbody>
                </table>
            )

        }
        return result;
    }

    function renderKarnaughActivationsMap() {
        const karnaughActivationsMap = booleanFunction.getKarnaughActivationsMap();
        console.log('karnaughActivationsMap : ', karnaughActivationsMap)
        console.log(karnaughActivationsMap)
        const result = [];

        //Iterate 4 subarrays each time to add them to a new table and append it to the result
        for (let i = 0; i < karnaughActivationsMap.length; i += 4) {
            const table = [];
            for (let j = i; j < i + 4; j++) {
                if (karnaughActivationsMap[j]) {
                    table.push(
                        <tr key={j}>
                            {
                                //if the minterm is activated, render a 1, otherwise render a 0
                                karnaughActivationsMap[j].map((value: boolean, index: number) => <td key={index}>{value ? '1' : '0'}</td>)
                            }
                        </tr>
                    )
                }
            }
            result.push(
                <table key={i}
                    style={{
                        border: '1px solid black',
                        margin: '5px'

                    }}
                >
                    <tbody>
                        {table}
                    </tbody>
                </table>
            )

        }
        return result;
    }

    return (
        <div>
            <h1>Boolean Function</h1>
            <h2>Inputs</h2>
            {booleanFunction.getInputsNames().map((inputName: string, index: number) => (
                <p key={index}>
                    {inputName}
                </p>))}


            <h2>Truth Table</h2>
            <table>
                <thead>
                    <tr>
                        {booleanFunction.getInputsNames().map((inputName: string, index: number) => (
                            <th key={index}>
                                {inputName}
                            </th>
                        ))}
                        <th>Y</th>
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
                            <td>
                                {minTerm.getValue()[minTerm.getValue().length - 1] ? '1' : '0'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Activated Minterms</h2>
            <p>{booleanFunction.getTruthTable().filter(minTerm => minTerm.getValue()[minTerm.getValue().length - 1]).map((minTerm: minTerm) => minTerm.getValue().slice(0, minTerm.getValue().length - 1).reduce((acc, value, index) => acc + (value ? 2 ** (minTerm.getNumberOfInputs() - index - 1) : 0), 0)).join(', ')}</p>
            <h2>String Representation</h2>
            <p>{booleanFunction.getStringRepresentation()}</p>
            <h2>Karnaugh Map</h2>
            <div style={{
                //Display half of the tables in a row and the other half in the next row
                display: 'flex',
                flexDirection: 'row'

            }}>
                {
                    //render only half of the tables
                    renderKarnaughIndexesMap().slice(0, Math.ceil(renderKarnaughIndexesMap().length / 2))
                }

            </div>

            <div style={{
                //Display half of the tables in a row and the other half in the next row
                display: 'flex',
                flexDirection: 'row'

            }}>
                {
                    //render only half of the tables
                    renderKarnaughIndexesMap().slice(Math.ceil(renderKarnaughIndexesMap().length / 2))
                }
            </div>
        </div>
    )
}
