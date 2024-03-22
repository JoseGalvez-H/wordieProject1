# Wordie - A Word Guessing Game

## About

Wordie is a visually appealing word guessing game where players try to guess the secret word related to flower names within a limited number of guesses. This JavaScript-based game challenges your knowledge of flowers and your ability to solve unknown words through strategic guessing.

## Features

- **Vibrant Visual Feedback**: Utilizes a series of flower images to visually represent the player's progress and the number of guesses remaining.
- **Dynamic Guessing Interface**: Offers an interactive button-based interface for letter selection.
- **Engaging Success and Failure States**: Celebrates victories with a victory video and visually indicates game over state for losses.
- **Adaptive Difficulty**: The secret word is randomly selected from a predefined list of flower names, ensuring a fresh challenge with each game.

## How to Play

1. **Start the Game**: Simply load the game in your browser by clicking this [link](https://josegalvez-h.github.io/wordieProject1/) and press the "Start" button to begin.
2. **Guess the Word**: Click on the letters you think are in the secret word. The game will indicate correct and incorrect guesses.
3. **Winning and Losing**: You must guess the word within six attempts to win. The game ends when you guess the word correctly or exhaust your guesses.

## Code Highlights

- **Efficient State Management**: The game's state is managed through a series of variables that track the current secret word, the player's answer so far, wrong guesses, and the game's status.
- **Modular Function Design**: The game logic is organized into well-defined functions, such as `init()` for game initialization, `handleBtnClick()` for processing letter guesses, and `render()` for updating the UI based on the game state.
- **Dynamic Content Creation**: Elements like images and videos are dynamically created and manipulated in the DOM based on the game's progress, enhancing the interactive experience.
- **Preloading of Assets**: The `preloadImages()` function improves the game's performance by loading all image assets in advance.

## Setup

1. Clone the repository to your local machine.
2. Open the project's root directory in your browser.
3. Enjoy the game!

## Contributions

I welcome contributions and suggestions to make Wordie even better. Feel free to fork the repository.

