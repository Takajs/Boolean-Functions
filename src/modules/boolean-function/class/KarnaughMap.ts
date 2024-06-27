import { minTerm } from './minTerm';
export class KarnaughMap {

    #minTerms: Array<minTerm>;
    #indexesMap: Array<Array<number>>;
    #activationMap: Array<Array<Boolean>>;

    constructor({
        minTerms
    }: {
        minTerms: Array<minTerm>
    }) {
        this.#minTerms = minTerms;
        this.#indexesMap = this.generateIndexesMap();
        this.#activationMap = this.generateActivationMap();
    }

    generateIndexesMap() {
        if(this.#minTerms.length === 4){
            return [[0, 1, 2, 3]];
        }
        let baseIndexes: Array<Array<number>> = [[0, 1]]; //For 1 variable
        const mirrorK = (k: Array<Array<number>>): Array<Array<number>> => {
            const initialLength = k.reduce((acc, val) => acc + val.length, 0);
            let temp = k.map(arr => arr.map(val => val + initialLength));
            if (Math.log2(initialLength) % 2 === 1 || initialLength === 8) {

                temp = temp.map(arr => arr.reverse());
                let result: Array<Array<number>> = k.concat(temp);
                if (initialLength === 8) {
                    let temp = result[result.length - 1];
                    result[result.length - 1] = result[result.length - 2];
                    result[result.length - 2] = temp;
                    result[result.length - 1] = result[result.length - 1].reverse();
                    result[result.length - 2] = result[result.length - 2].reverse();
                }
                return result;
            } else {
                if (initialLength < 16) {
                    let result: Array<Array<number>> = [];
                    for (let i = 0; i < k.length; i += 2) {
                        result.push(k[i].concat(k[i + 1]));
                    }
                    for (let i = 0; i < temp.length; i += 2) {
                        result.push(temp[i].concat(temp[i + 1]));
                    }
                    return result;
                } else {
                    return k.concat(temp);

                }

            }
        }
        for (let i = 1; i < this.#minTerms[0].getNumberOfInputs(); i++) {
            baseIndexes = mirrorK(baseIndexes);
        }
        return baseIndexes;
    }

    getIndexesMap() {
        return this.#indexesMap;
    }
    getActivationMap() {
        return this.#activationMap;
    }

    generateActivationMap() {
        let map: Array<Array<Boolean>> = [];
        for (let i = 0; i < this.#indexesMap.length; i++) {
            map.push([]);
            for (let j = 0; j < this.#indexesMap[i].length; j++) {
                map[i].push(this.#minTerms[this.#indexesMap[i][j]].getValue()[this.#minTerms[this.#indexesMap[i][j]].getValue().length - 1]);
            }
        }
        this.#activationMap = map;
        return map;
    }
}