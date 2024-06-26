import { minTerm } from "./minTerm";
export class TruthTable {
    #numberOfInputs: number;
    #minTerms: Array<minTerm>;
    #activatedminTerms: Array<number>;
    constructor({
        numberOfInputs,
        activatedminTerms
    }: {
        numberOfInputs: number,
        activatedminTerms?: Array<number>
    }) {
        this.#numberOfInputs = numberOfInputs;
        this.#activatedminTerms = activatedminTerms || [];

        this.#minTerms = [];
        this.generateTruthTable();
    }

    generateTruthTable() {
        for (let i = 0; i < (2 ** this.#numberOfInputs); i++) {
            this.#minTerms.push(new minTerm({
                numberOfInputs: this.#numberOfInputs,
                index: i,
                isActivated: this.#activatedminTerms.includes(i)
            }));
        }
    }
    getminTerms() {
        return this.#minTerms.map(minTerm => minTerm.getValue());
    }
    invertminTerm(index: number) {
        this.#minTerms[index].invert();
    }
}