import { InputBooleanVariable } from "./InputBooleanVariable";
import { TruthTable } from "./TruthTable";
import { GameOfLife } from "./GameOfLife";

export class BooleanFunction {
    #inputs: Array<InputBooleanVariable>;
    #activatedminterms: Array<number>;
    #truthTable: TruthTable;
    #golboard: Array<Array<boolean>>;
    #busy: boolean = false;

    constructor(
        {
            inputs,
            activatedminterms,
            board

        }: {
            inputs: Array<string>,
            activatedminterms: Array<number>,
            board?: Array<Array<boolean>>

        }
    ) {
        this.#busy = true;
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
            activatedminTerms: this.#activatedminterms,
            board: board ? board : []
        });
        this.#golboard = this.#truthTable.getBoard();
        this.#busy = false;
    }

    getInputs() {
        return this.#inputs;
    }
    getInputsNames() {
        return this.#inputs.map(input => input.getName());
    }

    getTruthTable() {
        return this.#truthTable.getminTerms();
    }
    getStringRepresentation() {
        this.#truthTable = new TruthTable({
            numberOfInputs: this.#inputs.length,
            activatedminTerms: this.#activatedminterms,
            board: this.#golboard
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
            activatedminterms: this.#activatedminterms,
            board: this.#golboard
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
                activatedminTerms: this.#activatedminterms,
                board: this.#golboard
            });
        } else {

            this.#activatedminterms.push(index);
            this.#truthTable = new TruthTable({
                numberOfInputs: this.#inputs.length,
                activatedminTerms: this.#activatedminterms,
                board: this.#golboard
            });
        }
        this.#truthTable.solveKarnaughMap();
    }
    getRepresentativeBinaryArray: () => Array<boolean> = () => {
        return this.#truthTable.getRepresentativeBinaryArray();
    }
    getRepresentativeBinaryString: () => string = () => {
        return this.getRepresentativeBinaryArray().map(value => value ? '1' : '0').join('')
    }
    getGameOfLife: () => GameOfLife = () => {
        return this.#truthTable.getGameOfLife();
    }
    setNewSizesForGameOfLife(numberOfRows: number, numberOfColumns: number) {
        this.#truthTable.setNewSizesForGameOfLife(numberOfRows, numberOfColumns);
    }

    nextStateGameOfLife() {
        const nextState = this.#truthTable.nextStateGameOfLife();
        this.#golboard = nextState;
        return nextState;
    }
}