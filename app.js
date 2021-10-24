let currPlrDisplay = document.getElementById('current-player');
const game = document.querySelector('.game-box');
const playerOResults = document.querySelector('#player-o-results');
const playerXResults = document.querySelector('#player-x-results');
const infoDisplay = document.querySelector('.display-information');
const restartBtn = document.querySelector('.restart-button');
const firstRow = document.querySelector('#first-row');
const secondRow = document.querySelector('#second-row');
const thirdRow = document.querySelector('#third-row');
const columnOneOne = document.querySelector('#column-one-one');
const columnOneTwo = document.querySelector('#column-one-two');
const columnOneThree = document.querySelector('#column-one-three');
const columnTwoOne = document.querySelector('#column-two-one');
const columnTwoTwo = document.querySelector('#column-two-two');
const columnTwoThree = document.querySelector('#column-two-three');
const columnThreeOne = document.querySelector('#column-three-one');
const columnThreeTwo = document.querySelector('#column-three-two');
const columnThreeThree = document.querySelector('#column-three-three');
const diagonalOneOne = document.querySelector('.diagonal-one-one');
const diagonalOneTwo = document.querySelector('.diagonal-one-two');
const diagonalOneThree = document.querySelector('.diagonal-one-three');
const diagonalTwoOne = document.querySelector('.diagonal-two-one');
const diagonalTwoTwo = document.querySelector('.diagonal-two-two');
const diagonalTwoThree = document.querySelector('.diagonal-two-three');
const firstColumn = [columnOneOne, columnOneTwo, columnOneThree];
const secondColumn = [columnTwoOne, columnTwoTwo, columnTwoThree];
const thirdColumn = [columnThreeOne, columnThreeTwo, columnThreeThree];
const firstDiagonal = [diagonalOneOne, diagonalOneTwo, diagonalOneThree];
const secondDiagonal = [diagonalTwoOne, diagonalTwoTwo, diagonalTwoThree];
let turnsLeft = 9;
let currentPlayer = 1;
currPlrDisplay.innerText = ': X';
console.log(JSON.parse(localStorage.getItem('playerXScore')));

//get scores from localStorage or initiate localStorage Items
if(JSON.parse(localStorage.getItem('playerXScore')) === null) {
    let playerXScore = 0;
    localStorage.setItem('playerXScore', JSON.stringify(playerXScore));
    playerXResults.textContent = JSON.parse(localStorage.getItem('playerXScore'));
} else {
    playerXResults.textContent = JSON.parse(localStorage.getItem('playerXScore'));
}
if(JSON.parse(localStorage.getItem('playerOScore')) === null) {
    let playerOScore = 0;
    localStorage.setItem('playerOScore', JSON.stringify(playerOScore));
    playerOResults.textContent = JSON.parse(localStorage.getItem('playerOScore'));
} else {
    playerOResults.textContent = JSON.parse(localStorage.getItem('playerOScore'));
}

function checkIfGameIsWon() {
    /* check if any one of the players have won */
    //check rows
    const rowsArr = [firstRow, secondRow, thirdRow];
    for(let i = 0; i < rowsArr.length; i++) {
        checkRows(rowsArr[i]);
    }

    //check columns
    const columnsArr = [firstColumn, secondColumn, thirdColumn];
    for(let i = 0; i < columnsArr.length; i++) {
        checkColumns(columnsArr[i]);
    }

    //check diagonal lines
    const diagonalsArr = [firstDiagonal, secondDiagonal];
    for(let i = 0; i < diagonalsArr.length; i++) {
        checkDiagonals(diagonalsArr[i]);
    }
}

