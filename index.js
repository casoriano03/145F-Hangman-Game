var secretWord = '';
var actualWord = '';
var guessedLetter = '';
var repeatCount = 0;
var mistakesCount = 0;
var correctCount = 0;
var wrongLetters = '';

display()

function display() {
    createMainDivs()
    inputField()
}

function createMainDivs() {
    document.getElementById('app').innerHTML += /*html*/`
    <div class="headingDiv">
    <h1 class="heading">Hangman Game</h1>
    <br/>
    </div>
    <div id="pictureDiv"></div>
    <div id="inputDiv"></div>
    <div id="wordBoxes"></div>
    <div id="mistakesInfo"></div>
    `;
}


function inputField() {
    document.getElementById('inputDiv').innerHTML = /*html*/`
    <h3 class="instructions">Please enter the secret word</h3>
    <input type="text" id="secretWordInput" oninput="secretWord = this.value">
    <br/>
    <br/>
    <button onclick="generateGame()">Start Game</button>
    `;
}


function generateGame() {
    document.getElementById('pictureDiv').innerHTML += /*html*/`
    <div class="images"><img id="head" src="pics/head.png" style="display: none;"></div>
    <div class="images"><img id="body" src="pics/body.png" style="display: none;"></div>
    <div class="images"><img id="base" src="pics/base.png" style="display: none;"></div>
    `;
    
    document.getElementById('inputDiv').innerHTML = /*html*/`
    <h3 class="instructions">Guess The Word, One Letter At A Time</h3>
    <input id="guessedLetterInput" type="text" value="${guessedLetter}" oninput="guessedLetter = this.value">
    <br/>
    <br/>
    <button onclick="checkGuessedLetter()">Guess</button>
    `;
    
    document.getElementById('guessedLetterInput').value = '';
    document.getElementById('wordBoxes').innerHTML = '';
    
    repeatCreateBox()
    mistakesInfo()
    pictureDisplay()
    winOrLoseLogic()
}

function repeatCreateBox() {
    var numberOfBoxes = secretWord.length
    if (numberOfBoxes > repeatCount) {
        actualWord+='*'
        createLetterBoxes(actualWord.substring(repeatCount, repeatCount+1))
        repeatCount++
        repeatCreateBox()
    }
}

function createLetterBoxes(letter) {
    document.getElementById('wordBoxes').innerHTML += /*html*/`
    <div class="boxes">${letter}</div>
    `;
}

function checkGuessedLetter() {
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

function mistakesInfo() {
    return document.getElementById('mistakesInfo').innerHTML = /*html*/`
    <h4 class="instructions">Wrong Letters Guessed: ${wrongLetters.split('').join(', ')}</h4>
    <h4 class="instructions">Mistake Count: ${mistakesCount}/3</h4>
    `;
}

function pictureDisplay() {
    if (mistakesCount === 1) document.getElementById('head').style.display='inline'
    if (mistakesCount === 2) document.getElementById('body').style.display='inline'
    if (mistakesCount === 3) document.getElementById('base').style.display='inline'
    return
}

function winOrLoseLogic() {
    if (correctCount === secretWord.length) {
        winOrLoseDisplay('You Won!!! 🎉🎉🎉')
        return
    }
    
    if (mistakesCount === 3) {
        winOrLoseDisplay('You Lose!!! 😒')
        return
    }
}

function winOrLoseDisplay(message) {
    return document.getElementById('inputDiv').innerHTML = /*html*/`
    <h2 class="instructions">${message}</h2>
    <br/>
    <br/>
    <button onclick="location.reload()"> Start New Game</button>
    `;
}

