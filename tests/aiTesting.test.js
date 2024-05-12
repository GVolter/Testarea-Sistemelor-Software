const TicTacToe = require('../src/aiDomTicTacToe.js');
const { JSDOM } = require('jsdom');

// Mocking DOM elements for testing
const mockDocument = {
    querySelectorAll: jest.fn(() => []),
    getElementById: jest.fn(() => ({})),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    classList: {
        remove: jest.fn(),
        add: jest.fn(),
        contains: jest.fn()
    },
    innerText: ''
};

describe('TicTacToe', () => {
    let game;

    beforeEach(() => {
        game = new TicTacToe(mockDocument);
    });

    test('Initialization', () => {
        expect(game.circleTurn).toBe(false);
        expect(mockDocument.querySelectorAll).toHaveBeenCalledWith('[data-cell]');
        expect(mockDocument.getElementById).toHaveBeenCalledWith('board');
        expect(mockDocument.getElementById).toHaveBeenCalledWith('winningMessage');
        expect(mockDocument.getElementById).toHaveBeenCalledWith('restartButton');
        expect(mockDocument.querySelector).toHaveBeenCalledWith('[data-winning-message-text]');
        expect(mockDocument.addEventListener).toHaveBeenCalled();
    });

    test('Placing marks and swapping turns', () => {
        const cell = { classList: { contains: jest.fn(), add: jest.fn() } };
        mockDocument.querySelectorAll.mockReturnValue([cell]);

        game.handleClick({ target: cell });
        expect(cell.classList.add).toHaveBeenCalledWith('x');

        game.handleClick({ target: cell });
        expect(cell.classList.add).toHaveBeenCalledWith('circle');

        expect(game.circleTurn).toBe(true);
    });

    test('Win condition', () => {
        game.checkWin = jest.fn(() => true);
        game.endGame = jest.fn();

        game.handleClick({ target: {} });
        expect(game.endGame).toHaveBeenCalledWith(false);
    });

    test('Draw condition', () => {
        game.isDraw = jest.fn(() => true);
        game.endGame = jest.fn();

        game.handleClick({ target: {} });
        expect(game.endGame).toHaveBeenCalledWith(true);
    });

    test('Score update', () => {
        game.updateScore();

        expect(mockDocument.getElementById).toHaveBeenCalledWith('score');
        expect(mockDocument.getElementById().innerHTML).toMatch(/X wins: 0/);
    });
});
