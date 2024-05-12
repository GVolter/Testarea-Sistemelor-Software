const TicTacToe = require('../src/ticTacToe');
const readline = require('readline');

jest.mock('readline');

describe('Tic Tac Toe', () => {
    let game;
    let mockQuestion;
    let mockClose;

    beforeEach(() => {
        mockQuestion = jest.fn();
        mockClose = jest.fn();
        readline.createInterface.mockReturnValue({
            question: mockQuestion,
            close: mockClose
        });

        game = new TicTacToe();
        jest.spyOn(console, 'log').mockImplementation((...args) => {
            if (args[0].includes('Invalid move')) {
                console.info(...args);
            }
        });
        jest.spyOn(game, 'printBoard').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('constructor initializes all game components correctly', () => {
        expect(game.board).toEqual([
            [' ', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' ']
        ]);
        expect(game.currentPlayer).toBe('X');
        expect(readline.createInterface).toHaveBeenCalledWith({
            input: process.stdin,
            output: process.stdout
        });
    });

    test('starts with player X', () => {
        expect(game.currentPlayer).toBe('X');
    });

    test('switches player correctly', () => {
        game.switchPlayer();
        expect(game.currentPlayer).toBe('O');
        game.switchPlayer();
        expect(game.currentPlayer).toBe('X');
    });

    test('makes a move and updates the board', () => {
        expect(game.makeMove(0, 0)).toBe(true);
        expect(game.board[0][0]).toBe('X');
    });

    test('prevents move on an occupied cell', () => {
        game.makeMove(0, 0);
        expect(game.makeMove(0, 0)).toBe(false); 
    });

    test('identifies a winning condition correctly', () => {
        game.currentPlayer = 'X'; // Ensure it starts with X
        game.makeMove(0, 0); // X
        game.switchPlayer();
        game.makeMove(1, 0); // O
        game.switchPlayer();
        game.makeMove(0, 1); // X
        game.switchPlayer();
        game.makeMove(1, 1); // O
        game.switchPlayer();
        game.makeMove(0, 2); // X wins
    
        expect(game.checkWin()).toBe(true);
    });
    
    test('does not falsely identify a winning condition', () => {
        game.currentPlayer = 'X';
        game.makeMove(0, 0); // X
        game.switchPlayer();
        game.makeMove(0, 1); // O
        game.switchPlayer();
        game.makeMove(0, 2); // X
    
        // No winner should be identified here
        expect(game.checkWin()).toBe(false);
    });
    
    describe('All possible winning conditions', () => {
        const winLines = [
            [[0, 0], [0, 1], [0, 2]], // Top row
            [[1, 0], [1, 1], [1, 2]], // Middle row
            [[2, 0], [2, 1], [2, 2]], // Bottom row
            [[0, 0], [1, 0], [2, 0]], // Left column
            [[0, 1], [1, 1], [2, 1]], // Middle column
            [[0, 2], [1, 2], [2, 2]], // Right column
            [[0, 0], [1, 1], [2, 2]], // Left-right diagonal
            [[0, 2], [1, 1], [2, 0]]  // Right-left diagonal
        ];
    
        winLines.forEach((line, index) => {
            test(`line ${index + 1} results in a win`, () => {
                game.board = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']]; // Reset board
                game.currentPlayer = 'X';
                line.forEach(([row, col]) => {
                    game.makeMove(row, col);
                });
                expect(game.checkWin()).toBe(true);
            });
        });
    });    

    test('draw condition works', () => {
        game.makeMove(0, 0); 
        game.switchPlayer();
        game.makeMove(0, 1); 
        game.switchPlayer();
        game.makeMove(0, 2); 
        game.switchPlayer();
        game.makeMove(1, 1);
        game.switchPlayer();
        game.makeMove(1, 0);
        game.switchPlayer();
        game.makeMove(1, 2); 
        game.switchPlayer();
        game.makeMove(2, 1); 
        game.switchPlayer();
        game.makeMove(2, 0); 
        game.switchPlayer();
        game.makeMove(2, 2); 
        expect(game.isBoardFull()).toBe(true);
        expect(game.checkWin()).toBe(false);
    });

    test('isBoardFull returns false when only one row is full', () => {
        game.board = [
            ['X', 'X', 'X'],  // Full row
            ['X', ' ', 'O'],  // Not full
            ['O', 'O', ' ']   // Not full
        ];
        expect(game.isBoardFull()).toBe(false);
    });    

    test('isBoardFull returns false for an empty board', () => {
        game.board = [
            [' ', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' ']
        ];
        expect(game.isBoardFull()).toBe(false);
    });
    
    test('isBoardFull returns false when just one cell is empty', () => {
        game.board = [
            ['X', 'O', 'X'],
            ['X', 'X', 'O'],
            ['O', 'X', ' ']  // One empty cell
        ];
        expect(game.isBoardFull()).toBe(false);
    });
    

    test('handles input for a valid move, win, and draw correctly', () => {
        mockQuestion.mockImplementationOnce((prompt, callback) => callback('0,0'));
        mockQuestion.mockImplementationOnce((prompt, callback) => callback('0,1'));
        mockQuestion.mockImplementationOnce((prompt, callback) => callback('0,2'));

        jest.spyOn(game, 'checkWin').mockReturnValue(true);
        game.getInput();

        expect(mockClose).toHaveBeenCalled();
        expect(console.log).toHaveBeenCalledWith(`Player ${game.currentPlayer} wins!`);

        jest.spyOn(game, 'checkWin').mockReturnValue(false);
        jest.spyOn(game, 'isBoardFull').mockReturnValue(true);
        game.getInput();

        expect(console.log).toHaveBeenCalledWith("It's a draw!");
        expect(mockClose).toHaveBeenCalled();
    });

    test('rejects invalid input and repeats the prompt', async () => {
        mockQuestion.mockImplementationOnce((prompt, callback) => callback('3,3'));
        mockQuestion.mockImplementationOnce((prompt, callback) => callback('0,0')); 
    
        const logSpy = jest.spyOn(console, 'log');
    
        const getInputSpy = jest.spyOn(game, 'getInput');
        game.getInput(() => {});
    
        while (getInputSpy.mock.calls.length < 2) {
            await new Promise(resolve => setImmediate(resolve));
        }
    
        expect(logSpy).toHaveBeenCalledWith("Invalid move. Please enter row,col within 0,1,2.");
        expect(getInputSpy).toHaveBeenCalledTimes(2);
    });

    describe('Input Handling', () => {
        test.each([
            { input: '0,0', valid: true },
            { input: '2,2', valid: true },
            { input: '3,0', valid: false }, // Out of bounds
            { input: '0,3', valid: false }, // Out of bounds
            { input: '-1,-1', valid: false } // Negative indices, out of bounds
        ])('verifies that move is within valid grid boundaries for input %s', ({ input, valid }) => {
            const [row, col] = input.split(',').map(Number);
            mockQuestion.mockImplementationOnce((_, callback) => callback(input));
            game.getInput(() => {});
    
            // After getInput, check the actual state of the board
            if (valid && row >= 0 && row < 3 && col >= 0 && col < 3) {
                expect(game.board[row][col]).not.toBe(' '); // Assuming default empty cell is ' '
            } else {
                expect(console.log).toHaveBeenCalledWith("Invalid move. Please enter row,col within 0,1,2.");
            }
        });
    });
    
    
});