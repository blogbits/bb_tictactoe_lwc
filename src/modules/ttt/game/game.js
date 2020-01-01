/* eslint-disable no-console */
export const X = 'X';
export const O = 'O';
const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
export default class Game {
    squares = Array(9).fill('');
    isUserTurn = true;
    userSymbol = X;

    reset() {
        this.squares = Array(9).fill('');
        this.isUserTurn = true;
    }

    getSquareValue(idx) {
        return this.squares[idx];
    }

    setSquareValue(squareIndex, squareValue) {
        this.squares[squareIndex] = squareValue;
    }

    getNextSymbol() {
        if (this.isUserTurn) {
            return this.userSymbol;
        }
        return this.userSymbol === X ? O : X
    }

    nextPlayerIs() {
        return this.getNextSymbol();
    }

    doUserMove(squareIndex) {
        const symbol = this.getNextSymbol();
        this.setSquareValue(squareIndex, symbol);
        this.isUserTurn = false;
    }

    getRandomEmptySquare() {
        let emptyIndexes = []
        for (let idx = 0; idx < this.squares.length; idx++) {
            if (!this.squares[idx]) {
                emptyIndexes.push(idx)
            }
        }
        return emptyIndexes[this.getRandomInt(0, emptyIndexes.length)]
    }


    doComputerMove() {
        let symbol = this.getNextSymbol()

        let moveIndex = this.findLineWithTwoSymbols();
        if (!moveIndex) {
            moveIndex = this.getRandomEmptySquare()
        }
        this.setSquareValue(moveIndex, symbol)
        this.isUserTurn = true;
        return moveIndex
    }

    hasMovesRemaining() {
        let found = this.squares.findIndex((e) => e === '');
        return found > -1;
    }

    findLineWithTwoSymbols() {
        let result;
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (this.squares[a] && this.squares[a] === this.squares[b] && !this.squares[c]) {
                result = c;
                break;
            } else if (this.squares[a] && this.squares[a] === this.squares[c] && !this.squares[b]) {
                result = b;
                break;
            } else if (this.squares[b] && this.squares[b] === this.squares[c] && !this.squares[a]) {
                result = a;
                break;
            }
        }
        return result;
    }

    calculateWinner = () => {

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (
                this.squares[a] &&
                this.squares[a] === this.squares[b] &&
                this.squares[a] === this.squares[c]
            ) {
                return this.squares[a];
            }
        }
        return null;
    };

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
}
