class TicTacToe {
    constructor(document) {
      this.X_CLASS = 'x';
      this.CIRCLE_CLASS = 'circle';
      this.WINNING_COMBINATIONS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];
      this.cellElements = document.querySelectorAll('[data-cell]');
      this.board = document.getElementById('board');
      this.winningMessageElement = document.getElementById('winningMessage');
      this.restartButton = document.getElementById('restartButton');
      this.winningMessageTextElement = document.querySelector('[data-winning-message-text]');
      this.circleTurn = false;
      this.xScore = 0;
      this.oScore = 0;
      this.drawScore = 0;
      this.scoreElement = document.getElementById('score');
      this.startGame();
    }
  
    startGame() {
      this.circleTurn = false;
      this.cellElements.forEach(cell => {
        cell.classList.remove(this.X_CLASS);
        cell.classList.remove(this.CIRCLE_CLASS);
        cell.removeEventListener('click', this.handleClick);
        cell.addEventListener('click', this.handleClick.bind(this), { once: true });
      })
      this.setBoardHoverClass();
      this.winningMessageElement.classList.remove('show');
    }
  
    handleClick(e) {
      const cell = e.target;
      /* istanbul ignore next */
      if (cell.classList.contains(this.X_CLASS) || cell.classList.contains(this.CIRCLE_CLASS)) {
        return;
      }
      const currentClass = this.circleTurn ? this.CIRCLE_CLASS : this.X_CLASS;
      this.placeMark(cell, currentClass);
      if (this.checkWin(currentClass)) {
        this.endGame(false);
      } else if (this.isDraw()) {
        this.endGame(true);
      } else {
        this.swapTurns();
        this.setBoardHoverClass();
      }
    }
  
    endGame(draw) {
      if (draw) {
        this.winningMessageTextElement.innerText = 'Draw!';
        this.drawScore++;
      } else {
        this.winningMessageTextElement.innerText = `${this.circleTurn ? "O's" : "X's"} Wins!`;
        if (this.circleTurn) {
          this.oScore++;
        } else {
          this.xScore++;
        }
      }
      this.winningMessageElement.classList.add('show');
    }
  
    updateScore() {
        this.scoreElement.innerHTML = `
            <p>X wins: ${this.xScore}</p>
            <p>O wins: ${this.oScore}</p>
            <p>Draws: ${this.drawScore}</p>
        `;
    }
  
    isDraw() {
      return [...this.cellElements].every(cell => {
        return cell.classList.contains(this.X_CLASS) || cell.classList.contains(this.CIRCLE_CLASS);
      })
    }
  
    placeMark(cell, currentClass) {
      cell.classList.add(currentClass);
    }
  
    swapTurns() {
      this.circleTurn = !this.circleTurn;
    }
  
    setBoardHoverClass() {
      this.board.classList.remove(this.X_CLASS);
      this.board.classList.remove(this.CIRCLE_CLASS);
      if (this.circleTurn) {
        this.board.classList.add(this.CIRCLE_CLASS);
      } else {
        this.board.classList.add(this.X_CLASS);
      }
    }
  
    checkWin(currentClass) {
      return this.WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
          return this.cellElements[index].classList.contains(currentClass);
        });
      });
    }
  }
  
  module.exports = TicTacToe;
  