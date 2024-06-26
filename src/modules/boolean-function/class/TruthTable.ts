import { minTerm } from "./minTerm";

//This is an abstraction of a truth table as a collection of minTerms
export class TruthTable {
    #numberOfInputs: number;
    #minTerms: Array<minTerm>;
    #activatedminTerms: Array<number>;
    #stringRepresentation: string;
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
        this.#stringRepresentation = this.getStringRepresentation();
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

    getStringRepresentation() {
        switch (this.#activatedminTerms.length) {
            case 0:
                return '0';
            case 2 ** this.#numberOfInputs:
                return '1';
            default:
                const variableNames = Array.from({ length: this.#numberOfInputs }, (_, i) => String.fromCharCode(65 + i));
                return this.#minTerms
                    .filter(minTerm => minTerm.getValue()[minTerm.getValue().length - 1])
                    .map(minTerm => minTerm.getValue()
                        .slice(0, minTerm.getValue().length - 1)
                        .map((value, index) => value ? `${variableNames[index]}` : `!${variableNames[index]}`)
                        .join('')
                    )
                    .join(' + ');
        }
    }
}