/*----- constants -----*/
const MAX_GUESSES = 6;

const WORDS = [
    "lily", "tulip", "orchid", "rose", "peony",
    "daisy", "carnation", "daffodil", "dahlia", "sunflower",
    "chrysanthemum", "hydrangea"];

const IMGS = [
    "../projectFiles/orchidseries/orchid0.png",
    "../projectFiles/orchidseries/orchid1.png",
    "../projectFiles/orchidseries/orchid2.png",
    "../projectFiles/orchidseries/orchid3.png",
    "../projectFiles/orchidseries/orchid4.png",
    "../projectFiles/orchidseries/orchid5.png",
    "../projectFiles/orchidseries/orchid6.png",
];

const WIN_VIDEO_PATH = "../projectFiles/win_video.mp4";

/*----- app's state (variables) -----*/
let secretWord;
let answer;
let wrongGuesses;
let gameStatus;

/*----- cached element references -----*/
const messageEl = document.getElementById('message');
const displayEl = document.getElementById('display_flower');
const wrongGuessImageEl = document.getElementById('wrongGuessImage');
//const videoContainer = document.getElementById('videoContainer'); //Add to HTML

/*----- event listeners -----*/
document.querySelectorAll('.kbtn').forEach(button => {
    button.addEventListener('click', handleBtnClick);
});

document.getElementById('button').addEventListener('click', init); // Play/Reset button

/*----- functions -----*/

init();

function init() {
    secretWord = WORDS[Math.floor(Math.random() * WORDS.length)].toLowerCase();
    answer = "_".repeat(secretWord.length);
    wrongGuesses = [];
    gameStatus = null;

    //videoContainer.innerHTML = ''; // Clear any previous video
    //wrongGuessImageEl.innerHTML = ''; // Clear previous images

    messageEl.innerText = 'Select a letter to start';
    displayEl.textContent = answer.split('').join(' ');

    displayInitialImage();
    render();
}

function displayInitialImage() {
    wrongGuessImageEl.innerHTML = '';
    const img = document.createElement('img');
    img.src = "../projectFiles/orchidseries/orchid0.png";
    wrongGuessImageEl.appendChild(img);
}

function render() {
    displayEl.textContent = answer.split('').join(' ');
    if (gameStatus === "win") {
        messageEl.innerText = 'Congratulations! You won!';
        playWinVideo();
    } else if (gameStatus === "lose") {
        messageEl.innerText = 'Sorry, you lost. The word was ' + secretWord;
        // Check if the loss was due to reaching max guesses and update the image
        if (wrongGuesses.length >= MAX_GUESSES) {
            displayLoseImage();
        }
    } else {
        messageEl.innerText = 'Select a letter to continue';
    }
}

function handleBtnClick(evt) {
    if (gameStatus !== null) return;
    const guess = evt.target.textContent.toLowerCase();
    if (!secretWord.includes(guess)) {
        if (!wrongGuesses.includes(guess)) {
            wrongGuesses.push(guess);
            if (wrongGuesses.length <= MAX_GUESSES) {
                displayWrongGuessImage(wrongGuesses.length - 1);
            }
            if (wrongGuesses.length >= MAX_GUESSES) gameStatus = "lose";
        }
    } else {
        let updatedAnswer = '';
        secretWord.split('').forEach((letter, index) => {
            updatedAnswer += letter === guess ? guess : answer[index];
        });
    }
    render();
}

function displayWrongGuessImage(index) {
    wrongGuessImageEl.innerHTML = '';
    if (IMGS[index]) {
        const img = document.createElement('img');
        img.src = IMGS[index];
        wrongGuessImageEl.appendChild(img);
    }
}

// displayLoseImage();

// playWinVideo();