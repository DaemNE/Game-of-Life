const SIZE = 50;
let htmlElements;
let cells;
const DEAD = 0;
const ALIVE = 1;

const createField = () => {
    htmlElements = [];
    cells = [];
    const table = document.getElementById("field");
    for (let i = 0; i < SIZE; i++) {
        let tr = document.createElement("tr");
        let tdElements = [];
        cells.push(new Array(SIZE).fill(DEAD));
        htmlElements.push(tdElements);
        table.appendChild(tr);
        for (let j = 0; j < SIZE; j++) {
            let td = document.createElement("td");
            td.addEventListener("click", () => (td.classList = "cell filled"));
            tdElements.push(td);
            tr.appendChild(td);
        }
    }
};
const draw = () => {
    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
            htmlElements[i][j].setAttribute(
                "class",
                "cell " + (cells[i][j] == 1 ? "filled" : "empty")
            );
        }
    }
};
const init = () => {
    createField();
    for (let i = 0; i < Math.floor(SIZE * SIZE * 0.3); i++) {
        let x, y;
        do {
            x = Math.floor(Math.random() * SIZE);
            y = Math.floor(Math.random() * SIZE);
            if (cells[y][x] == DEAD) {
                cells[y][x] = ALIVE;
                break;
            }
        } while (true);
    }
    draw();
    setInterval(newGeneration, 500);
};

const countNeighbors = (x, y) => {
    let count = 0;
    for (dy = -1; dy <= 1; dy++) {
        for (dx = -1; dx <= 1; dx++) {
            let nx = (x + dx + SIZE) % SIZE;
            let ny = (y + dy + SIZE) % SIZE;
            count += cells[ny][nx];
        }
    }
    return count - cells[y][x];
};

const newGeneration = () => {
    let newCells = [];
    for (let i = 0; i < SIZE; i++) {
        newCells.push(new Array(SIZE).fill(DEAD));
    }
    for (let y = 0; y < SIZE; y++) {
        for (let x = 0; x < SIZE; x++) {
            let neighbors = countNeighbors(x, y);
            if (cells[y][x] == DEAD && neighbors == 3) {
                newCells[y][x] = ALIVE;
            }
            if ((cells[y][x] == ALIVE && neighbors == 2) || neighbors == 3) {
                newCells[y][x] = ALIVE;
            }
        }
    }
    cells = newCells;
    draw();
};

init();