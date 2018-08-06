const startScreen = document.getElementById("overlay");
const startButton = document.querySelector(".btn__reset");
const guessedPhrase = document.getElementById("phrase").children[0];
const keyboard = document.getElementById("qwerty");
const keyboardRow = document.getElementsByClassName("keyrow");
const buttons = keyboardRow.children;
let tries = 0;
let missed = document.getElementById("scoreboard");
let hearts = missed.children[0];
let missedCount = 0;

// Starting the game by pressing startButton
startButton.addEventListener("click", () => {
    startScreen.style.display = "none";
});

// List of phrases to be generated
const phrases = ["Hello World", "What a beautiful day", "Keep on coding"];

// Function that generates random array from array, that is passed as a parameter

function getRandomPhrase(array) {
    // Pick random phrase from selected array
    const randomPhrase = array[Math.floor(Math.random() * array.length)];
    // convert array to string
    randomPhrase.toString();
    // split creaed string to letters
    const randomPhraseArray = randomPhrase.split("");
    // Returns single letters from generated array as new array
    return randomPhraseArray;
}

// Saving generated array to global constant
const randomPhrase = getRandomPhrase(phrases);
console.log(randomPhrase);

// Creating function, that adds letters to guess to the gameboard
function addPhraseToDisplay(array) {
    // Looping through array of letters
    for (let i = 0; i < randomPhrase.length; i += 1) {
        // create <li> element
        let letters = document.createElement("li");
        // give created <li> element textContent from current index of array
        letters.textContent = randomPhrase[i];
        // If the array element is not an empty string, assign class "Letters" to the created <li> element
        if (letters.textContent != " ") {
            letters.className = "letter";
        }
        // If array element is only space, assign class "space" to created <li> element
        else {
            letters.className = "space";
        }
        // append <li> element with its class to guessedPhrase unordered list
        guessedPhrase.appendChild(letters);
    }
}

// Calling addPhraseToDisplay function - displaying single letters on gameboard
addPhraseToDisplay(randomPhrase);

// Creating variable letters to store all elements from the <li> element with letters
let letters = document.querySelectorAll(".letter");

const checkLetter = (button) => {
    let letterFound = null;
    // Looking for first match of the letters from array with pressed button
    for (let i = 0; i < letters.length; i += 1)
        if (letters[i].textContent.toLocaleLowerCase() === button) {
            // Adds class "Show" to all the letters that match the selection
            letters[i].classList.add("show");
            let letterFound = letters[i].textContent;
            console.log(letterFound);
            return letterFound;
        }
    return letterFound;

};

// let guessedLetter = document.querySelectorAll(".show");
// let guessedLetters = guessedLetter.length;
// console.log(guessedLetters);
// console.log(letters.length);


keyboard.addEventListener("click", (e) => {
    let target = e.target;
    if (e.target.tagName === "BUTTON") {
        const target = e.target;
        // Selected letter from keyboard is disabled and class "chosen is added"
        target.setAttribute("disabled", true);
        target.className = "chosen";
    }
    let button = target.textContent;
    // Start function to check whether the letter player chose is right
        checkLetter(button);
    console.log(checkLetter(button));

    if (checkLetter(button) != null) {
        console.log("You have guessed it");
    }
    else {
        missedCount = missedCount + 1;
        hearts.lastElementChild.remove();
        console.log(missedCount);
    }
    // checkWin(guessedLetters, missedCount, letters);


});


function checkWin(guessedLetters, missedCount, letters) {
    if (letters.length = guessedLetters + 1) {
        startScreen.className = "win";
    }
    else if (missedCount === "5") {
        startScreen.className = "lose";
    }
}

