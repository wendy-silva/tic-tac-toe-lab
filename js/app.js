//1) Define the required variables used to track the state of the game.

//2) Store cached element references.

//3) Upon loading, the game state should be initialized, and a function should
//   be called to render this game state.

//4) The state of the game should be rendered to the user.

//5) Define the required constants.

//6) Handle a player clicking a square with a `handleClick` function.

//7) Create Reset functionality.

/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 6, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

/*---------------------------- Variables (state) ----------------------------*/
let board = ["", "", "", "", "", "", "", "", ""];
let turn = "X";
let winner= false;
let tie= false;
/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll(".sqr");
console.log(squareEls);
const messageEl = document.querySelector("#message");
const restartButton = document.querySelector("#restartButton");
const squares = document.querySelector(".board");
/*-------------------------------- Functions --------------------------------*/
function init() {
  board = ["", "", "", "", "", "", "", "", ""] ;
  turn = "X";
  winner = false;
  tie = false;
  render();

  
}
function render() {
  updateBoard();
  updateMessage();
}

function updateBoard() {
  board.forEach((element, i) => {
    squareEls[i].textContent = element;
    console.log(element);
  });
}

function updateMessage() {
  if (!winner && tie === false) {
    messageEl.textContent = `${turn}'s turn`;
  } else if (winner === false && tie === true) {
    messageEl.textContent = "It's a tie!";
  } else {
    messageEl.textContent = `${turn} wins!`;
  }
}

function handleClick(event) {
  const sqrPosition = event.target.getAttribute('data-cell').split('-')[1];
  if (board[sqrPosition] === "X" || board[sqrPosition] === "O") {
    return;
  }
  if(winner) {
    return;
  }

  playPiece(sqrPosition);
  checkForWinner();
  checkForTie();
  switchPlayerTurn();
  render();
}

function playPiece(sqrPosition) {
    board[sqrPosition] = turn;
  }


function checkForWinner() {
  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winner = true;
      return;
    }
  }
}

function checkForTie() {
    if (!board.includes("") && !winner) {
        tie = true;
        console.log("Tie!", tie)
}
}

function switchPlayerTurn() {
  if (winner) {
    return;
  }
  if (turn === "X") {
    turn = "O";
  } else {
    turn = "X";
  }
  console.log("Turn", turn);
}

init();

// /*----------------------------- Event Listeners -----------------------------*/
squares.addEventListener("click", handleClick);
restartButton.addEventListener("click", init);


//Used chatGBT to explain whats was wrong with my playPiece function