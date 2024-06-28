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
        this.#truthTable = new TruthTable({
            numberOfInputs: this.#inputs.length,
            activatedminTerms: this.#activatedminterms
        });
        return this.#truthTable.getStringRepresentation();
    }
    getKarnaughIndexesMap() {
        return this.#truthTable.getKarnaughIndexesMap();
    }
    getKarnaughActivationsMap() {
        return this.#truthTable.getKarnaughActivationsMap();
    }
    clone() {
        return new BooleanFunction({
            inputs: this.getInputsNames(),
            activatedminterms: this.#activatedminterms
        });
    }
    getActivatedminTerms() {
        return this.#activatedminterms;
    }
    invertminTerm(index: number) {
        this.#truthTable.invertminTerm(index);
        if (this.#activatedminterms.includes(index)) {
            this.#activatedminterms = this.#activatedminterms.filter(activatedminTerm => activatedminTerm !== index);
            this.#truthTable = new TruthTable({
                numberOfInputs: this.#inputs.length,
                activatedminTerms: this.#activatedminterms
            });
        } else {
            this.#activatedminterms.push(index);
            this.#truthTable = new TruthTable({
                numberOfInputs: this.#inputs.length,
                activatedminTerms: this.#activatedminterms
            });
        }
        this.#truthTable.solveKarnaughMap();
    }

    getRepresentativeBinaryArray: () => Array<boolean> = () => {
        //This will return a single array that is formed by pushing one by one (in order from 0 to max) the last element of each minTerm
        return this.#truthTable.getRepresentativeBinaryArray();
    }
    getRepresentativeBinaryString: () => string = () => {
        return this.getRepresentativeBinaryArray().map(value => value ? '1' : '0').join('')
    }
}