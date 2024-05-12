const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, '../src/index.html'), 'utf8');

// Import the functions from the script
const TicTacToe = require('../src/domTicTacToe');

let dom;
let container;
let game;

beforeEach(() => {
    dom = new JSDOM(html, {
        runScripts: 'dangerously',
        resources: 'usable'
    });

    container = dom.window.document.body;
    
    game = new TicTacToe(dom.window.document);
});


test('Game starts correctly', () => {
  expect(container.querySelector('#board').children.length).toBe(9);
  expect(container.querySelector('#winningMessage').classList.contains('show')).toBeFalsy();
});


test('Mark is placed correctly', () => {
  const cell = container.querySelector('.cell');
  game.handleClick({ target: cell });
  expect(cell.classList.contains('x')).toBeTruthy();
});


test('Game identifies a win correctly', () => {
  const cells = container.querySelectorAll('.cell');

  [0, 1, 2, 3, 4, 5, 6].forEach(i => {
    game.handleClick({ target: cells[i] });
  });

  expect(game.checkWin(game.X_CLASS)).toBeTruthy();
  expect(container.querySelector('div[data-winning-message-text]').innerText).toBe("X's Wins!");
  expect(container.querySelector('#winningMessage').classList.contains('show')).toBeTruthy();
});


test('Game identifies a draw correctly', () => {
  const cells = container.querySelectorAll('.cell');
  [0, 1, 2, 4, 3, 5, 7, 6, 8].forEach(i => {
    game.handleClick({ target: cells[i] });
  });
  expect(game.isDraw()).toBeTruthy();
  expect(container.querySelector('div[data-winning-message-text]').innerText).toBe('Draw!');
  expect(container.querySelector('#winningMessage').classList.contains('show')).toBeTruthy();
});


test('Game restarts correctly', () => {
  const restartButton = container.querySelector('#restartButton');
  restartButton.click();
  const cells = container.querySelectorAll('[data-cell]');
  cells.forEach(cell => {
    expect(cell.classList.contains('x') || cell.classList.contains('circle')).toBeFalsy();
  });
  expect(container.querySelector('#winningMessage').classList.contains('show')).toBeFalsy();
});