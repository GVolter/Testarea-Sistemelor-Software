const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, '../src/index.html'), 'utf8');

let dom;
let container;

beforeEach(() => {
  dom = new JSDOM(html);

  container = dom.window.document.body;
});


test('Game starts correctly', () => {
  expect(container.querySelector('#board').children.length).toBe(9);
  expect(container.querySelector('#winningMessage').classList.contains('show')).toBeFalsy();
});


test('Mark is placed correctly', () => {
  const cell = container.querySelector('.cell');
  cell.click();
  expect(cell.classList.contains('x')).toBeTruthy();
});


test('Game identifies a win correctly', () => {
  const cells = container.querySelectorAll('.cell');

  [0, 1, 2, 3, 4, 5, 6].forEach(i => {
    cells[i].click();
  });

  expect(container.querySelector('div[data-winning-message-text]').innerText).toBe("X's Wins!");
  expect(container.querySelector('#winningMessage').classList.contains('show')).toBeTruthy();
});


test('Game identifies a draw correctly', () => {
  const cells = container.querySelectorAll('[data-cell]');
  cells.forEach((cell, i) => {
    cell.click();
    if (i % 2 === 0) {
      expect(cell.classList.contains('x')).toBeTruthy();
    } else {
      expect(cell.classList.contains('circle')).toBeTruthy();
    }
  });
  expect(container.querySelector('[data-winning-message-text]').innerText).toBe('Draw!');
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