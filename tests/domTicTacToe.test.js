const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, '../src/index.html'), 'utf8');

// Import the functions from the script
const TicTacToe = require('../src/domTicTacToe.js');

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
	game.startGame(); 
	const cells = container.querySelectorAll('[data-cell]');
	cells.forEach(cell => {
	  expect(cell.classList.contains(game.X_CLASS)).toBeFalsy();
	  expect(cell.classList.contains(game.CIRCLE_CLASS)).toBeFalsy();
	});
	expect(container.querySelector('#board').classList.contains(game.X_CLASS)).toBeTruthy();
	expect(container.querySelector('#board').classList.contains(game.CIRCLE_CLASS)).toBeFalsy();
	expect(container.querySelector('#winningMessage').classList.contains('show')).toBeFalsy();
	expect(cells.length).toBe(9);
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

test('Game identifies O win correctly', () => {
  const cells = container.querySelectorAll('.cell');
  [0, 1, 2, 4, 3, 7].forEach(i => {
    game.handleClick({ target: cells[i] });
  });
  expect(game.checkWin(game.CIRCLE_CLASS)).toBeTruthy();
  expect(container.querySelector('div[data-winning-message-text]').innerText).toBe("O's Wins!");
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

test('X wins counter increments correctly', () => {
  const cells = container.querySelectorAll('.cell');

  [0, 1, 2, 3, 4, 5, 6].forEach(i => {
    game.handleClick({ target: cells[i] });
  });
  const restartButton = container.querySelector('#restartButton');
  restartButton.click();

  expect(game.xScore).toBe(1);
  expect(game.oScore).toBe(0);
  expect(game.drawScore).toBe(0);
});

test('O wins counter increments correctly', () => {
  const cells = container.querySelectorAll('.cell');
  [0, 1, 2, 4, 3, 7].forEach(i => {
    game.handleClick({ target: cells[i] });
  });
  const restartButton = container.querySelector('#restartButton');
  restartButton.click();
  
  expect(game.oScore).toBe(1);
  expect(game.xScore).toBe(0);
  expect(game.drawScore).toBe(0);
});

test('Draw counter increments correctly', () => {
  const cells = container.querySelectorAll('.cell');
  [0, 1, 2, 4, 3, 5, 7, 6, 8].forEach(i => {
    game.handleClick({ target: cells[i] });
  });
  const restartButton = container.querySelector('#restartButton');
  restartButton.click();
  expect(game.drawScore).toBe(1);
  expect(game.xScore).toBe(0);
  expect(game.oScore).toBe(0);
});

test('Draw counter increments correctly in the DOM', () => {
  const cells = container.querySelectorAll('.cell');
  [0, 1, 2, 4, 3, 5, 7, 6, 8].forEach(i => {
    game.handleClick({ target: cells[i] });
  });
  const restartButton = container.querySelector('#restartButton');
  restartButton.click();

  setTimeout(() => {
    const drawScore = container.querySelector('#score');
    scoresArray = drawScore.innerHTML.trim().split('\n');

    let drawScoreText = scoresArray[2].trim().substring(3);
    drawScoreText = drawScoreText.substring(0, drawScoreText.length - 4)
    expect(drawScoreText).toBe('Draws: 1');
    expect(game.drawScore).toBe(1);
  }, 50);
});

test('X wins counter increments correctly in the DOM', () => {
  const cells = container.querySelectorAll('.cell');

  [0, 1, 2, 3, 4, 5, 6].forEach(i => {
    game.handleClick({ target: cells[i] });
  });
  const restartButton = container.querySelector('#restartButton');
  restartButton.click();

  setTimeout(() => {
    const score = container.querySelector('#score');
    scoresArray = score.innerHTML.trim().split('\n');

    let xScoreText = scoresArray[0].trim().substring(3);
    xScoreText = xScoreText.substring(0, xScoreText.length - 4)
    expect(xScoreText).toBe("X wins: 1");
    expect(game.xScore).toBe(1);
  }, 50);
});

test('O wins counter increments correctly in the DOM', () => {
  const cells = container.querySelectorAll('.cell');
  [0, 1, 2, 4, 3, 7].forEach(i => {
    game.handleClick({ target: cells[i] });
  });
  game.updateScore();

  const score = container.querySelector('#score');
  scoresArray = score.innerHTML.trim().split('\n');

  let oScoreText = scoresArray[1].trim().substring(3);
  oScoreText = oScoreText.substring(0, oScoreText.length - 4)
  expect(oScoreText).toBe("O wins: 1");
  expect(game.oScore).toBe(1);
});

describe('Board Hover Class Tests', () => {
    beforeEach(() => {
        dom = new JSDOM(html, {
            runScripts: 'dangerously',
            resources: 'usable'
        });
        container = dom.window.document.body;
        game = new TicTacToe(dom.window.document);
        game.startGame(); 
    });

    test('setBoardHoverClass adds X class when it is X\'s turn', () => {
        game.circleTurn = false; 
        game.setBoardHoverClass();
        expect(container.querySelector('#board').classList.contains(game.X_CLASS)).toBeTruthy();
        expect(container.querySelector('#board').classList.contains(game.CIRCLE_CLASS)).toBeFalsy();
    });

    test('setBoardHoverClass adds Circle class when it is Circle\'s turn', () => {
        game.circleTurn = true; 
        game.setBoardHoverClass();
        expect(container.querySelector('#board').classList.contains(game.CIRCLE_CLASS)).toBeTruthy();
        expect(container.querySelector('#board').classList.contains(game.X_CLASS)).toBeFalsy();
    });
});

