var inquirer = require('inquirer');

var Letter = require("./letter.js");


// var Letter = function (x, status) {
//     this.name = x,
//         // console.log("this is letter.name: " + this.name)
//         this.hasBeenGuessed = status,
//         this.typeDisplayed = function () {
//             if (this.hasBeenGuessed) {
//                 // console.log(this.name);
//                 return this.name;
//             } else {
//                 // console.log("_");
//                 return "_";
//             }
//         }
// };





var game = {
    wordArray: ["dog", "dog"],
    displayArray: [],
    incorrectLettersArray: [],
    word: "",
    singleLettersArray: [],
    pickWord: function () {
        // this.word = z[Math.random(Math.floor() *2)]
        this.word = this.wordArray[Math.floor((Math.random() * 2))];
        console.log("word picked: " + this.word);
    },

    lettersIntoArray: function () {
        var splitString = this.word.split("");
        for (var i = 0; i < splitString.length; i++) {
            this.singleLettersArray.push(splitString[i]);
        }
        console.log(this.singleLettersArray);
    },

    createLetterArray: function (singleLettersArray) {
        for (var j = 0; j < this.singleLettersArray.length; j++) {
            var letter = new Letter(this.singleLettersArray[j], false);

            this.displayArray.push(letter.typeDisplayed());


            // this.displayArray.push(letter);
        }
        console.log(this.displayArray);
        console.log("---------------");
    },

    checkLetter: function (x) {
        var letterIndex;
        for (var k = 0; k < this.singleLettersArray.length; k++) {
            if (x === this.singleLettersArray[k]) {
                console.log("the letter guess is in the word")
                letterIndex = k;
                // the letter is in the word
                // something like find; letter.name that matches x
                // change; letter.isInWord to true
                var letter = new Letter(x, true);
                this.displayArray[letterIndex] = letter.typeDisplayed();



            } else {
                // the letter is not in the word
            }
        }
        console.log(this.displayArray);
        this.checkAnswer();
    },

    userInputLetter: function () {
        inquirer.prompt([
            {
                type: "input",
                message: "Enter a letter.",
                name: "letterGuessed"
            },
        ])
            .then(function (user) {
                console.log(user.letterGuessed);
                game.checkLetter(user.letterGuessed)



            });
    },

    checkAnswer: function () {
        if (this.singleLettersArray.toString() === this.displayArray.toString()) {
            // word has been guessed
            console.log("you won");
            // call a reset function();
        } else {
            // keep guessing
            game.userInputLetter();
        }
    }

};

// game.pickWord();
// game.lettersIntoArray();
// game.createLetterArray();

// game.checkLetter("d")
// game.checkLetter("o")
// game.checkLetter("g")




inquirer
    .prompt([
        {
            type: "confirm",
            message: "Do you want to play wordGuess in the Command Line?",
            name: "confirm"
        },
    ])
    .then(function (gameStart) {
        console.log(gameStart.confirm);

        if (gameStart.confirm) {
            // start game

            game.pickWord();
            game.lettersIntoArray();
            game.createLetterArray();
            game.userInputLetter();

        } else {
            // dont start game
        }
    }); // end of first inquirer prompt












