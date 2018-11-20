var Letter = require("./Letter.js");

function Word(randomWord) {

    var letterArr = [];

    for (var z = 0; z < randomWord.length; z++) {
        letterArr.push(new Letter.Letter(randomWord[z]));
    }

    this.letterArr = letterArr;

    this.displayWord = function () {
        var resultArr = [];
        var result = "";
        var resultSpaces = "";
        for (var j = 0; j < this.letterArr.length; j++) {
            result += this.letterArr[j].check();
            resultSpaces += this.letterArr[j].check() + " ";
        }
        resultArr.push(result);
        resultArr.push(resultSpaces);
        return resultArr;
    }

    this.wordGuess = function (char) {
        for (var i = 0; i < this.letterArr.length; i++) {
            this.letterArr[i].guess(char)
        }
    }
}

module.exports = {
    Word: Word
}