export const utilService = {
  makeId,
  makeLorem,
  getRandomIntInclusive,
  delay,
  makeBoard,
  checkVictory
};
function makeBoard() {
  let board = [];
  for (var i = 0; i < 3; i++) {
    board[i] = [" "];
    for (var j = 0; j < 3; j++) {
      let cell = {
        mark: " ",
        isMarked: false,
      };
      board[i][j] = cell;
    }
  }
  return board;
}
function checkRow(row, role, board) {
  for (let i = 0; i < 3; i++) {
    if (board[row][i].mark !== role) return false;
  }
  return true;
}
function checkCol(col, role, board) {
  for (let i = 0; i < 3; i++) {
    if (board[i][col].mark !== role) return false;
  }
  return true;
}
function checkPrimeDai(role, board) {
  for (let i = 0; i < 3; i++) {
    if (board[i][i].mark !== role) return false;
  }
  return true;
}
function checkSecondDai(role, board) {
  for (let i = 0; i < 3; i++) {
    if (board[i][board.length - i - 1].mark !== role) return false;
  }
  return true;
}
function checkNoWinner(board) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (!board[i][j].isMarked) return false;
    }
  }
  return true
}
function checkVictory (i, j, playerRole,board)  {
  let isRowComplete = checkRow(i, playerRole, board);
  let isColComplete = checkCol(j, playerRole, board);
  let isPrimeComplete = checkPrimeDai(playerRole, board);
  let isSecondComplete = checkSecondDai(playerRole, board);
  if (isRowComplete || isColComplete || isPrimeComplete || isSecondComplete) {
    console.log(`player ${playerRole} has won`);
    return true;
  }
  let isNoWinner = checkNoWinner(board);
  if (isNoWinner) console.log("no Winners");
  return false;
  //check for no winners
};
function makeId(length = 6) {
  var txt = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return txt;
}

function makeLorem(size = 100) {
  var words = [
    "The sky",
    "above",
    "the port",
    "was",
    "the color of television",
    "tuned",
    "to",
    "a dead channel",
    ".",
    "All",
    "this happened",
    "more or less",
    ".",
    "I",
    "had",
    "the story",
    "bit by bit",
    "from various people",
    "and",
    "as generally",
    "happens",
    "in such cases",
    "each time",
    "it",
    "was",
    "a different story",
    ".",
    "It",
    "was",
    "a pleasure",
    "to",
    "burn",
  ];
  var txt = "";
  while (size > 0) {
    size--;
    txt += words[Math.floor(Math.random() * words.length)] + " ";
  }
  return txt;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function delay(ms = 1500) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
