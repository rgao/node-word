function Letter(letter) {

    this.letter = letter
    this.correct = false,

    this.check = function () {
        if (this.correct) {
            return this.letter;
        } else {
            return "_";
        }
    },

    this.guess = function (char) {
        if (char === this.letter) {
            this.correct = true;
        }
    }
}

module.exports = {
    Letter: Letter
}
