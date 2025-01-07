const board = document.querySelector('.board');
// массив клеток-элементов
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];


// Описываем все возможные растановки ходов для победы
const winningConditions = [
    // горизонтали
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // вертикали
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // диагонали
    [0, 4, 8],
    [2, 4, 6]
];

// Нажатие по клетке
function handleCellClick(event) {
    // получаем элемент, который нажали
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer);

    checkForWinner();
}

// проверка победителя и смена ходящего
function checkForWinner() {
    let roundWon = false;
    // смотрим, есть ли победитель
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {
            continue;
        }
        if (gameState[a] === gameState[b] && gameState[a] === gameState[c] && gameState[b] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    // последствия выигрыша - завершаенм игру
    if (roundWon) {
        statusText.textContent = `Игрок ${currentPlayer} выиграл!`;
        gameActive = false;
        return;
    }

    // проверка на ничью при отсутствии выигрыша через отсутствие пустых
    if (!gameState.includes('')) {
        statusText.textContent = 'Ничья!';
        gameActive = false;
        return;
    }

    // смена игрока
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Ход игрока ${currentPlayer}`;
}

// перезапуск игры
function resetGame() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    statusText.textContent = `Ход игрока X`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X');
        cell.classList.remove('O');
    });
}

// при начале задаем каждой клетке функцию обработки нажатия
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});
// задаем кнопке перезапуска функцию перезапуска
resetButton.addEventListener('click', resetGame);

statusText.textContent = `Ход игрока ${currentPlayer}`;
console.log("Скрипты отработали")