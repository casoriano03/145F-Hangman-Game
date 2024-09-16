//model
var secretWord = '';
var actualWord = '';
var guessedLetter = '';
var repeatCount = 0;
var mistakesCount = 0;
var correctCount = 0;
var wrongLetters = '';
var isGameStart = true;
var textValue = false;
var gameOver = false;
var isDisabled = false;

//view

createMainDivs()

function createMainDivs() {
    document.getElementById('app').innerHTML = /*html*/`
    <div class="headingDiv">
    <h1 class="heading">Hangman Game</h1>
    <div>${gameOver?winOrLoseLogic():''}</div>
    <br/>
    </div>
    <div id="pictureDiv">${isGameStart?'':hangmangPicDiv()}</div>
    <div id="inputDiv">${isGameStart?startInputField():gameInputField()}</div>
    <div id="wordBoxes">${isGameStart?'': repeatCreateBox()}</div>
    <div id="mistakesInfo">${isGameStart?'':mistakesInfo()}</div>
    `;
}


//controller

function generateGame() {
    isGameStart = false
    winOrLoseLogic()
    createMainDivs()
}

function repeatCreateBox() {
    var html ='';
    for (let index = 0; index < secretWord.length; index++) {
        actualWord+='*'
        html+=`<div class="boxes">${actualWord[index]}</div>`
    }
    return html
}

function checkGuessedLetter() {
    textValue=false
    repeatCount = 0;
    guessMistakeCheck()
    actualWord = evaluateHangman(secretWord, actualWord, guessedLetter)
    generateGame()
}

function guessMistakeCheck() {
    const isLetterIncluded = secretWord.includes(guessedLetter)
    if (!isLetterIncluded) {
        wrongLetters+=guessedLetter
        mistakesCount++
    }
}

function evaluateHangman(secretWord, actualWord, guessedLetter){
    const index = secretWord.indexOf(guessedLetter);
    if (index > -1) correctCount++
    if(index === -1) return actualWord;
    const currentTextBeforeGuessedLetter = actualWord.substring(0, index);     
    const currentTextAfterGuessedLetter = actualWord.substring(index + 1);
    const secretTextAfterGuessedLetter = secretWord.substring(index + 1);
    return currentTextBeforeGuessedLetter + guessedLetter 
    + evaluateHangman(secretTextAfterGuessedLetter, currentTextAfterGuessedLetter, guessedLetter);
}

function winOrLoseLogic() {
    if (correctCount === secretWord.length) {
        gameOver=true
        isDisabled = true
        return `<h2 class="instructions">You Won!!! 🎉🎉🎉</h2>
        <br/>
        <br/>
        <button onclick="location.reload()"> Start New Game</button>`
    }
    
    if (mistakesCount === 3) {
        gameOver=true
        isDisabled = true
        return `<h2 class="instructions">You Lose!!! 😒</h2>
        <br/>
        <br/>
        <button onclick="location.reload()"> Start New Game</button>`
    }
}

//components

function startInputField() {
    return `<h3 class="instructions">Please enter the secret word</h3>
    <input type="text" id="secretWordInput" oninput="secretWord = this.value">
    <br/>
    <br/>
    <button onclick="generateGame()">Start Game</button>`
}

function hangmangPicDiv() {
    return `<div class="images"><img id="head" src="pics/head.png" style="display: ${mistakesCount>0?'inline':'none'};"></div>
    <div class="images"><img id="body" src="pics/body.png" style="display: ${mistakesCount>1?'inline':'none'};"></div>
    <div class="images"><img id="base" src="pics/base.png" style="display: ${mistakesCount>2?'inline':'none'};"></div>`
}

function gameInputField() {
    return `<h3 class="instructions">Guess The Word, One Letter At A Time</h3>
    <input id="guessedLetterInput" type="text" value="${textValue?guessedLetter:''}" oninput="guessedLetter = this.value" onchange="textValue=true">
    <br/>
    <br/>
    <button onclick="checkGuessedLetter()" ${isDisabled?'disabled':''}>Guess</button>
    `
}

function mistakesInfo() {
    return `<h4 class="instructions">Wrong Letters Guessed: ${wrongLetters.split('').join(', ')}</h4>
    <h4 class="instructions">Mistake Count: ${mistakesCount}/3</h4>`
}

