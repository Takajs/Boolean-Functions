const FORBIDDEN_NAMES = [
    'true',
    'false',
    '1',
    '0',
    'and',
    'or',
    'not',
    'xor',
    'nand',
    'nor',
    'xnor',
    'implies',
    'equals',
    '(', ')',
    '[', ']',
    '{', '}',
    ' ', '\t', '\n', '\r'];
function isForbiddenBooleanVariableName(name: string) {
    return FORBIDDEN_NAMES.includes(name);
}

const usedNames = new Set<string>();
function isAlreadyInUseBooleanVariableName(name: string) {
    return usedNames.has(name);
}

export class InputBooleanVariable {
    #index: Number;
    #name: string;

    constructor({
        index,
        name
    }: {
        index: Number,
        name: string
    }) {
        this.#name = '';
        this.changeName(name);
        this.#index = index;
    }

    getIndex() : number {
        return this.#index;
    }
    getName() {
        return this.#name;
    }
    changeName(newName: string) {
        if (isForbiddenBooleanVariableName(newName)) {
            throw new Error(`The name ${newName} is not allowed, please use a different name.`);
        }
        if (isAlreadyInUseBooleanVariableName(newName)) {
            throw new Error(`The name ${newName} is already in use, please use a different name.`);
        }
        this.#name = newName;
        usedNames.delete(this.#name);
        usedNames.add(newName);
    }
}