import { InputBooleanVariable } from "./InputBooleanVariable";
import { TruthTable } from "./TruthTable";

export class BooleanFunction {
    #inputs: Array<InputBooleanVariable>;
    #activatedminterms: Array<number>;
    #truthTable: TruthTable;

    constructor(
        {
            inputs,
            activatedminterms
        }: {
            inputs: Array<string>,
            activatedminterms: Array<number>
        }
    ) {
        this.#inputs = [];
       for (let i = 0; i < inputs.length; i++) {
            this.#inputs.push(new InputBooleanVariable({
                index: i,
                name: inputs[i]
            }));
        }
        this.#activatedminterms = activatedminterms.filter(index => index < 2 ** this.#inputs.length);
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
    getStringRepresentation() {
        return this.#truthTable.getStringRepresentation();
    }
    getKarnaughIndexesMap() {
        return this.#truthTable.getKarnaughIndexesMap();
    }
    getKarnaughActivationsMap() {
        return this.#truthTable.getKarnaughActivationsMap();
    }
}