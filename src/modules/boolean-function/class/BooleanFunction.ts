import { InputBooleanVariable } from "./InputBooleanVariable";
import { TruthTable } from "./TruthTable";

export default class BooleanFunction {
    #inputs: Array<InputBooleanVariable>;
    #activatedminterms: Array<number>;
    #truthTable: TruthTable;

    constructor(
        {
            inputs,
            activatedminterms
        }: {
            inputs: Array<InputBooleanVariable>,
            activatedminterms: Array<number>
        }
    ) {
        this.#inputs = inputs;
        this.#activatedminterms = activatedminterms;
        this.#truthTable = new TruthTable({
            numberOfInputs: this.#inputs.length,
            activatedminTerms: this.#activatedminterms
        });
    }

    getInputs() {
        return this.#inputs;
    }
    getInputsNames() {
        return this.#inputs.map(input => input.getName());
    }
    changeInputs(newInputs: Array<InputBooleanVariable>) {
        this.#inputs = newInputs;
        this.#truthTable = new TruthTable({
            numberOfInputs: this.#inputs.length,
            activatedminTerms: this.#activatedminterms
        });
    }
    getTruthTable() {
        return this.#truthTable.getminTerms();
    }
}