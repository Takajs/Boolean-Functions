import { BooleanFunction } from '../../../modules/boolean-function/class/BooleanFunction'
export default function StringRepresentation({ booleanFunction }: { booleanFunction: BooleanFunction }) {
    return (
        <div>
            <h2>String Representation</h2>
            <p>{booleanFunction.getStringRepresentation()}</p>
        </div>
    )
}
