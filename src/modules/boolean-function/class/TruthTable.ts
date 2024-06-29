import { minTerm } from "./minTerm";
import { KarnaughMap } from "./KarnaughMap";
import { GameOfLife } from "./GameOfLife";

const OR_OPERATOR = ' + ';
const AND_OPERATOR = '';

//This is an abstraction of a truth table as a collection of minTerms
export class TruthTable {
    #numberOfInputs: number;
    #minTerms: Array<minTerm>;
    #activatedminTerms: Array<number>;
    #stringRepresentation: string;
    #karnaughMap: KarnaughMap;
    #gameOfLife: GameOfLife;
    #binaryRepresentative: string;
    #golboard: Array<Array<boolean>>;

    constructor({
        numberOfInputs,
        activatedminTerms,
        board

    }: {
        numberOfInputs: number,
        activatedminTerms?: Array<number>,
        board?: Array<Array<boolean>>

    }) {
        this.#numberOfInputs = numberOfInputs;
        this.#activatedminTerms = activatedminTerms || [];

        this.#minTerms = [];
        this.generateTruthTable();
        this.#stringRepresentation = this.getStringRepresentation();
        this.#karnaughMap = new KarnaughMap({
            minTerms: this.#minTerms
        });

        this.#binaryRepresentative = this.getRepresentativeBinaryArray().join('');
        this.#gameOfLife = new GameOfLife({
            numberOfRows: 70,
            numberOfColumns: 70,
            rules: this.#binaryRepresentative,
            board: board ? board : []
        });
        this.#golboard = this.#gameOfLife.getBoard();
    }

    getBoard() {
        return this.#golboard;
    }
    nextStateGameOfLife() {
        this.#golboard = this.#gameOfLife.getNextState();
        return this.#golboard;
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
        return this.#minTerms;
    }
    invertminTerm(index: number) {
        this.#minTerms[index].invert();
    }

    getStringRepresentation() {
        if (!this.#activatedminTerms?.length) {
            return '0';
        }
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
                        .join(AND_OPERATOR)
                    )
                    .join(OR_OPERATOR);
        }
    }

    getKarnaughIndexesMap() {
        return this.#karnaughMap.getIndexesMap();
    }
    getKarnaughActivationsMap() {
        return this.#karnaughMap.getActivationMap();
    }

    getminTerm(index: number) {
        return this.#minTerms[index].getValue();
    }
    solveKarnaughMap() {
        return this.#karnaughMap.solveByGrouping();
    }
    getRepresentativeBinaryArray() {
        return (this.#minTerms.map(minTerm => minTerm.getValue()[minTerm.getValue().length - 1])).reverse();
    }

    setNewSizesForGameOfLife(numberOfRows: number, numberOfColumns: number) {
        this.#gameOfLife.setNewSizes({ numberOfRows, numberOfColumns });
    }
    getGameOfLife() {
        return this.#gameOfLife;
    }
}