function checkRows(currentRow) {
    let rowArr = [];
    for(let i = 0; i < currentRow.children.length; i++) {
        if(currentRow.children[i].classList.contains('x')) {
            rowArr.push('x');
        } else if(currentRow.children[i].classList.contains('o')){
            rowArr.push('o');
        } else {
            rowArr = [];
        }
    }
    for(let i = 0; i < rowArr.length; i++) {
        if(rowArr[i] === 'x' && rowArr[i+1] === 'x' && rowArr[i+2] === 'x') {
            increaseScore(1);
            playerWon('x');
        } else if(rowArr[i] === 'o' && rowArr[i+1] === 'o' && rowArr[i+2] === 'o') {
            increaseScore(2);
            playerWon('o');
        }
    }
}

function checkColumns(currentColumn) {
    let columnArr = [];
    for(let i = 0; i < currentColumn.length; i++) {
        if(currentColumn[i].classList.contains('x')) {
            columnArr.push('x');
        } else if(currentColumn[i].classList.contains('o')) {
            columnArr.push('o');
        }
    }
    for(let i = 0; i < currentColumn.length; i++) {
        if(columnArr[i] === 'x' && columnArr[i+1] === 'x' && columnArr[i+2] === 'x') {
            increaseScore(1);
            playerWon('x');
        } else if(columnArr[i] === 'o' && columnArr[i+1] === 'o' && columnArr[i+2] === 'o') {
            increaseScore(2);
            playerWon('o');
        }
    }
}

function checkDiagonals(currentDiagonal) {
    let diagonalArr = [];
    for(let i = 0; i < currentDiagonal.length; i++) {
        if(currentDiagonal[i].classList.contains('x')) {
            diagonalArr.push('x');
        } else if(currentDiagonal[i].classList.contains('o')) {
            diagonalArr.push('o');
        }
    }
    for(let i = 0; i < currentDiagonal.length; i++) {
        if(diagonalArr[i] === 'x' && diagonalArr[i+1] === 'x' && diagonalArr[i+2] === 'x') {
            increaseScore(1);
            playerWon('x');
        } else if(diagonalArr[i] === 'o' && diagonalArr[i+1] === 'o' && diagonalArr[i+2] === 'o') {
            increaseScore(2);
            playerWon('o');
        }
    }
}

function switchPlayer(target) {
    /* switch the current player */
    if(currentPlayer === 1) {
        target.classList.add('x');
        currentPlayer = 2;
        currPlrDisplay.innerText = ': O';
    } else {
        target.classList.add('o');
        currentPlayer = 1;
        currPlrDisplay.innerText = ': X';
    }
}

function playerWon(player) {
    infoDisplay.textContent = `The Player: ${player} Has Won!!`;
    setTimeout(()=>{
        window.location.reload();
    }, 1000);
}

function checkIfGameIsTied() {
    if(turnsLeft === 1) {
        infoDisplay.textContent = 'GameOver, A Tie!!';
        setTimeout(()=>{
            window.location.reload();
        }, 1000);
    }
}

function increaseScore(player) {
    if(player === 1) {
        localStorage.setItem('playerXScore', JSON.stringify(parseInt(playerXResults.textContent) + 1));
        playerXResults.textContent = parseInt(playerXResults.textContent) + 1;
    } else {
        localStorage.setItem('playerOScore', JSON.stringify(parseInt(playerOResults.textContent) + 1));
        playerOResults.textContent = parseInt(playerOResults.textContent) + 1;
    }
}

document.addEventListener('click', (e)=>{
    /* deal with the click event, invoke switching players and check if player has won */
    if(e.target.classList.contains('box')) {
        if(e.target.classList.contains('x') || e.target.classList.contains('o')) {
            alert('Box is already full!!');
        } else {
            if(currentPlayer === 1) {
                switchPlayer(e.target);
                checkIfGameIsWon();
            } else {
                switchPlayer(e.target);
                checkIfGameIsWon();
            }
            checkIfGameIsTied();
            turnsLeft--;
        }
    }
});

restartBtn.addEventListener('click',()=>{
    localStorage.removeItem('playerXScore');
    localStorage.removeItem('playerOScore');
    window.location.reload()
});