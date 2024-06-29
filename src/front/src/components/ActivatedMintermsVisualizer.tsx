import { BooleanFunction } from '../../../modules/boolean-function/class/BooleanFunction'
import { minTerm } from '../../../modules/boolean-function/class/minTerm'

export default function ActivatedMintermsVisualizer({ booleanFunction, simulating }: { booleanFunction: BooleanFunction, simulating: boolean }) {

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                minWidth: '100vw',
                maxWidth: '100vw',
                maxHeight: '3.5rem',
                position: 'absolute',
                top: '0',
                left: '0',
            }}>

            <p>{simulating ?
                'Stop' : 'Start'}
            </p>
            <p>&nbsp; Σ({booleanFunction.getTruthTable().filter(minTerm => minTerm.getValue()[minTerm.getValue().length - 1]).map((minTerm: minTerm) => minTerm.getValue().slice(0, minTerm.getValue().length - 1).reduce((acc, value, index) => acc + (value ? 2 ** (minTerm.getNumberOfInputs() - index - 1) : 0), 0)).join(', ')})
            </p>
        </div>
    )
}
