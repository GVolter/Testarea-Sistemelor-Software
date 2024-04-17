const readline = require('readline');

class TicTacToe {
    constructor() {
        this.board = [
            [' ', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' ']
        ];
        this.currentPlayer = 'X';
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    printBoard() {
        let output = '';
        this.board.forEach((row, idx) => {
            output += `${row[0]} | ${row[1]} | ${row[2]}\n`;
            if (idx < 2) output += '---------\n';
        });
        console.log(output);
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }

    checkWin() {
        const b = this.board;
        const lines = [
            [b[0][0], b[0][1], b[0][2]],
            [b[1][0], b[1][1], b[1][2]],
            [b[2][0], b[2][1], b[2][2]],
            [b[0][0], b[1][0], b[2][0]],
            [b[0][1], b[1][1], b[2][1]],
            [b[0][2], b[1][2], b[2][2]],
            [b[0][0], b[1][1], b[2][2]],
            [b[0][2], b[1][1], b[2][0]]
        ];
        return lines.some(line => line.every(cell => cell === this.currentPlayer));
    }

    isBoardFull() {
        return this.board.every(row => row.every(cell => cell !== ' '));
    }

    makeMove(row, col) {
        if (this.board[row][col] === ' ') {
            this.board[row][col] = this.currentPlayer;
            return true;
        }
        return false;
    }

    startGame() {
        this.getInput();
    }

    getInput() {
        this.printBoard();
        this.rl.question(`Player ${this.currentPlayer}, enter your move (row,col): `, input => {
            const [row, col] = input.split(',').map(Number);
            if (row >= 0 && row < 3 && col >= 0 && col < 3 && this.makeMove(row, col)) {
                if (this.checkWin()) {
                    this.printBoard();
                    console.log(`Player ${this.currentPlayer} wins!`);
                    this.rl.close();
                } else if (this.isBoardFull()) {
                    this.printBoard();
                    console.log("It's a draw!");
                    this.rl.close();
                } else {
                    this.switchPlayer();
                    this.getInput();
                }
            } else {
                console.log("Invalid move. Please enter row,col within 0,1,2.");
                this.getInput();
            }
        });
    }
}

module.exports = TicTacToe;