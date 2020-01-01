/* eslint-disable no-console */
import { LightningElement, track } from 'lwc';
import Game from 'ttt/game';
const DELAY_MOVES = 800;
const DELAY_RESET = 2000

export default class Board extends LightningElement {

    game = new Game();
    @track status = '';

    constructor() {
        super();
        this.setStatusUI();
    }

    setSquareSymbol(square) {
        const squareValue = this.game.getSquareValue(square.idx)
        square.symbol = squareValue;
    }

    clearBoard() {
        this.game.reset();
        let squareNodes = this.template.querySelectorAll('ttt-square')
        for (let index = 0; index < squareNodes.length; index++) {
            const squareNode = squareNodes[index];
            squareNode.symbol = ''
        }
    }

    userMove(square) {
        this.game.doUserMove(square.idx);
        this.setSquareSymbol(square);
        this.setStatusUI();
    }

    delay(time) {
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        return new Promise((resolve) => setTimeout(resolve, time))
    }


    findComputerMoveSquare(computerMoveIndex) {
        let squareNodes = this.template.querySelectorAll('ttt-square')
        for (let index = 0; index < squareNodes.length; index++) {
            const squareNode = squareNodes[index];
            const squareNodeIndex = parseInt(squareNode.idx, 10)
            if (squareNodeIndex === computerMoveIndex) {
                return squareNode;
            }
        }
        return undefined;
    }

    computerMove() {

        if (this.game.calculateWinner()) {
            return;
        }
        this.delay(DELAY_MOVES).then(() => {
            let computeMoveIndex = this.game.doComputerMove()
            const computerMoveSquare = this.findComputerMoveSquare(computeMoveIndex)
            if (computerMoveSquare) {
                this.setSquareSymbol(computerMoveSquare)
            }
            this.setStatusUI();
        })
    }

    setStatusUI() {
        let result = `Next Player is:  ${this.game.nextPlayerIs()}`;
        let winner = this.game.calculateWinner();

        if (winner) {
            result = `Winner is ${winner}`;
        } else if (!this.game.hasMovesRemaining()) {
            result = 'Game Tied';
        }
        this.status = result;
    }

    canUserMove(square) {
        let result = true;
        if (
            this.game.calculateWinner() ||
            this.game.getSquareValue(square.idx)
        ) {
            result = false;
        }
        return result;
    }
    doMoves(square) {
        if (this.canUserMove(square)) {
            this.userMove(square)
            this.computerMove();
        }
    }

    handleSymbolChange(evt) {
        let newUserSymbol = evt.detail;
        this.game.userSymbol = newUserSymbol;
        this.clearBoard();
        this.setStatusUI();
    }

    renderedCallback() {
        if (this.game.calculateWinner()) {
            this.delay(DELAY_RESET).then(() => {
                this.clearBoard();
                this.setStatusUI();
            });
        } else if (!this.game.hasMovesRemaining()) {
            this.delay(DELAY_RESET).then(() => {
                this.clearBoard();
                this.setStatusUI();
            });
        }
        console.log('Board Rendered Callback');
    }

    handleSquareClick(evt) {
        if (this.game.isUserTurn) {
            this.doMoves(evt.target)
        }
    }
}
