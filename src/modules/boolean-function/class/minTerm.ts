export class minTerm {
    #numberOfInputs: number;
    #index: number;
    #isActivated: boolean;
    #value: Array<boolean>;

    constructor({
        numberOfInputs,
        index,
        isActivated
    }: {
        numberOfInputs: number,
        index: number,
        isActivated: boolean
    }) {
        this.#numberOfInputs = numberOfInputs;
        this.#index = index;
        this.#isActivated = isActivated;
        this.#value = this.generateValue();
    }
    generateValue() {
        const binary = this.#index.toString(2).padStart(this.#numberOfInputs, '0');
        const result = binary.split('').map(bit => bit === '1');
        result.push(this.#isActivated);
        return result;
    }

    getValue() {
        return this.#value;
    }
    invert() {
        this.#isActivated = !this.#isActivated;
        this.#value[this.#value.length - 1] = this.#isActivated;
    }

}