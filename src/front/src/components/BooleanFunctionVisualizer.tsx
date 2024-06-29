import { BooleanFunction as BooleanFunctionClass } from '../../../modules/boolean-function/class/BooleanFunction'

import ActivatedMintermsVisualizer from './ActivatedMintermsVisualizer';
import TruthTable from './TruthTable';

export default function BooleanFunctionVisualizer({ booleanFunction, setBooleanFunction, inputs, setInputs, windowWidth, windowHeight }: { booleanFunction: BooleanFunctionClass, setBooleanFunction: (booleanFunction: BooleanFunctionClass) => void, inputs: Array<string>, setInputs: (inputs: Array<string>) => void, windowWidth: number, windowHeight: number }) {

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',

        }}>
            <TruthTable booleanFunction={booleanFunction} setBooleanFunction={setBooleanFunction} inputs={inputs} setInputs={setInputs} windowWidth={windowWidth} windowHeight={windowHeight} />
        </div>

    )
}
