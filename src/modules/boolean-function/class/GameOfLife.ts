export class GameOfLife {

    #numberOfRows: number;
    #numberOfColumns: number;
    #board: Array<Array<boolean>>;
    #binaryRepresentative: number;
    #rules: string;

    constructor({ numberOfRows, numberOfColumns, rules, board }: { numberOfRows: number, numberOfColumns: number, rules: string, board?: Array<Array<boolean>> }) {
        this.#numberOfRows = numberOfRows;
        this.#numberOfColumns = numberOfColumns;

        this.#rules = rules.replace(/false/g, '0');
        this.#rules = this.#rules.replace(/true/g, '1');

        this.#board = [];
        for (let i = 0; i < numberOfRows; i++) {
            this.#board.push([]);
            for (let j = 0; j < numberOfColumns; j++) {
                if (board && i < board.length && j < board[i].length) {
                    this.#board[i].push(board[i][j]);
                } else {
                    this.#board[i].push(false);
                }
            }
        }
        this.#rules = rules;
    }
    getBoard() {
        return this.#board;
    }
    getNextState() {

        function getDecodedJSOperator(operator: string): string {
            while (operator.length < 2) {
                operator = '0' + operator;
            }
            switch (operator) {
                case '00':
                    return '&&';
                case '01':
                    return '||';
                case '10':
                    return '&& !';
                case '11':
                    return '|| !';
                default:
                    return '&&';
            }
        }

        function convertBinaryStringToAddVector(binaryString: string): Array<number> {

            while (binaryString.length < 3) {
                binaryString = '0' + binaryString;
            }
            switch (binaryString) {
                case '000':
                    return [-1, -1];
                case '001':
                    return [0, 0];
                case '010':
                    return [1, -1];
                case '011':
                    return [1, 0];
                case '100':
                    return [1, 1];
                case '101':
                    return [0, 1];
                case '110':
                    return [-1, 1];
                case '111':
                    return [-1, 0];
                default:
                    return [0, 0];
            }
        }
        //The steps for this are the following:
        /*
        *   1. Decodify the rules:
        *   The rules are a binary string that comes in chunks of 6 bits, each representing a new string in JS to be obtained from the binary string
        *   We create a variable JSrules that will be an string containing the decoded JS from the binary string
        *   The rules will be converted as a whole to a boolean JS condition
        * 
        *   Now, divide the binary string in chunks of 6 bits (the last chunk may be smaller), for each chunk:
        *   Its first bit (bit 0) will be decoded into a ! if it is 0, and nothing if it is 1
        *   The next 3bits are decoded as checkRuleForCell(i, j) (i, j will be later substituted by the actual values for each cell)
        *   The last 2 bits are decoded as a logic operator (&&, ||, && !, || !)
        *   Now, having all the chunks decoded into the JSrules, we add a closing parenthesis to the JSrules
        * 
        *   As an intermediary step, we create a temp variable, which is a board containing the next state of the board
        * 
        *   2. Check for each cell if, when substituting the Ci and Cj values, the rule is for their index is true
        *   For this, we start iterating over the board, and for each i,j:
        *   We will compute [Ci,Cj] as convertBinaryStringToAddVector(i,j), having then the indexes for the rule
        *   We will substitute every 'i' with Ci and every 'j' with Cj in the JSrules
        *   Now, the JSrules should be a sentence like if(this.#board[Ci][Cj] && this.#board[Ci][Cj] || !this.#board[Ci][Cj]), which can be evaluated as a boolean
        *   If the result is true, then the current cell for the next state (temp[i][j]) will be set to true, otherwise, it will be set to false
        * 
        *   3. Assign the temp board to the actual board
        *   Log the result and return it
        */
        ('The current state of the board is:');

        let binaryString: string = this.#rules.replace(/false/g, '0');
        binaryString = binaryString.replace(/true/g, '1');

        let chunks: Array<string> = [];

        if (binaryString.length <= 6) {
            binaryString = binaryString.slice(0, 4);
            chunks.push(binaryString);
        } else {
            //cut in chunks of 6 bits until the last chunk, which may be smaller
            while (binaryString.length > 6) {
                chunks.push(binaryString.slice(0, 6));
                binaryString = binaryString.slice(6);
            }
            chunks.push(binaryString);
        }


        let temp: Array<Array<boolean>> = [];
        for (let i = 0; i < this.#numberOfRows; i++) {
            temp.push([]);
            for (let j = 0; j < this.#numberOfColumns; j++) {
                temp[i].push(false);
            }
        }

        for (let i = 0; i < this.#numberOfRows; i++) {
            for (let j = 0; j < this.#numberOfColumns; j++) {


                let JSrules: string = '(';
                for (let k = 0; k < chunks.length; k++) {

                    if (chunks[k].length > 1) {
                        //bit 0
                        JSrules += chunks[k][0] === '0' ? '!' : '';

                        //bits 1-3 (actual word)
                        let Ci = convertBinaryStringToAddVector(chunks[k].slice(1, 4))[0];
                        let Cj = convertBinaryStringToAddVector(chunks[k].slice(1, 4))[1];
                        let CiCj = [i + Ci, j + Cj];

                        //Check if we would be out of bounds
                        if (CiCj[0] >= 0 && CiCj[0] < this.#numberOfRows && CiCj[1] >= 0 && CiCj[1] < this.#numberOfColumns) {
                            JSrules += 'board[' + CiCj[0] + '][' + CiCj[1] + ']';
                        } else {
                            JSrules = '(false';
                        }

                        if (k < chunks.length - 1) {
                            //bits 4-5 (operator)
                            JSrules += getDecodedJSOperator(chunks[k].slice(4, 6));
                        }
                    }
                }
                JSrules += ')';
                let board = this.#board;
                temp[i][j] = eval(JSrules);

            }
        }
        this.#board = temp;
        return this.#board;
    }
    beautyLogBoard() {
        for (let i = 0; i < this.#numberOfRows; i++) {
            let row = '';
            for (let j = 0; j < this.#numberOfColumns; j++) {
                row += this.#board[i][j] ? '1 ' : '0 ';
            }
            console.log(`${i}:[${row}]`)
        }
    }
    setNewSizes({ numberOfRows, numberOfColumns }: { numberOfRows: number, numberOfColumns: number }) {
        this.#numberOfRows = numberOfRows;
        this.#numberOfColumns = numberOfColumns;
        this.#board = [];
        for (let i = 0; i < numberOfRows; i++) {
            this.#board.push([]);
            for (let j = 0; j < numberOfColumns; j++) {
                if (i < this.#board.length && j < this.#board[i].length) {
                    this.#board[i].push(this.#board[i][j]);
                } else {
                    this.#board[i].push(false);
                }
            }
        }
    }
    clone() {
        const game = new GameOfLife({
            numberOfRows: this.#numberOfRows,
            numberOfColumns: this.#numberOfColumns,
            rules: this.#rules,
            board: this.#board
        })
        //copy the board
        for (let i = 0; i < this.#numberOfRows; i++) {
            for (let j = 0; j < this.#numberOfColumns; j++) {
                game.getBoard()[i][j] = this.#board[i][j];
            }
        }
        return game;
    }
}
