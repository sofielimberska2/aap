const cells = Array.from(document.querySelectorAll('.cell'));
const statusText = document.getElementById('status');
const restartButton = document.getElementById('restart-btn');

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let board = Array(9).fill('');
let currentPlayer = 'X';
let gameOver = false;

const updateStatus = (message) => {
  statusText.textContent = message;
};

const checkWinner = () => {
  for (const combo of winningCombinations) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], combo };
    }
  }

  return null;
};

const renderBoard = () => {
  cells.forEach((cell, index) => {
    const value = board[index];
    cell.textContent = value;
    cell.classList.remove('x', 'o');

    if (value) {
      cell.classList.add(value.toLowerCase());
    }

    cell.disabled = Boolean(value) || gameOver;
  });
};

const handleCellClick = (event) => {
  const cellIndex = Number(event.currentTarget.dataset.cellIndex);

  if (board[cellIndex] || gameOver) {
    return;
  }

  board[cellIndex] = currentPlayer;
  renderBoard();

  const winnerInfo = checkWinner();

  if (winnerInfo) {
    gameOver = true;
    updateStatus(`Player ${winnerInfo.winner} wins!`);
    cells.forEach((cell) => {
      cell.disabled = true;
    });
    return;
  }

  if (board.every((value) => value !== '')) {
    gameOver = true;
    updateStatus("It's a draw!");
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  updateStatus(`Player ${currentPlayer}'s turn`);
};

const resetGame = () => {
  board = Array(9).fill('');
  currentPlayer = 'X';
  gameOver = false;
  updateStatus("Player X's turn");
  renderBoard();
};

cells.forEach((cell) => {
  cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', resetGame);

renderBoard();
