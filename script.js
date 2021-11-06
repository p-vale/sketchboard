let style = document.createElement('style');
style.innerText = `* {margin: 0px; padding:0px;}
html, body {height: 100%;}
html {display: table; margin: auto;}
body {display: table-cell; vertical-align: middle;}
.btnOptions {width: 600px; display: flex; justify-content: space-between; flex-wrap:wrap; margin-bottom: 20px;}
.container {width: 600px; height: 600px;}
.cell-style {border: 1px solid silver;}
.button-style {padding: 5px; width: 109px; border-radius: 5px; border: 1.5px solid silver; font-weight: bold;}
.modal {position: fixed; width: 100vw; height: 100vh; visibility: hidden; top: 0; left: 0; display: flex; align-items: center; justify-content: center;}
.modalOpen {visibility: visible; background-color: #c1ffc1;}
.modalInput {border-radius: 10px; border: 1.5px solid silver; background: white; position: relative; padding: 30px; font-family: sans;}
@media (max-width: 610px) {.btnOptions{ width: 400px; height: 70px; flex-direction: column; align-content:space-between;} .container{width:400px; height:400px;}
@media (max-width: 400px) {.btnOptions{ width: 300px; flex-direction:row; gap: 15px; justify-content: center; margin-bottom: 50px;} .button-style {padding: 3px;} .container{width:300px; height:300px;} }`;
document.head.appendChild(style);

//BUTTONS OPTIONS AREA
const btnOptions = document.createElement('div');
btnOptions.classList.add('btnOptions')
document.body.append(btnOptions);

//GRID
const container = document.createElement('div');
container.style.display = 'grid';
container.classList.add('container');
document.body.append(container);

let colRow = 16;

function setGrid (b) {
    container.style.gridTemplateColumns = 'repeat(' + b + ', 1fr)';
    container.style.gridTemplateRows = 'repeat(' + b + ', 1fr)';
}

setGrid(colRow);

function cells(a) {
    for (let i = 1; i <= a; i++) {
        let singleCell = document.createElement('div');
        singleCell.className = 'cell-style';
        singleCell.addEventListener('mouseover', 
        function() {
            singleCell.style.backgroundColor = colors();
        },
        { once: true }); //change color only once
        if (window.innerWidth < 400) {
            singleCell.addEventListener('touchmove', 
            function() {
                singleCell.style.backgroundColor = colors();
            }, { once: true });
        }
        container.appendChild(singleCell);
    }
}

let cellNum = colRow * colRow;

cells(cellNum);

const cleanUp = () => container.innerHTML = '';

//MODAL POPUP

const modal = document.createElement('div');
modal.classList.add('modal');
document.body.append(modal);

const modalInput = document.createElement('div');
modalInput.classList.add('modalInput');
modal.appendChild(modalInput);

const info = document.createElement('p');
info.innerHTML = 'How many squares by column?';
info.style.marginBottom = '20px';
modalInput.appendChild(info);

function openModal() {
    return modal.classList.add('modalOpen');
}

function closeModal() {
    return modal.classList.remove('modalOpen');
}

const inputNum = document.createElement('input');
inputNum.type = 'number';
inputNum.min = 1;
inputNum.max = 50;
inputNum.placeholder = 'choose a number between 1 and 50';
inputNum.style.minWidth = '250px';
inputNum.style.padding = '5px';
inputNum.style.marginRight = '15px';
inputNum.style.borderRadius = '5px';
inputNum.style.border = '1.5px solid silver';
modalInput.appendChild(inputNum);

const submitInput = document.createElement('input');
submitInput.type = 'submit';
submitInput.value = 'MAKE NEW GRID';
submitInput.style.padding = '4.5px';
submitInput.style.borderRadius = '5px';
submitInput.style.border = '1.5px solid silver';
submitInput.style.backgroundColor = '#c1ffc1';
submitInput.style.fontWeight = 'bold';
submitInput.addEventListener('mouseover', () => {
    submitInput.style.border = '2px solid black';
});
submitInput.addEventListener('mouseout', () => {
    submitInput.style.border = '1.5px solid silver';
});
submitInput.addEventListener('click', () => {
    if (inputNum.value > 50) {
        info.innerHTML = 'please choose number between 1 and 50';
    } else {
        info.innerHTML = 'How many squares by column?';
        colRow = parseInt(inputNum.value);
        cellNum = colRow * colRow;
        closeModal();
        setGrid(colRow);
        cells(cellNum);
        return;
    }
});
modalInput.appendChild(submitInput);

//COLORS
function randomLight () {
    return Math.floor(Math.random() * 71) + 160; //(Math.random() * (max - min + 1)) + min > 230-160
}

function rainbow() {
    let r = randomLight() + 30;
    let g = randomLight() + 30;
    let b = randomLight() + 30;
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

function blue() {
    return 'rgb(' + randomLight() + ',' + 255 + ',' + 255 + ')';
}

function pink() {
    return 'rgb(' + 255 + ',' + randomLight() + ',' + 255 + ')';
}

function yellow() {
    return 'rgb(' + 250 + ',' + 250 + ',' + randomLight() + ')';
}

function colors() {
    if (container.firstChild.classList.contains('yellow')) {
        return yellow();
    } else if(container.firstChild.classList.contains('pink')) {
        return pink();
    } else if(container.firstChild.classList.contains('blue')) {
        return blue();
    } else {
        return rainbow();
    }
}

//BUTTONS
const btn = document.createElement('button');
btn.classList.add('button-style');
btn.style.marginLeft = '0px';
btn.style.background = 'none';
btn.innerHTML = 'CHANGE GRID';
btn.addEventListener('click', () => {
    cleanUp();
    openModal(); //MODAL  
});
btnOptions.append(btn);


const rainbowBtn = document.createElement('button');
rainbowBtn.classList.add('button-style');
rainbowBtn.style.background = 'linear-gradient(90deg, rgba(253,255,182,1) 0%, rgba(255,206,220,1) 50%, rgba(180,242,255,1) 100%)';
rainbowBtn.innerHTML = 'RAINBOW';
rainbowBtn.addEventListener('click', () => {
    cleanUp();
    setGrid(colRow);
    cells(colRow*colRow);
});
btnOptions.append(rainbowBtn);

const yellowBtn = document.createElement('button');
yellowBtn.classList.add('button-style');
yellowBtn.style.background = '#FDFF94';
yellowBtn.innerHTML = 'YELLOW';
yellowBtn.addEventListener('click', () => {
    cleanUp();
    setGrid(colRow);
    cells(colRow*colRow);
    container.firstChild.classList.add('yellow');
});
btnOptions.append(yellowBtn);

const pinkBtn = document.createElement('button');
pinkBtn.classList.add('button-style');
pinkBtn.style.background = 'pink';
pinkBtn.innerHTML = 'PINK';
pinkBtn.addEventListener('click', () => {
    cleanUp();
    setGrid(colRow);
    cells(colRow*colRow);
    container.firstChild.classList.add('pink');
});
btnOptions.append(pinkBtn);

const blueBtn = document.createElement('button');
blueBtn.classList.add('button-style');
blueBtn.style.background = 'lightblue';
blueBtn.innerHTML = 'BLUE';
blueBtn.addEventListener('click', () => {
    cleanUp();
    setGrid(colRow);
    cells(colRow*colRow);
    container.firstChild.classList.add('blue');
});
btnOptions.append(blueBtn);