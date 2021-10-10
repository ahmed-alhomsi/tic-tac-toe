let currPlrDisplay = document.getElementById('current-player');
const game = document.querySelector('game-box');
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
let gameEnded = false;

let currentPlayer = 1;
currPlrDisplay.innerText = ': X';

function checkIfGameIsWon() {
    /* check if any one of the players have won */
    //check rows
    const rowsArr = [firstRow, secondRow, thirdRow];
    for(let i = 0; i < rowsArr.length - 1; i++) {
        checkRows(rowsArr[i]);
    }

    //check columns
    checkColumns();

    //check diagonal lines
    checkDiagonals();
    
    //if game has ended and no one has won, stop the game
    endGame();
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
            playerWon('x');
        } else if(rowArr[i] === 'o' && rowArr[i+1] === 'o' && rowArr[i+2] === 'o') {
            playerWon('o');
        }
    }
}

function checkColumns() {
    const columnsArr = [firstColumn, secondColumn, thirdColumn];
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            console.log(columnsArr[j][i].classList.contains('x'))
            if(columnsArr[j][i].classList.contains('x') && columnsArr[j][i+1].classList.contains('x') && columnsArr[j][i+2].classList.contains('x')) {
                playerWon('x');
            } else if(columnsArr[j][i].classList.contains('o') && columnsArr[j][i+1].classList.contains('o') && columnsArr[j][i+2].classList.contains('o')) {
                playerWon('o');
            }
        }
    }

//     console.log(currentColumn[0].classList.contains('x'));
//     let columnArr = [];
//     for(let i = 0; i < currentColumn[1].children.length; i++) {
//         if(currentColumn.children[i].classList.contains('x')) {
//             columnArr.push('x');
//         } else if(currentColumn.children[i].classList.contains('o')){
//             columnArr.push('o');
//         } else {
//             columnArr = [];
//         }
//     }
//     for(let i = 0; i < columnArr.length; i++) {
//         if(columnArr[i] === 'x' && columnArr[i+1] === 'x' && columnArr[i+2] === 'x') {
//             playerWon('x');
//         } else if(columnArr[i] === 'o' && columnArr[i+1] === 'o' && columnArr[i+2] === 'o') {
//             playerWon('o');
//         }
//     }
}

// function checkDiagonals() {
//     const diagonalsArr = [firstDiagonal, secondDiagonal];
//     for(let i = 0; i < 3; i++) {
//         for(let j = 0; j < 3; j++) {
//             if(diagonalsArr[j][i].classList.contains('x') && diagonalsArr[j][i+1].classList.contains('x') && diagonalsArr[j][i+2].classList.contains('x')) {
//                 playerWon('x');
//             } else if(diagonalsArr[j][i].classList.contains('o') && diagonalsArr[j][i+1].classList.contains('o') && diagonalsArr[j][i+2].classList.contains('o')) {
//                 playerWon('o');
//             }
//         }
//     }
// }

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
    alert(`The Player: ${player} Has Won!!`);
    window.location.reload();
}

function endGame() {
    if(turnsLeft === 1) {
        alert('Game Over, Tie!!');
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
        }
    }
});

restartBtn.addEventListener('click',()=>{window.location.reload()});



// if(!checkColumns() && !checkRows && !checkDiagonals) {
//     alert('Game Over, No one won!');
//     window.location.reload();
// }


/* i need to check if player has won at every click, by seeing all 8 possibilites, 2 diagonal lines | 3 row possibilites | 3 column possibilites */
/* end game after all boxes are full and neither of the players have won */