let style = document.createElement("style");
style.innerText = `* {margin: 0px; padding:0px;}
html, body {height: 100%;}
html {display: table; margin: auto;}
body {background-color: #1e1d1c; display: table-cell; vertical-align: middle;}
.container {width: 600px; height: 600px;}
.cell-style {border: 1px solid silver;}
.button-style {padding: 5px; width: 109px; border-radius: 5px; border: 1.5px solid silver; font-weight: bold}`;
document.head.appendChild(style);

const btnOpt = document.createElement("div");
btnOpt.style.display = "flex";
btnOpt.style.justifyContent = "space-between";
btnOpt.style.marginBottom = "20px";
document.body.append(btnOpt);

const container = document.createElement("div");
container.style.display = "grid";
container.classList.add("container");
document.body.append(container);

//GRID
let colRow = 16;

function setGrid (b) {
    container.style.gridTemplateColumns = "repeat(" + b + ", 1fr)";
    container.style.gridTemplateRows = "repeat(" + b + ", 1fr)";
}

setGrid(colRow);

function cells(a) {
    for (let i = 1; i <= a; i++) {
        let singleCell = document.createElement("div");
        singleCell.className = "cell-style";
        singleCell.addEventListener("mouseover", 
        function() {
            singleCell.style.backgroundColor = colors();
        },
        { once: true }); //change color only once
        container.appendChild(singleCell);
    }
}

let cellNum = colRow * colRow;

cells(cellNum);

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

//COLORS
function randomLight () {
    return Math.floor(Math.random() * 76) + 180; //(Math.random() * (max - min + 1)) + min
}

function rainbow() {
    let r = randomLight();
    let g = randomLight();
    let b = randomLight();
    return "rgb(" + r + "," + g + "," + b + ")";
}

function blue() {
    return "rgb(" + randomLight() + "," + 255 + "," + 255 + ")";
}

function pink() {
    return "rgb(" + 255 + "," + randomLight() + "," + 255 + ")";
}

function yellow() {
    return "rgb(" + 255 + "," + 255 + "," + randomLight() + ")";
}

function colors() {
    if (container.firstChild.classList.contains("yellow")) {
        return yellow();
    } else if(container.firstChild.classList.contains("pink")) {
        return pink();
    } else if(container.firstChild.classList.contains("blue")) {
        return blue();
    } else {
        return rainbow();
    }
}

//BUTTONS
const btn = document.createElement("button");
btn.classList.add("button-style");
btn.style.marginLeft = "0px";
btn.style.background = "none";
btn.style.color = "silver";
btn.innerHTML = "CHANGE GRID";
btn.addEventListener("click", () => {
    cleanUp();
    gridSize();
    setGrid(colRow);
    cells(colRow*colRow);
});
btnOpt.append(btn);


const rainbowBtn = document.createElement("button");
rainbowBtn.classList.add("button-style");
rainbowBtn.style.background = "linear-gradient(90deg, rgba(253,255,182,1) 0%, rgba(255,206,220,1) 50%, rgba(180,242,255,1) 100%)";
rainbowBtn.innerHTML = "RAINBOW";
rainbowBtn.addEventListener("click", () => {
    cleanUp();
    setGrid(colRow);
    cells(colRow*colRow);
});
btnOpt.append(rainbowBtn);


const yellowBtn = document.createElement("button");
yellowBtn.classList.add("button-style");
yellowBtn.style.background = "#FDFF94";
yellowBtn.innerHTML = "YELLOW";
yellowBtn.addEventListener("click", () => {
    cleanUp();
    setGrid(colRow);
    cells(colRow*colRow);
    container.firstChild.classList.add("yellow");
});
btnOpt.append(yellowBtn);

const pinkBtn = document.createElement("button");
pinkBtn.classList.add("button-style");
pinkBtn.style.background = "pink";
pinkBtn.innerHTML = "PINK";
pinkBtn.addEventListener("click", () => {
    cleanUp();
    setGrid(colRow);
    cells(colRow*colRow);
    container.firstChild.classList.add("pink");
});
btnOpt.append(pinkBtn);

const blueBtn = document.createElement("button");
blueBtn.classList.add("button-style");
blueBtn.style.background = "lightblue";
blueBtn.innerHTML = "BLUE";
blueBtn.addEventListener("click", () => {
    cleanUp();
    setGrid(colRow);
    cells(colRow*colRow);
    container.firstChild.classList.add("blue");
});
btnOpt.append(blueBtn);