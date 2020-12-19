/*----- VARIABLES -----*/
let board;
let win;
// X starts the game
let turn = "X";
// Create array from cells inside the board
const squares = Array.from(document.querySelectorAll("#board div"));
// Target Game Status Area
const gameStatus = document.getElementById("game-status");

/*----- WINNING COMBINATIONS -----*/
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], 
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

/*----- EVENT LISTENERS -----*/
// When clicking a cell on the board
document.getElementById("board").addEventListener("click", switchTurns);
// When clicking the reset button 
document.getElementById("game-reset").addEventListener('click', start);

/*----- FUNCTIONS -----*/
// Start a New Game
function start() {
    // Initialize board as array of empty strings
    board = [
        "", "", "",
        "", "", "",
        "", "", "",
    ];
    // Call Make Marks Function
    makeMarks();
    // Default Message
    gameStatus.textContent = "Click any cell to start the game";
}
// Call init Function
start();

// Make Marks on the Board
function makeMarks() {
    // Use forEach to make marking action applicable to all cells in board 
    board.forEach(function(mark, index) {
        // Assign marks to each square
        squares[index].textContent = mark;
    });
    // Update Game Status each time a player makes a mark
    gameStatus.textContent = win === 'T' ? `It's a tie!` : win ? `Player ${win} wins the game!` : `It's Player ${turn}'s turn!`;
}

// Switch Player Turns
function switchTurns(event) {
    // Find index of squares clicked
    let squareIndex = squares.findIndex(function(square) {
    return square === event.target;
    });
    // Mark cells based on whose turn it is
    board[squareIndex] = turn;
    // Alternate between X and O
    turn = turn === "X" ? "O" : "X";
    // Check if anyone has won
    win = checkWinner();
    // Render the X and O marks on the board
    makeMarks();
}

// Declare a Winner
function checkWinner() {
    // Nobody has won by default
    let winner = null;
    // check if board matches any of our winning combinations
    winningCombos.forEach(function(combo, index) {
        if (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) {
            winner = board[combo[0]];
            };
        });
    // Declare a winner, and a tie if there are no empty cells and no one has won
    return winner ? winner : board.includes("") ? null : 'T';
}