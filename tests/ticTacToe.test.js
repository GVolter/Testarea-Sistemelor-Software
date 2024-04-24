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
        jest.restoreAllMocks();
    });

    test('initializes the board correctly', () => {
        const emptyBoard = [
            [' ', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' ']
        ];
        expect(game.board).toEqual(emptyBoard);
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

    test('identifies a winning condition', () => {
        game.makeMove(0, 0); 
        game.makeMove(1, 0); 
        game.makeMove(0, 1); 
        game.makeMove(1, 1); 
        game.makeMove(0, 2); 

        expect(game.checkWin()).toBe(true);
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
});