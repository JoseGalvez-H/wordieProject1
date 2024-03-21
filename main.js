/*----- constants -----*/
const MAX_GUESSES = 6;

const WORDS = [
    "lily", "tulip", "orchid", "rose", "peony",
    "daisy", "carnation", "daffodil", "dahlia", "sunflower",
    "chrysanthemum", "hydrangea"];

const IMGS = [
    "./projectFiles/orchidseries/orchid0.png",
    "./projectFiles/orchidseries/orchid1.png",
    "./projectFiles/orchidseries/orchid2.png",
    "./projectFiles/orchidseries/orchid3.png",
    "./projectFiles/orchidseries/orchid4.png",
    "./projectFiles/orchidseries/orchid5.png",
    "./projectFiles/orchidseries/orchid6.png",
];

const WIN_VIDEO_PATH = "./projectFiles/win_video.mp4";

/*----- app's state (variables) -----*/
let secretWord;
let answer;
let wrongGuesses;
let gameStatus;

/*----- cached element references -----*/
const messageEl = document.getElementById('message');
const displayEl = document.getElementById('display_flower');
const wrongGuessImageEl = document.getElementById('wrongGuessImage');
const videoContainer = document.querySelector('.video_container');
const video = document.createElement('video');

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

    wrongGuessImageEl.innerHTML = ''; // Clear previous images

    messageEl.innerText = `Select a letter to guess the flower name. You have ${MAX_GUESSES} guesses`;
    displayEl.textContent = answer.split('').join(' ');

    hideWinVideo();
    displayInitialImage();
    // render();
}

function displayInitialImage() {
    wrongGuessImageEl.innerHTML = '';
    const img = document.createElement('img');
    img.src = "./projectFiles/orchidseries/orchid0.png";
    wrongGuessImageEl.appendChild(img);
}

function render() {
    displayEl.textContent = answer.split('').join(' ');
    const guessesLeft = MAX_GUESSES - wrongGuesses.length;
    if (gameStatus === "win") {
        messageEl.innerText = 'Congratulations! You won!';
        playWinVideo();
    } else if (gameStatus === "lose") {
        messageEl.innerText = 'Sorry, you lost. The word was ' + secretWord;

        if (wrongGuesses.length >= MAX_GUESSES) {
            displayLoseImage();
        }
    } else {
        messageEl.innerText = `Select a letter to continue. Guesses left: ${guessesLeft}`;
    }
}

function handleBtnClick(evt) {
    if (gameStatus !== null) return;
    const guess = evt.target.textContent.toLowerCase();
    if (!secretWord.includes(guess)) {
        if (!wrongGuesses.includes(guess)) {
            wrongGuesses.push(guess);
            if (wrongGuesses.length <= MAX_GUESSES) {
                displayWrongGuessImage(wrongGuesses.length);
            }
            if (wrongGuesses.length >= MAX_GUESSES) gameStatus = "lose";
        }
    } else {
        let updatedAnswer = '';
        secretWord.split('').forEach((letter, index) => {
            updatedAnswer += letter === guess ? guess : answer[index];
        });
        answer = updatedAnswer;
    }
    if (!answer.includes('_')) gameStatus = "win";

    render();
}

function displayWrongGuessImage(index) {
    wrongGuessImageEl.innerHTML = '';
    const imgIndex = index;
    if (IMGS[index]) {
        const img = document.createElement('img');
        img.src = IMGS[imgIndex];
        wrongGuessImageEl.appendChild(img);
    }
}

function displayLoseImage() {
    wrongGuessImageEl.innerHTML = '';
    const img = document.createElement('img');
    img.src = "./projectFiles/orchidseries/orchid6.png";
    wrongGuessImageEl.appendChild(img);
};

function playWinVideo() {
    const videoContainer = document.querySelector('.video_container');

    if (videoContainer) {
        video.src = WIN_VIDEO_PATH;
        video.autoplay = true;
        //video.controls = true;

        video.addEventListener('ended', init);

        videoContainer.appendChild(video);
        videoContainer.style.display = 'block';

    }
};

function hideWinVideo() {
    const videoContainer = document.querySelector('.video_container');
    if (videoContainer) {
        videoContainer.style.display = 'none';
    }
}