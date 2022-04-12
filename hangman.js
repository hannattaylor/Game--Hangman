let words = ['elephant', 'chimpanzee', 'zebra', 'fox', 'racoon', 'leopard', 'lion', 'hyena', 'deer', 'antelope', 'koala', 'hedgehog', 'rhinoceros', 'monkey', 'gorilla', 'kangaroo', 'tiger', 'bear', 'giraffe', 'wolf'];

let randomWord = "";
let letterList = "";
let randomIndex = "";

let wrongPlayerGuess = [];
let rightGuessList = [];
let previousLetters = [];

let wordPlacement;

let score = 0;
let rounds = 0;
let totalRounds = 3;


let startButton = document.getElementById('gamestart').addEventListener('click', e => theWord());
let resetButton = document.querySelector('.reset-button').addEventListener('click', e => theReset());


function randomizeWord() {
    randomWord = words[Math.floor(Math.random() * words.length)];
    letterList = [...randomWord];
    randomIndex = words.indexOf(randomWord);
    words.splice(randomIndex, 1);
}

function theWord() {
    window.addEventListener('keydown', gameListener);
    randomizeWord();
    for (el in letterList) {
        let letterBox = document.createElement('p');
        wordPlacement = document.getElementById('word');
        wordPlacement.appendChild(letterBox);
    }
    document.getElementById('guesses').style.display = 'flex';
    document.getElementById('instructions').style.display = 'block';
    document.querySelector('.score-board').style.display = 'flex';
    document.querySelector('.start-button').style.display = 'block';
    document.getElementById('gamestart').style.display = 'none';
    document.getElementById('ground').style.display = 'block';
    document.getElementById('scaffold').style.fill = 'lightgray';
    document.getElementById('head').style.display = 'none';
    document.getElementById('body').style.display = 'none';
    document.getElementById('arms').style.display = 'none';
    document.getElementById('legs').style.display = 'none';
    document.querySelector('h1').style.fontSize = '2.5rem';
    document.querySelector('h2').style.fontSize = '1.5rem';
    document.querySelector('body').style.backgroundImage = 'linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url(img/zebras.jpg)';

}

let gameListener = function (event) {

    let value = event.key.toLowerCase();
    let validLetters = ("abcdefghijklmnopqrstuvwxyz").split('');
    document.getElementById('guessed-letter').textContent = null;

    for (b of previousLetters) {
        if (value == b) {
            document.getElementById('guessed-letter').textContent = `You have already guessed '${b}', try another one!`;
            return false
        }
    }

    if (letterList.includes(value)) {
        for (i = 0; i < letterList.length; i++) {
            if (letterList[i] == value) {
                wordPlacement.children[i].textContent = value;
                rightGuessList.push(value);

                if (!previousLetters.includes(value)) {
                    previousLetters.push(value);
                }
                if (rightGuessList.length == letterList.length) {
                    rounds += 1;
                    score += 150;
                    roundWin();
                }
            }
        }
    } else {

        if (validLetters.includes(value)) {
            wrongPlayerGuess.push(value);
            document.getElementById('wrong-guess').textContent = wrongPlayerGuess.join(', ');

            if (!previousLetters.includes(value)) {
                previousLetters.push(value);
            }
        }
        if (rounds >= 1 && rounds <= 3) {
            wrongPlayerGuess.length <= 5
            score -= 10
            document.getElementById('score-info').textContent = 'For each wrong letter you loose 10 points';
            document.getElementById('score-info').style.animation = 'attention 6s';
        }
        if (wrongPlayerGuess.length == 1) {
            document.getElementById('ground').style.display = 'block';
            document.getElementById('scaffold').style.fill = 'black';
        }
        if (wrongPlayerGuess.length == 2) {
            document.getElementById('head').style.display = 'block';
        }
        if (wrongPlayerGuess.length == 3) {
            document.getElementById('body').style.display = 'block';
        }
        if (wrongPlayerGuess.length == 4) {
            document.getElementById('arms').style.display = 'block';
            document.getElementById('additional-info').style.display = 'block';
        }
        if (wrongPlayerGuess.length == 5) {
            document.getElementById('legs').style.display = 'block';
            document.getElementById('additional-info').style.display = 'none';
            gameOver();
        }
    }
}


function roundWin() {
    document.getElementById('score').textContent = score;
    document.getElementById('round').textContent = `You won ${rounds}/${totalRounds} rounds!` //ändrat
    document.querySelector('.reset-button').textContent = 'Play Next Round!';
    document.querySelector('.reset-button').style.display = 'block';
    document.getElementById('additional-info').style.display = 'none';
    window.removeEventListener('keydown', gameListener);


    if (rounds == 3) {
        document.getElementById('round').textContent = 'You won this GAME! Congratulations!';
        document.getElementById('round').style.fontSize = '1.7rem';
        document.getElementById('round').style.animation = 'attention 6s infinite';
        document.querySelector('.reset-button').textContent = 'Play again?';
        document.querySelector('.reset-button').style.animation = 'none';
        document.getElementById('win-image').style.display = 'block';
        pageReload();
    }

}

function gameOver() {
    document.getElementById('score').textContent = score;
    document.getElementById('round').textContent = 'You lost this round...'
    document.querySelector('.game-lost').style.animation = 'attention 6s infinite';
    document.querySelector('.game-lost').textContent = 'GAME OVER!'
    document.getElementById('word').textContent = 'The hidden word was - ' + randomWord;
    document.querySelector('.reset-button').style.display = 'block';
    document.querySelector('.reset-button').style.animation = 'none';
    document.querySelector('.reset-button').textContent = 'Play again?';
    document.getElementById('instructions').style.display = 'none';
    document.getElementById('loser-image').style.display = 'block';
    document.getElementById('loser-image').style.animation = 'walk-of-shame 4s';
    window.removeEventListener('keydown', gameListener);
    pageReload();

}

function theReset() {
    document.getElementById('word').textContent = null;
    document.getElementById('wrong-guess').textContent = null;
    document.querySelector('.game-lost').textContent = null;
    document.getElementById('round').textContent = null;
    document.querySelector('.reset-button').style.display = 'none';
    document.getElementById('ground').style.display = 'block';
    document.getElementById('scaffold').style.fill = 'lightgray';

    rightGuessList = [];
    wrongPlayerGuess = [];
    previousLetters = [];

    theWord();
}

function pageReload() {
    document.querySelector('.reset-button').addEventListener('click', () => {
        location.reload();
    })
}