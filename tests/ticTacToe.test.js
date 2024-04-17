const TicTacToe = require('../src/ticTacToe');

describe('Tic Tac Toe', () => {
    let game;

    beforeEach(() => {
        game = new TicTacToe();
    });

    test('board initializes correctly', () => {
        expect(game.board).toEqual([
            [' ', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' ']
        ]);
    });

    test('player X starts the game', () => {
        expect(game.currentPlayer).toBe('X');
    });

    test('switch player works correctly', () => {
        game.switchPlayer();
        expect(game.currentPlayer).toBe('O');
    });

    test('make move works correctly', () => {
        expect(game.makeMove(0, 0)).toBe(true);
        expect(game.board[0][0]).toBe('X');
    });

    test('cannot make move on occupied cell', () => {
        game.makeMove(0, 0);
        expect(game.makeMove(0, 0)).toBe(false);
    });

    test('winning condition works', () => {
        game.makeMove(0, 0); 
        game.switchPlayer();
        game.makeMove(1, 0); 
        game.switchPlayer();
        game.makeMove(0, 1); 
        game.switchPlayer();
        game.makeMove(1, 1); 
        game.switchPlayer();
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
});
