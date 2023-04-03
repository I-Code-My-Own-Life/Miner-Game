// let canvas = document.getElementById("canvas");
// let ctx = canvas.getContext("2d");
// // let gridSize = parseInt(document.getElementById("grid-size-input").value);
// let gridSize = 10;
// let cellSize = canvas.width / gridSize;
// let grid;
// let minerPosition;

// // Setting canvas's width and height : 
// canvas.width = 724;
// canvas.height = 500;
// class Cell {
//     constructor() {
//         this.hasNugget = false;
//         this.hasDynamite = false;
//         this.revealed = false;
//     }
// }

// function createGrid(size) {
//     let grid = [];
//     for (let i = 0; i < size; i++) {
//         let row = [];
//         for (let j = 0; j < size; j++) {
//             row.push(new Cell());
//         }
//         grid.push(row);
//     }
//     return grid;
// }

// function placeItems(numNuggets, numDynamite) {
//     let cells = [];
//     for (let i = 0; i < gridSize; i++) {
//         for (let j = 0; j < gridSize; j++) {
//             cells.push({ row: i, col: j });
//         }
//     }

//     // Shuffle cells
//     for (let i = cells.length - 1; i > 0; i--) {
//         let j = Math.floor(Math.random() * (i + 1));
//         [cells[i], cells[j]] = [cells[j], cells[i]];
//     }

//     // Place items
//     for (let i = 0; i < numNuggets; i++) {
//         let cell = cells[i];
//         grid[cell.row][cell.col].hasNugget = true;
//     }
//     for (let i = 0; i < numDynamite; i++) {
//         let cell = cells[numNuggets + i];
//         grid[cell.row][cell.col].hasDynamite = true;
//     }
// }

// function placeMiner() {
//     let row = Math.floor(Math.random() * gridSize);
//     let col = Math.floor(Math.random() * gridSize);
//     minerPosition = { row, col };
// }

// function handleKeyDown(event) {
//     let newRow = minerPosition.row;
//     let newCol = minerPosition.col;
//     switch (event.key) {
//         case "ArrowUp":
//             newRow--;
//             break;
//         case "ArrowDown":
//             newRow++;
//             break;
//         case "ArrowLeft":
//             newCol--;
//             break;
//         case "ArrowRight":
//             newCol++;
//             break;
//         default:
//             return;
//     }
//     if (newRow < 0 || newRow >= gridSize || newCol < 0 || newCol >= gridSize) {
//         return;
//     }
//     let cell = grid[newRow][newCol];
//     if (cell.revealed) {
//         return;
//     }
//     cell.revealed = true;
//     if (cell.hasNugget) {
//         alert("You found a nugget!");
//     }
//     if (cell.hasDynamite) {
//         alert("You found dynamite!");
//     }
//     minerPosition = { row: newRow, col: newCol };
//     drawGrid();
// }

// function drawGrid() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     for (let i = 0; i < gridSize; i++) {
//         for (let j = 0; j < gridSize; j++) {
//             let cell = grid[i][j];
//             let x = j * cellSize;
//             let y = i * cellSize;
//             ctx.beginPath();
//             ctx.rect(x, y, cellSize, cellSize);
//             if (cell.revealed) {
//                 if (cell.hasNugget) {
//                     ctx.fillStyle = "gold";
//                 } else if (cell.hasDynamite) {
//                     ctx.fillStyle = "red";
//                 } else {
//                     ctx.fillStyle = "gray";
//                 }
//             } else {
//                 ctx.fillStyle = "black";
//             }
//             ctx.fill();
//         }
//     }
//     let minerX = minerPosition.col * cellSize + cellSize / 2;
//     let minerY = minerPosition.row * cellSize + cellSize / 2;
//     ctx.beginPath();
//     ctx.arc(minerX, minerY, cellSize / 3, 0, 2 * Math.PI);
//     ctx.fillStyle = "white";
//     ctx.fill();
// }

// function resetGame() {
//     gridSize = parseInt(document.getElementById("grid-size-input").value);
//     cellSize = canvas.width / gridSize;
//     grid = createGrid(gridSize);
//     placeItems(parseInt(document.getElementById("nuggets-input").value),
//         parseInt(document.getElementById("dynamite-input").value));
//     placeMiner();
//     drawGrid();
// }

// document.addEventListener("keydown", handleKeyDown);
// document.getElementById("reset-button").addEventListener("click", resetGame);

// resetGame();