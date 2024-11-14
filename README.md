# Magic 15

#### Video Demo: <[URL HERE](https://youtu.be/BLjfZmiBB3k?si=TSLBd_ai-gWola3Z)>

#### Description: This 15 Puzzle game, also known as the Sliding Puzzle, is implemented using JavaScript, HTML, and CSS. The program allows users to play a classic puzzle where numbered tiles need to be arranged in sequence, with one empty space enabling tiles to be moved.

# 15 Puzzle Game - JavaScript Program Description

In this document, we will explain each part of the code, covering its functionality and gameplay instructions.

## Overview of Game Structure

The game consists of three main parts:

1. HTML Structure: Defines the game layout, including the game grid, a shuffle button, a move counter, and a message area.
2. CSS Styling: Styles the game board, tiles, and other elements for a modern and visually appealing interface.
3. JavaScript Logic: Implements the functionality of the game, handling tile movements, shuffling, move counting, and win condition checking.

---

## HTML Structure

The HTML section provides the structure and layout for the game interface. Here’s a breakdown of its components:

```html
<div class="container">
  <h2>15 Puzzle Game</h2>
  <div id="game"></div>
  <button onclick="shuffleTiles()">Shuffle</button>
  <p>Moves: <span id="moveCount">0</span></p>
  <p id="message"></p>
</div>
```

Explanation

1. Container: The div with class container holds all game elements and centers them on the page.

2. Title: An h2 header introduces the game title, "15 Puzzle Game."

3. Game Grid (#game): This div serves as the puzzle grid, where the tiles are displayed.

4. Shuffle Button: A button element with an onclick attribute calls the shuffleTiles() function to randomly shuffle the puzzle tiles.

5. Move Counter: A paragraph (<p>) element displays the total moves taken by the player, updating as they make each move.

6. Message: A paragraph with ID message displays a congratulatory message when the puzzle is solved.

---

```CSS Styling

The CSS defines the game’s visual presentation, including the styling of the game grid, tiles, shuffle button, and other elements. Here are the main components of the CSS styling:

Main Styles


* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: "Montserrat", sans-serif;
  font-weight: 800;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #f5e8d7, #f5e8d7);
  color: #333;
  font-family: "Montserrat", sans-serif;
  font-weight: 800;
}

.container {
  text-align: center;
}

h2 {
  font-size: 2.7rem;
  margin-bottom: 3rem;
  color: #282b24;
  font-family: "Montserrat", sans-serif;
  font-weight: 800;
}

#game {
  display: grid;
  grid-template-columns: repeat(4, 80px);
  grid-gap: 5px;
  margin: 20px auto;
  padding: 10px;
  border-radius: 8px;
  background-color: #282b24;
  width: max-content;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
}

.tile {
  width: 80px;
  height: 80px;
  font-size: 29px;
  font-family: "Montserrat", sans-serif;
  font-weight: 800;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: #f5e8d7;
  color: #222;
  cursor: pointer;
  transition: transform 0.1s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.tile:hover {
  transform: scale(1.05);
}

.empty {
  background-color: #f63b1c;
  box-shadow: none;
  cursor: default;
}

button {
  margin: 20px 0px 34px;
  padding: 10px 20px;
  font-size: 1rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 800;
  color: #fff;
  background-color: #4caf50;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

button:hover {
  background-color: #388e3c;
}

#moveCount {
  font-size: 1.2rem;
  font-weight: bold;
}

#message {
  margin-top: 30px;
  font-size: 1.5rem;
  color: #f63b1c;
  font-weight: bold;
  font-family: "Montserrat", sans-serif;
  font-weight: 800;
}

```

Explanation

1. Game Grid: The #game element is styled as a 4x4 grid with padding and shadow effects for a modern look.

2. Tiles: Each .tile element has a vibrant color, shadow, and a slight scaling animation on hover to enhance the game's interactivity.

3. Empty Tile: The .empty class styles the empty space to match the background, making it blend in as a movable space.

4. Shuffle Button: Styled with padding, color, and a hover effect, the button provides a modern and clear shuffle action.

5. Message: Styled to display a congratulatory message when the puzzle is completed successfully.

---

JavaScript Logic

The JavaScript code controls the game’s functionality, including initializing tiles, handling movements, shuffling, move counting, and checking for the win condition. Here's an overview of the key functions and logic:

Key Functions

1. initGame()

This function initializes the game grid, setting up numbered tiles and leaving one space empty.

2. drawTiles()

The drawTiles() function renders the tiles in the grid. It iterates over the tile array, creating div elements for each tile. Event listeners are added to allow users to click tiles adjacent to the empty space.

3. shuffleTiles()

The shuffleTiles() function randomizes the tiles in the grid, resetting the move count and clearing any previous messages.

4. moveTile(index)

When a tile is clicked, the moveTile() function checks if it’s adjacent to the empty space. If so, it swaps the clicked tile with the empty space, increments the move counter, and redraws the tiles.

5. updateMoveCount()

This function updates the displayed move counter.

6. checkWin()

After each move, checkWin() verifies if the tiles are in sequential order, excluding the empty tile. If they are, a congratulatory message is displayed.

```JavaScript Code

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
  if (validMoves.includes(index) && Math.abs(emptyTileIndex % 4 - index % 4) + Math.abs(Math.floor(emptyTileIndex / 4) - Math.floor(index / 4)) === 1) {
    // Swap the clicked tile with the empty tile
    [tiles[emptyTileIndex], tiles[index]] = [tiles[index], tiles[emptyTileIndex]];
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
  const isWinning = tiles.slice(0, 15).every((tile, index) => tile === index + 1);
  if (isWinning) {
    // Display a win message if the puzzle is solved
    messageDisplay.innerText = "Congratulations! You've solved the puzzle!";
  }
}

// Start the game by initializing the tile layout
initGame();
```

---

How to Play the 15 Puzzle Game

1. Objective: Arrange the numbered tiles in ascending order (1 through 15) by sliding them into the empty space.

2. Shuffle: Click the "Shuffle" button to randomize the tile positions.

3. Move Tiles: Click a tile adjacent to the empty space to slide it into that space.

4. Track Moves: The "Moves" counter shows the number of moves you've made.

5. Win Condition: When all tiles are in order, a congratulatory message appears.
