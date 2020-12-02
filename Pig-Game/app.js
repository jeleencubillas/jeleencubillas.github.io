/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


// Global Variables
var currentPlayer, gamePlaying;

// Dice Area
const dice = document.querySelector('.dice')

// Button Selectors
const newGame = document.querySelector('.btn-new')
const rollDice = document.querySelector('.btn-roll')
const holdDice = document.querySelector('.btn-hold')

// Current Player Scores
// const currentScore = document.getElementById('current-'+currentPlayer)
// const globalScore = document.getElementById('score-'+currentPlayer)

// Reset Function
function start(){
    gamePlaying=true;
    currentPlayer=0;
    // Player Panel Settings
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('#name-0').textContent='Player 1';
    document.querySelector('#name-1').textContent='Player 2';
    // Scores Reset
    document.getElementById('score-0').textContent='0';
    document.getElementById('current-0').textContent='0';
    document.getElementById('score-1').textContent='0';
    document.getElementById('current-1').textContent='0';
}

// Reset by Default
start();

// New Game Function
newGame.addEventListener('click', e => {
    // Reset Scores
    start();
})

// Roll Dice Function
rollDice.addEventListener('click', e => {
    if (gamePlaying===true) {
        // Roll Dice
        let diceNumber = Math.floor(Math.random() * 6) + 1; 
        dice.setAttribute('src', 'dice-'+diceNumber+'.png');

        if (diceNumber!==1) {
            // Add diceNumber and save to currentScore
            let currentScore = document.getElementById('current-'+currentPlayer);
            currentScore.textContent = diceNumber + parseInt(currentScore.textContent);
        } else {
            // If 1 is selected, switch to next player
            nextPlayer();
        }

    } else {
        alert('Click New Game to restart.');
    }
})

// Hold Dice Function
holdDice.addEventListener('click', e => {
    if (gamePlaying===true) {
        // Update Global Score
        let globalScore = document.getElementById('score-'+currentPlayer);
        let currentScore = document.getElementById('current-'+currentPlayer);
        globalScore.textContent = parseInt(globalScore.textContent)+parseInt(currentScore.textContent);
        currentScore.textContent = 0;

        // If Global Score reaches 100
        if (parseInt(globalScore.textContent) >= 100) {
            // Declare winner
            document.querySelector('#name-'+currentPlayer).textContent='Winner!';
            document.querySelector('.player-'+currentPlayer+'-panel').classList.add('winner');
            document.querySelector('.player-'+currentPlayer+'-panel').classList.remove('active');
            // End Game
            gamePlaying=false;
        } else {
            nextPlayer();
        }
    } else {
        alert('Click New Game to restart.');
    }
})

// Next Player Function
function nextPlayer() {
    // Remove Active Class from Current Player
    document.querySelector('.player-'+currentPlayer+'-panel').classList.remove('active');
    // Switch from Current Player to Next Player
    currentPlayer===0?currentPlayer=1:currentPlayer=0;
    // Add Active Class to Next Player
    document.querySelector('.player-'+currentPlayer+'-panel').classList.add('active');
    // Set Current Scores to 0
    document.getElementById('current-0').textContent='0';
    document.getElementById('current-1').textContent='0';
}


