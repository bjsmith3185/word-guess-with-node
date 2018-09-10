
var Letter = require("./letter.js");
var chalk = require("chalk");

var Word = function() {
    this.wordArray = ["dog", "cat", "bird", "duck"],
    this.word = "",
    this.singleLettersArray = [],
    this.displayArray = [],

    this.randomWord = function() {
        this.word = this.wordArray[Math.floor((Math.random() * 4))];
        return this.word;
    },
    this.lettersIntoArray= function () {
        console.log("this is word: " +this.word);
        var splitString = this.word.split("");
        console.log(splitString);
        for (var i = 0; i < splitString.length; i++) {
            this.singleLettersArray.push(splitString[i]);
        };
        return this.singleLettersArray;
    },

    this.createLetterArray = function (singleLettersArray) {
        for (var j = 0; j < this.singleLettersArray.length; j++) {
            var letter = new Letter(this.singleLettersArray[j], false);
            this.displayArray.push(letter.typeDisplayed());
        };
        return this.displayArray;
    },

    this.displayBlankWord = function() {
        var display = this.displayArray.join(" ");
       
        return console.log(chalk.red(`       
                ${display}
                             `));
    }
};

module.exports = Word;