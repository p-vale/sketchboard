let style = document.createElement('style');
style.innerText = `* {margin: 0px; padding:0px;}
html, body {height: 100%;}
html {display: table; margin: auto;}
body {display: table-cell; vertical-align: middle;}
#container {width: 600px; height: 600px;}
.cell-style {border: 1px solid silver;}`;
document.head.appendChild(style);

//GRID
let colRow = 16;

const container = document.getElementById("container");
container.style.display = "grid";

function setGrid (b) {
    container.style.gridTemplateColumns = "repeat(" + b + ", 1fr)";
    container.style.gridTemplateRows = "repeat(" + b + ", 1fr)";
}

setGrid(colRow);

//set random pale color for cell background
function randomButLight () {
    return Math.floor(Math.random() * 76) + 180; //(Math.random() * (max - min + 1)) + min
}

function randomColor() {
    let r = randomButLight();
    let g = randomButLight();
    let b = randomButLight();
    return "rgb(" + r + "," + g + "," + b + ")";
}

function cells(a) {
    for (let i = 1; i <= a; i++) {
        let singleCell = document.createElement("div");
        singleCell.className = "cell-style";
        singleCell.addEventListener("mouseout", function() {
            singleCell.style.backgroundColor = randomColor();
        });
        container.appendChild(singleCell);
    }
}

let cellNum = colRow * colRow;

cells(cellNum);

//CHANGE GRID
function gridSize () {
    let gridNum = Number(window.prompt("How many suqares per row?", "choose number between 1 and 50"));
    if (gridNum >= 1 && gridNum <= 50) {
        colRow = gridNum;
        return;
    } else {
        gridSize();
    }
}

let cleanUp = () => container.innerHTML = "";

var btn = document.createElement("button");
btn.style.marginBottom = "20px";
btn.style.padding = "5px";
btn.style.background = "white";
btn.style.color = "silver";
btn.style.border = "1.5px solid silver";
btn.innerHTML = "CHANGE GRID";
btn.style.fontWeight = "bold";
btn.addEventListener("click", () => {
    cleanUp();
    gridSize();
    setGrid(colRow);
    cells(colRow*colRow);
});
document.body.prepend(btn); 