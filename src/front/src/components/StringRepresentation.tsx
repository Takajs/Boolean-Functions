import { BooleanFunction } from '../../../modules/boolean-function/class/BooleanFunction'
export default function StringRepresentation({ booleanFunction }: { booleanFunction: BooleanFunction }) {



    return (
        <div>
            <p>{booleanFunction.getStringRepresentation()}</p>
        </div >
    )
}
