/*----- constants -----*/
const MAX_GUESSES = 6;

const WORDS = [
    "Lily",
    "Tulip",
    "Orchid",
    "Rose",
    "Peony",
    "Daisy",
    "Carnation",
    "Daffodil",
    "Dahlia",
    "Sunflower",
    "Chrysanthemum",
    "Hydrangea"
];

// const IMGS [
    "IMAGE PATH",
    "IMAGE PATH"
// ]

/*----- state variables -----*/
let secretWord;
let answer = "";
let wrongGuesses = [];
let gameStatus;
let lose;

/*----- cached elements  -----*/
const messageEl = document.getElementById(message);
const displayEl = document.getElementById(display_flower);


/*----- event listeners -----*/
//document.querySelector('.ktbn').addEventListener('click', handleBtnClick);

/*----- functions -----*/

// init()

function init() {
    secretWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    winner = null;
    messageEl.innerText = 'Select a letter to start';
    render();
};

function handleBtnClick(evt) {
    if (evt.target.tagName !== 'BUTTON')
    console.log(evt.target.tagName);
};

//function render() {
    
// }

// renderMessage(){}
