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

document.getElementById('button').addEventListener('click', init);

/*----- functions -----*/

init();

function init() {
    document.querySelectorAll('.kbtn').forEach(button => {
        button.disabled = false;
        button.classList.remove('wrong-guess');
    });
    secretWord = WORDS[Math.floor(Math.random() * WORDS.length)].toUpperCase();
    answer = "_".repeat(secretWord.length);
    wrongGuesses = [];
    gameStatus = null;
    wrongGuessImageEl.innerHTML = '';
    messageEl.innerText = `Select a letter to guess the flower name. You have ${MAX_GUESSES} guesses`;
    displayEl.textContent = answer.split('').join(' ');
    displayInitialImage();
    preloadImages();
    render();
}

function displayInitialImage() {
    wrongGuessImageEl.innerHTML = '';
    const img = document.createElement('img');
    img.src = "./projectFiles/orchidseries/orchid0.png";
    wrongGuessImageEl.appendChild(img);
}

function preloadImages() {
    IMGS.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

function render() {
    displayEl.textContent = answer.split('').join(' ');
    const guessesLeft = MAX_GUESSES - wrongGuesses.length;
    if (gameStatus === "win") {
        messageEl.innerText = 'Congratulations! You won!';
        playWinVideo();
    } else if (gameStatus === "lose") {
        messageEl.innerText = `Sorry, you lost. The word was ${secretWord}`;
        if (wrongGuesses.length >= MAX_GUESSES) {
            displayLoseImage();
        }
    } else {
        messageEl.innerText = `Select a letter to continue. Guesses left: ${guessesLeft}`;
    }
}

function handleBtnClick(evt) {
    if (gameStatus !== null) return;
    const button = evt.target;
    const guess = evt.target.textContent.toUpperCase();
    if (!secretWord.includes(guess)) {
        if (!wrongGuesses.includes(guess)) {
            wrongGuesses.push(guess);
            button.disabled = true;
            button.classList.add('wrong-guess');
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
    let img = wrongGuessImageEl.querySelector('img');
    if (!img) {
        img = document.createElement('img');
        wrongGuessImageEl.appendChild(img);
    }
    img.src = IMGS[index];
}

function displayLoseImage() {
    wrongGuessImageEl.innerHTML = '';
    const img = document.createElement('img');
    img.src = "./projectFiles/orchidseries/orchid6.png";
    wrongGuessImageEl.appendChild(img);
};

function playWinVideo() {
    document.querySelectorAll('body > *').forEach(element => {
        if (!element.matches('video_container')) {
            element.classList.add('hidden-content');
        }
    });
    const videoContainer = document.querySelector('.video_container');
    videoContainer.innerHTML = '';
    videoContainer.classList.remove('hidden-content');
    const video = document.createElement('video');
    video.classList.add('video-style');
    video.autoplay = true;
    const source = document.createElement('source');
    source.src = "./projectFiles/win_video.mp4";
    source.type = "video/mp4";
    video.appendChild(source);
    videoContainer.appendChild(video);
    videoContainer.style.display = 'block';
    video.onended = () => {
        document.querySelectorAll('.hidden-content').forEach(element => {
            element.classList.remove('hidden-content');
        });
        videoContainer.style.display = 'none';
    };
}
