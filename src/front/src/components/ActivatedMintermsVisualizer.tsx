import { BooleanFunction } from '../../../modules/boolean-function/class/BooleanFunction'
import { minTerm } from '../../../modules/boolean-function/class/minTerm'

export default function ActivatedMintermsVisualizer({ booleanFunction }: { booleanFunction: BooleanFunction }) {
    return (
        <div>
            <h2>Activated Minterms</h2>
            <p>{booleanFunction.getTruthTable().filter(minTerm => minTerm.getValue()[minTerm.getValue().length - 1]).map((minTerm: minTerm) => minTerm.getValue().slice(0, minTerm.getValue().length - 1).reduce((acc, value, index) => acc + (value ? 2 ** (minTerm.getNumberOfInputs() - index - 1) : 0), 0)).join(', ')}</p>
        </div>
    )
}
