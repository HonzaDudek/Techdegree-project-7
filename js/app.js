const startScreen = document.getElementById("overlay");
const startButton = document.querySelector(".btn__reset");
const guessedPhrase = document.getElementById("phrase").children[0];
const keyboard = document.getElementById("qwerty");

let missed = document.getElementById("scoreboard");
let hearts = missed.children[0];
let missedCount = 0;

// Starting the game by pressing startButton
startButton.addEventListener("click", () => {
	startScreen.style.display = "none";
});

// List of phrases to be generated
const phrases = ["Under the Bridge", "Parallel Universe", "Scar Tissue", "Californication", "By the Way"];

// Function that generates random array from array, that is passed as a parameter

const getRandomPhrase = (array) => {
    // Pick random phrase from selected array
    const randomPhrase = array[Math.floor(Math.random() * array.length)];
    // convert array to string
    randomPhrase.toString();
    // split created string to letters
    randomPhrase.split("");
    // Returns single letters from generated array as new array
    return randomPhrase;
};

// Saving generated array to global constant
let randomPhrase = getRandomPhrase(phrases);

// Creating function, that adds letters to guess to the gameboard
const addPhraseToDisplay = (array) => {
    // Looping through array of letters
    for (let i = 0; i < randomPhrase.length; i += 1) {
        // create <li> element
        let letters = document.createElement("li");
        // give created <li> element textContent from current index of array
        letters.textContent = randomPhrase[i];
        // If the array element is not an empty string, assign class "Letters" to the created <li> element
        if (letters.textContent !== " ") {
            letters.className = "letter";
        }
        // If array element is only space, assign class "space" to created <li> element
        else {
            letters.className = "space";
        }
        // append <li> element with its class to guessedPhrase unordered list
        guessedPhrase.appendChild(letters);
    }
};

// Calling addPhraseToDisplay function - displaying single letters on gameboard
addPhraseToDisplay(randomPhrase);

// Creating variable letters to store all elements from the <li> element with letters
const letters = document.querySelectorAll(".letter");

const checkLetter = (button) => {
	let letterFound = null;
	let buttonText = button.textContent;

	// Looking for first match of the letters from array with pressed button
    for (let i = 0; i < letters.length; i++)
	if (letters[i].textContent.toLocaleLowerCase() === buttonText) {
		// Adds class "Show" to all the letters that match the selection
            letters[i].classList.add("show");
            letterFound = letters[i].textContent;
            // console.log(letterFound);
        }
        return letterFound;
};

// Creating function, what compares number of letters from randomPhrase with number of letters player guessed right

const checkWin = () => {
	// Saving guessed letters by player to variable guessedLetters
	let guessedLetters = document.querySelectorAll(".show");
	// If the player guessed all the letters - change display and class of Start screen
	if (letters.length === guessedLetters.length) {
		startScreen.style.display = "flex";
		startScreen.className = "win";
		guessedPhrase.style.display = "none";
		resetFunction();
	}
	// If the player lost all his lives - change display and class of Start screen
	else if (missedCount === 5) {
		startScreen.style.display = "flex";
		startScreen.className = "lose";
		guessedPhrase.style.display = "none";
		resetFunction();
	}
};

keyboard.addEventListener("click", (e) => {
    const button = e.target;
    if (button.tagName === "BUTTON") {
        // Selected letter from keyboard is disabled and class "chosen" is added
        button.setAttribute("disabled", true);
        button.className = "chosen";
		// Start function to check whether the letter player chose is right
		if (checkLetter(button) !== null) {
		}
		else {
			// adds 1 to missed counter and removes last heart
			missedCount = missedCount + 1;
			hearts.lastElementChild.remove();
		}
		checkWin();
    }
    else {
	}
    console.log(button);
	console.log(checkLetter(button));
});

let resetButton = document.createElement("button");

const resetFunction = () => {
	// creates Reset button
	// Adding class and text to Reset button
	resetButton.className = "btn__reset";
	resetButton.textContent = "Reset game";
	// appending reset button to win/lose screen
	startScreen.appendChild(resetButton);
};

	resetButton.addEventListener("click", (e) => {
		// Hides win/lose screen on click
		startScreen.style.display = "none";

		// Counts how many hearts were lost and adds missing back to the scoreboard
		for (let i = 0; i < missedCount; i += 1) {
			let heart = document.createElement("li");
			heart.className = "tries";
			heart.innerHTML = "<img src='images/liveHeart.png' height='35px' width='30px'>";
			hearts.appendChild(heart);
		}

		// resets missedCount to 0
		missedCount = 0;

		// Saving all chosen letters to a variable resetPicks
		let resetPicks = document.querySelectorAll(".chosen");
		// for each chosen letter => remove disabled attribute and class "chosen"
		for (let i = 0; i < resetPicks.length; i += 1) {
			resetPicks[i].removeAttribute("disabled");
			resetPicks[i].className = "";
		}

		// Saving all letters from previous phrase to a variable resetLetters
		let resetLetters = document.querySelectorAll(".letter");

		// for each  letter => remove element from DOM
		for (let i = 0; i < resetLetters.length; i +=1){
			resetLetters.className = "";
			guessedPhrase.removeChild(resetLetters[i]);
		}

		let resetSpaces = document.querySelectorAll(".space");
		for (let i = 0; i < resetSpaces.length; i +=1){
			resetSpaces[i].className = "";
			guessedPhrase.removeChild(resetSpaces[i]);
		}

		// Generating new random phrase
		randomPhrase = getRandomPhrase(phrases);
		addPhraseToDisplay(randomPhrase);

		// Displaying new random phrase
		guessedPhrase.style.display = "block";
	});





