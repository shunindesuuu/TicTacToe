const tiles = document.querySelectorAll(".tiles");

let currentPlayer = "X";

for (let i = 0; i < tiles.length; i++) {
  tiles[i].addEventListener("click", function () {
    handleTileClick(i);
  });
}

function handleTileClick(tileIndex) {
  const clickedTile = tiles[tileIndex];

  if (clickedTile.textContent === "") {
    clickedTile.textContent = currentPlayer;

    if (checkWin()) {
      setTimeout(function () {
        alert(`${currentPlayer} is the winner!`);
        resetGame();
      }, 200);
      return;
    } else if (checkDraw()) {
      setTimeout(function () {
        alert("The match is draw!");
        resetGame();
      }, 200);
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

function checkWin() {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns

    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (
      tiles[a].textContent &&
      tiles[a].textContent === tiles[b].textContent &&
      tiles[a].textContent === tiles[c].textContent
    ) {
      tiles[a].classList.add("winningCombo");
      tiles[b].classList.add("winningCombo");
      tiles[c].classList.add("winningCombo");
      return true;
    }
  }
  return false;
}

function checkDraw() {
  for (const tile of tiles) {
    if (tile.textContent === "") {
      return false;
    }
  }
  return true;
}

function resetGame() {
  for (const tile of tiles) {
    tile.textContent = "";
    tile.classList.remove("winningCombo");
  }
  currentPlayer = "X";
}
