let canvas = document.getElementById("canvas");
let heading = document.getElementById("heading");
let reset = document.getElementById("reset-button");
let gridSizeInput = document.getElementById("grid-size-input");
let nuggetsInput = document.getElementById("nuggets-input");
let dynamiteInput = document.getElementById("dynamite-input");
let playBtn = document.getElementById("play-button");
let container = document.querySelector(".container");
let currentScene = "Info";
let drawGrid;
let drawNuggetsAndDynamites;
let miner;

// Context variable : 
let c = canvas.getContext("2d");

// Loading our images : 
let nuggetImg = document.getElementById("nuggetImg");
let dynamiteImg = document.getElementById("dynamiteImg");

// Define the number of rows and columns in the grid
const numRows = 10;
const numCols = 14;

// Setting canvas's width and height : 
// canvas.width = innerWidth - 350;
// canvas.height = innerHeight - 120;

let numNuggets;
let numDynamites;
nuggetsInput.addEventListener("input", () => {
    // Define the number of nuggets and dynamites
    numNuggets = nuggetsInput.value;
})

dynamiteInput.addEventListener("input", () => {
    numDynamites = dynamiteInput.value;
})

function startGame() {
    canvas.width = gridSizeInput.value * 120;
    canvas.height = gridSizeInput.value * 85;

    // Calculate the size of each cell in the grid
    const cellWidth = canvas.width / numCols;
    const cellHeight = canvas.height / numRows;

    // Create an array to store the locations of nuggets and dynamites
    let nuggetLocations = [];
    let dynamiteLocations = [];


    drawNuggetsAndDynamites = () => {
        // Generate random locations for the nuggets
        for (let i = 0; i < numNuggets; i++) {
            let x = Math.floor(Math.random() * numCols);
            let y = Math.floor(Math.random() * numRows);
            nuggetLocations.push([x, y]);
        }

        // Generate random locations for the dynamites
        for (let i = 0; i < numDynamites; i++) {
            let x = Math.floor(Math.random() * numCols);
            let y = Math.floor(Math.random() * numRows);
            dynamiteLocations.push([x, y]);
        }
    }

    drawNuggetsAndDynamites();

    class Miner {
        constructor() {
            this.row = Math.floor(Math.random() * numRows);
            this.col = Math.floor(Math.random() * numCols);
        }

        draw() {
            const x = this.col * cellWidth;
            const y = this.row * cellHeight;
            c.fillStyle = "yellow";
            c.fillRect(x + cellWidth / 4, y + cellHeight / 4, cellWidth / 2, cellHeight / 2);
        }

        move() {
            const directions = ["left", "right", "up", "down"];
            const randDirection = directions[Math.floor(Math.random() * directions.length)];

            switch (randDirection) {
                case "left":
                    if (this.col > 0) {
                        this.col--;
                    }
                    break;
                case "right":
                    if (this.col < numCols - 1) {
                        this.col++;
                    }
                    break;
                case "up":
                    if (this.row > 0) {
                        this.row--;
                    }
                    break;
                case "down":
                    if (this.row < numRows - 1) {
                        this.row++;
                    }
                    break;
            }
        }

        reveal() {
            const x = this.col * cellWidth;
            const y = this.row * cellHeight;

            if (nuggetLocations.some((loc) => loc[0] === this.col && loc[1] === this.row)) {
                alert("You found a nugget!");
            }
            else if (dynamiteLocations.some((loc) => loc[0] === this.col && loc[1] === this.row)) {
                alert("You hit dynamite!");
            }
            else {
                alert("Nothing here.");
            }
        }
    }

    miner = new Miner();

    // Create an array to keep track of discovered items
    let discoveredItems = [];

    drawGrid = () => {
        // Draw the grid
        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < numCols; col++) {
                const x = col * cellWidth;
                const y = row * cellHeight;
                c.fillStyle = "black";
                c.strokeStyle = "blue";
                c.strokeRect(x, y, cellWidth, cellHeight);

                // Check if the miner is in the same cell as the nugget or dynamite
                let minerInCell = (
                    miner.row * cellHeight <= y + cellHeight - cellHeight / 4 &&
                    miner.row * cellHeight + cellHeight >= y + cellHeight / 4 &&
                    miner.col * cellWidth <= x + cellWidth - cellWidth / 4 &&
                    miner.col * cellWidth + cellWidth >= x + cellWidth / 4
                );
                let hasNugget = nuggetLocations.some((loc) => loc[0] === col && loc[1] === row);
                let hasDynamite = dynamiteLocations.some((loc) => loc[0] === col && loc[1] === row);

                // Draw the nuggets and dynamites
                if (discoveredItems.some((item) => item[0] === col && item[1] === row)) {
                    // If the item has already been discovered, draw it on the canvas
                    if (hasNugget) {
                        // Drawing the nugget image
                        c.drawImage(nuggetImg, (x + cellWidth) + (cellWidth / 2) / 2, (y + cellHeight) + (cellHeight / 2) / 2, cellWidth / 2, cellHeight / 2);
                    }
                    if (hasDynamite) {
                        // Drawing the dynamite image
                        c.drawImage(dynamiteImg, (x + cellWidth) + (cellWidth / 2) / 4, (y + cellHeight) + (cellHeight / 2) / 4, cellWidth / 2, cellHeight / 2);
                    }
                } else if (minerInCell && (hasNugget || hasDynamite)) {
                    // If the miner is in the same cell as a nugget or dynamite, add it to the discovered items array
                    if (hasNugget) {
                        discoveredItems.push([col, row, "nugget"]);
                    }
                    if (hasDynamite) {
                        discoveredItems.push([col, row, "dynamite"]);
                    }
                }

                // If there is a nugget and a dynamite in the same cell, remove the nugget
                if (hasNugget && hasDynamite) {
                    nuggetLocations = nuggetLocations.filter((loc) => !(loc[0] === col && loc[1] === row));
                }
            }
        }
    }
}

gridSizeInput.addEventListener("input", (e) => {
    startGame();
})

function animate() {
    numNuggets = nuggetsInput.value;
    numDynamites = dynamiteInput.value;
    if (currentScene == "Info") {
        container.style.display = "flex";
    }
    else if (currentScene == "Game") {
        container.style.display = "none";
        canvas.style.border = "1px solid blue"
        c.fillStyle = "black";
        c.fillRect(0, 0, canvas.width, canvas.height);
        drawGrid();
        miner.draw();
    }
    requestAnimationFrame(animate);
}

animate();

document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        event.preventDefault();
        miner.move();
    }
});

reset.addEventListener("click", () => {
    // Reset miner position
    miner.row = 0;
    miner.col = 0;
    // Drawing nuggets and dynamites : 
    nuggetLocations = [];
    dynamiteLocations = [];
    drawNuggetsAndDynamites();
    startGame();
})

playBtn.addEventListener("click", () => {
    currentScene = "Game";
    playBtn.style.display = "none";
    reset.style.display = "block";
    heading.style.innerText = "Miner Game";
    heading.style.display = "block";
    startGame();
})
