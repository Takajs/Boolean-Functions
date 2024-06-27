import { BooleanFunction } from '../../../modules/boolean-function/class/BooleanFunction'
import { minTerm } from '../../../modules/boolean-function/class/minTerm'

export default function TruthTable({ booleanFunction }: { booleanFunction: BooleanFunction }) {
    return (
        <div>
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
        </div>
    )
}

