import { BooleanFunction as BooleanFunctionClass } from '../../../modules/boolean-function/class/BooleanFunction'

import ActivatedMintermsVisualizer from './ActivatedMintermsVisualizer';
import KarnaughMap from './KarnaughMap';
import TruthTable from './TruthTable';

export default function BooleanFunctionVisualizer({ booleanFunction, setBooleanFunction , inputs, setInputs }: { booleanFunction: BooleanFunctionClass, setBooleanFunction: (booleanFunction: BooleanFunctionClass) => void, inputs: Array<string>, setInputs: (inputs: Array<string>) => void }) {
       
    return (
       <div className="BooleanFunctionVisualizer">
            <div className="TruthTableInfo">
                <ActivatedMintermsVisualizer booleanFunction={booleanFunction} />
                <TruthTable booleanFunction={booleanFunction} setBooleanFunction={setBooleanFunction} inputs={inputs} setInputs={setInputs} />
            </div>
            <KarnaughMap booleanFunction={booleanFunction} />
        </div>
    )
}
