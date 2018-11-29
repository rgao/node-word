var inquirer = require("inquirer");
var fs = require("fs");
var Word = require("./word.js");

var tries = 8;
var randomWord;
var chosenWord;
var guesses = [];
var guessStr = "";

function generateWord() {

    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }

        data = data.split("\r\n");
        var line = Math.floor(Math.random() * data.length);
        randomWord = data[line];

        // console.log(randomWord)
        var initialDisplay = "";
        for (q in randomWord) {
            initialDisplay += "_ ";
        }
        console.log(initialDisplay)

        chosenWord = new Word.Word(randomWord);

        play();
    })
}

function play() {
    console.log("Guesses Left: " + tries)
    if (chosenWord.displayWord()[0] === randomWord) {
        console.log("You Win!");
        replay();

    }

    else if (tries === 0) {
        console.log("Game's Over!");
        replay();

    } else {
        inquirer.prompt([
            {
                type: "input",
                name: "letterInput",
                message: "Guess a letter!",
                validate: function (input) {

                    if (input.length === 1 && isNaN(input)) {
                        return true;
                    } else {
                        console.log("\nPlease input a single letter.");
                    }
                }
            }

        ]).then(function (response) {

            guesses.push(response.letterInput);
            for (var k = 0; k < guesses.length; k++) {
                chosenWord.wordGuess(guesses[k]);
            }
            if (chosenWord.displayWord()[1] === guessStr) {
                tries -= 1;
            }
            guessStr = chosenWord.displayWord()[1];
            console.log(guessStr);
            play();
        })
    }
}

function replay() {
    inquirer.prompt([
        {
            type: "confirm",
            name: "replayInput",
            message: "Would you like to play again?",
        }

    ]).then(function (response) {
        if (response.replayInput) {
            tries = 8;
            guesses = [];
            guessStr = "";

            generateWord();
        } else {
            console.log("OK!");
        }
    })
}

generateWord();



