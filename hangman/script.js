// Manipulate HTML
var $newGameButton = document.getElementById("newGameButton");
var $guessedLetters = document.getElementById("guessedLetters");
var $underscore = document.getElementById("underscore");
var $guessesLeft = document.getElementById("guessesLeft");
var $wins = document.getElementById("wins");
var $losses = document.getElementById("losses");
var $power = document.getElementById("power");
// Game Variables

var word = ["Mario", "Luigi", "Princess Peach", "Toad", "Yoshi", "Princess Daisy", "Rosalina", "Diddy Kong", "Donkey Kong", "Wario", "Waluigi", "Bowser", "Bowser Jr"];
var wins = 0;
var losses = 0;
var guessesLeft = 10;
var gameRunning = false;
var pickedWord = "";
var pickedWordArr = [];
var guessedLetter = [];
var incorrectLetter = [];

// Function to reset the game 
function newGame() {
    gameRunning = true;
    guessesLeft = 10;
    guessedLetter = [];
    incorrectLetter = [];
    pickedWordArr = [];
    $underscore.style.letterSpacing = "9px";
    $power.style.backgroundColor = "green";

    //New Word
    pickedWord = word[Math.floor(Math.random() * word.length)];

    // create placeholders of new word
    for (var i = 0; i < pickedWord.length; i++) {
        if (pickedWord[i] === " ") {
            pickedWordArr.push(" ");
        } else {
            pickedWordArr.push("_");
        } //Change line spacing here ---------------------------------------------
    }

    //put new stuff onto page
    $guessesLeft.textContent = guessesLeft;
    $underscore.textContent = pickedWordArr.join("");
    $guessedLetters.textContent = incorrectLetter;
}

// Check if pressedkey is in the generated word.

function letterGuess(letter) {
    console.log(letter);

    if (gameRunning === true && guessedLetter.indexOf(letter) === -1) {
        // run game logic
        guessedLetter.push(letter);

        // Check if letter is in picked word
        for (var i = 0; i < pickedWord.length; i++) {
            //convert to lower case
            if (pickedWord[i].toLowerCase() === letter.toLowerCase()) {
                //if match, swap placeholder
                pickedWordArr[i] = pickedWord[i];
            }
        }
        $underscore.textContent = pickedWordArr.join("");
        checkIncorrect(letter);

    } else if (gameRunning === false) {
        $underscore.textContent = "Press \"A\" To Begin!";
    } else {
        $underscore.style.fontSize = "16px";
        $underscore.style.letterSpacing = "0.5px";
        $underscore.textContent = "You\'ve Already Guessed This Letter!";
    }
}


// Check if incorrect
function checkIncorrect(letter) {
    if (pickedWordArr.indexOf(letter.toLowerCase()) === -1 &&
        pickedWordArr.indexOf(letter.toUpperCase()) === -1) {
        guessesLeft--;
        incorrectLetter.push(letter);
        $guessedLetters.textContent = incorrectLetter.join(" ");
        $guessesLeft.textContent = guessesLeft;
        $underscore.style.letterSpacing = "9px";
        
    }
    checkLoss();
}
// check if user lost-
function checkLoss() {
    if (guessesLeft === 0) {
        losses++;
        gameRunning = false;
        $losses.textContent = losses;
        $underscore.textContent = pickedWord;
    }
    checkWin();
}
// check if the user won
function checkWin() {
    if (pickedWord.toLowerCase() === pickedWordArr.join("").toLowerCase()) {
        wins++;
        gameRunning = false;
        $wins.textContent = wins;
        $underscore.style.fontSize = "16px";
        $underscore.style.letterSpacing = "0.5px";
        $underscore.textContent = "You Win! Press \"A\" To Play Again!"
    }
}
// event listeners

$newGameButton.addEventListener("click", newGame);

// key event to trigger guessed letter
document.onkeyup = function (event) {
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        letterGuess(event.key);
    }
}
