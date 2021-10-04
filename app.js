let currentPlayer = document.getElementById('current-player');
const game = document.querySelector('game-box');

document.addEventListener('click', (e)=>{
    if(e.target.classList.contains('row')) {
        console.log(e);
    }
})