// Get references to the game container, move count display, and message display
const gameContainer = document.getElementById("game");
const moveCountDisplay = document.getElementById("moveCount");
const messageDisplay = document.getElementById("message");

// Initialize variables for the tile array, empty tile position, and move count
let tiles = [];
let emptyTileIndex = 15;
let moveCount = 0;

// Initialize the game by setting up the tiles in order and leaving one empty space
function initGame() {
  // Fill the tiles array with numbers 1 to 15, and add a null for the empty space
  tiles = Array.from({ length: 15 }, (_, i) => i + 1);
  tiles.push(null); // empty space
  drawTiles(); // Render the initial tile layout
}

// Render the tiles on the game grid
function drawTiles() {
  gameContainer.innerHTML = ""; // Clear any existing tiles
  tiles.forEach((tile, index) => {
    const tileElement = document.createElement("div");
    tileElement.classList.add("tile");
    if (tile === null) {
      // If the tile is empty, give it an 'empty' class
      tileElement.classList.add("empty");
    } else {
      // Set the tile number and add a click event to move the tile
      tileElement.innerText = tile;
      tileElement.addEventListener("click", () => moveTile(index));
    }
    gameContainer.appendChild(tileElement); // Add tile to the game grid
  });
}

// Shuffle the tiles and reset the move count and message display
function shuffleTiles() {
  moveCount = 0; // Reset move count
  updateMoveCount(); // Update move count display
  messageDisplay.innerText = ""; // Clear any win message

  // Shuffle the tiles array randomly
  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }

  // Update the empty tile position after shuffling
  emptyTileIndex = tiles.indexOf(null);
  drawTiles(); // Re-draw the shuffled tiles
}

// Handle moving a tile when clicked
function moveTile(index) {
  // Determine valid moves based on the empty tile's position
  const validMoves = [
    emptyTileIndex - 1,
    emptyTileIndex + 1,
    emptyTileIndex - 4,
    emptyTileIndex + 4,
  ];

  // Check if the clicked tile is adjacent to the empty tile
  if (
    validMoves.includes(index) &&
    Math.abs((emptyTileIndex % 4) - (index % 4)) +
      Math.abs(Math.floor(emptyTileIndex / 4) - Math.floor(index / 4)) ===
      1
  ) {
    // Swap the clicked tile with the empty tile
    [tiles[emptyTileIndex], tiles[index]] = [
      tiles[index],
      tiles[emptyTileIndex],
    ];
    emptyTileIndex = index; // Update the empty tile index
    moveCount++; // Increment move count
    updateMoveCount(); // Update move count display
    drawTiles(); // Re-draw tiles after the move
    checkWin(); // Check if the puzzle is solved
  }
}

// Update the move count display on the page
function updateMoveCount() {
  moveCountDisplay.innerText = moveCount;
}

// Check if the puzzle is solved by verifying that tiles are in order
function checkWin() {
  // Check if all tiles are in ascending order from 1 to 15
  const isWinning = tiles
    .slice(0, 15)
    .every((tile, index) => tile === index + 1);
  if (isWinning) {
    // Display a win message if the puzzle is solved
    messageDisplay.innerText = "Congratulations! You've solved the puzzle!";
  }
}

// Start the game by initializing the tile layout
initGame();
