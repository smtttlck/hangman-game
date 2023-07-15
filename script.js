const country = ['Denmark','Norway','Sweden','Belgium','France','Germany','Italy','Netherlands',
                'Canada','Russia','Poland','Spain','Turkey'];
const animal = ['Donkey','Horse','Elephant','Dolphin','Turtle','Monkey','Iguana','Eagle','Koala',
                'Lion','Rabbit','Goat','Zebra','Snake','Orangutan'];
const color = ['White','Yellow','Blue','Green','Black','Brown','Red','Purple','Gray','Orange'];
const arrays = [country, animal, color];
const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split('');

let container = document.querySelector(".container");
let characters = document.querySelector(".characters");
let wordContainer = document.querySelector(".wordContainer");
let arrayName = document.querySelector("#arrayName");
let canvas = document.querySelector(".canvas");

let arrayIndex = Math.floor(Math.random() * arrays.length);
let word = arrays[arrayIndex][Math.floor(Math.random() * arrays[arrayIndex].length)].toUpperCase();
let winCounter = 0;
let loseCounter = 0;

window.onload = startGame;

function startGame() {
    arrayName.textContent = editName(arrayIndex);
    printCharacters();
    printWord();
    let { startDraw } = canvasCreator();
    startDraw();
}

function editName(arrayIndex) {
    if(arrayIndex == 0)
        return 'country';
    else if(arrayIndex == 1)
        return 'animal';
    else
        return 'color';
}

function printCharacters() {
    alphabet.forEach( char => {
        characters.innerHTML += `<button id="`+char+`" class="btn btn-outline-dark char" onclick="selectChar('`+char+`')">`+char+`</button>`;
    });
}

function printWord() {
    for(char in word)
        wordContainer.innerHTML += `<span class="me-2">_</span>`;
}
    
function selectChar(value) {
    var oldWinCounter = winCounter;
    for(char in word) {
        if(word[char] == value) {
            wordContainer.children[char].textContent = value;
            winCounter++;
            if(winCounter == word.length)
                setTimeout(() => finishGame(true), 1000);
        }
    }
    if(oldWinCounter == winCounter) {        
        loseCounter++;
        drawMan(loseCounter);
        if(loseCounter == 6)
            setTimeout(() => finishGame(false), 1000);
    }
    document.getElementById(value).setAttribute("disabled", "");
}

function finishGame(result) {
    container.innerHTML = `<h2 class="mb-5">Hangman Game</h2>`;
    if(result == true)
        container.innerHTML += `<h1 class="mb-5">You Won!</h1>`;
    else 
        container.innerHTML += `<h2 class="mb-5">You lost. The correct answer is `+word+`.</h2>`
}

const canvasCreator = () => {
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;

    const drawLine = (fromX, fromY, toX, toY) => {
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.stroke();
    }
    
    const head = () => {
        ctx.beginPath();
        ctx.arc(70, 30, 10, 0, 2 * Math.PI);
        ctx.stroke();
    }
    
    const body = () => {
        drawLine(70, 40, 70, 80);
    }
    
    const leftArm = () => {
        drawLine(70, 50, 50, 70);
    }
    
    const rightArm = () => {
        drawLine(70, 50, 90, 70);
    }
    
    const leftLeg = () => {
        drawLine(70, 80, 50, 110);
    }
    
    const rightLeg = () => {
        drawLine(70, 80, 90, 110);
    }
    
    const startDraw = () => {
        drawLine(10, 130, 130, 130);
        drawLine(10, 10, 10, 130);
        drawLine(10, 10, 70, 10);
        drawLine(70, 10, 70, 20);
    }
    return { startDraw, head, body, leftArm, rightArm, leftLeg, rightLeg };
}

const drawMan = (count) => {
    let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
    switch(count) {
        case 0:
            startDraw();
            break;
        case 1:
            head();
            break;
        case 2:
            head();
            body();
            break;
        case 3:
            head();
            body();
            leftArm();
            break;
        case 4:
            head();
            body();
            leftArm();
            rightArm();
            break;
        case 5:
            head();
            body();
            leftArm();
            rightArm();
            leftLeg();
            break;
        case 6:
            head();
            body();
            leftArm();
            rightArm();
            leftLeg();
            rightLeg();
            break;
    }
}