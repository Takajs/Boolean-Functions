import { BooleanFunction as BooleanFunctionClass } from '../../../modules/boolean-function/class/BooleanFunction'

import ActivatedMintermsVisualizer from './ActivatedMintermsVisualizer';
import KarnaughMap from './KarnaughMap';
import StringRepresentation from './StringRepresentation';
import TruthTable from './TruthTable';

export default function BooleanFunctionVisualizer({ booleanFunction, setBooleanFunction }: { booleanFunction: BooleanFunctionClass, setBooleanFunction: (booleanFunction: BooleanFunctionClass) => void }) {
    return (
        <div>
            <TruthTable booleanFunction={booleanFunction} />
            <ActivatedMintermsVisualizer booleanFunction={booleanFunction} />
            <StringRepresentation booleanFunction={booleanFunction} />
            <KarnaughMap booleanFunction={booleanFunction} />
        </div>
    )
}
