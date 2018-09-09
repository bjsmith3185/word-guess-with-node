var inquirer = require('inquirer');
var Letter = require("./letter.js");
var chalk = require("chalk");

var game = {
    wordArray: ["dog", "cat"],
    displayArray: [],
    guessedLettersArray: [],
    word: "",
    singleLettersArray: [],
    wins: 0,
    losses: 0,
    turns: 9,
    pickWord: function () {
        // console.log("inside pickWord()");


        this.word = this.wordArray[Math.floor((Math.random() * 2))];

        // console.log("word picked: " + this.word);
    },

    lettersIntoArray: function () {
        // console.log("inside lettersIntoArray()");
        var splitString = this.word.split("");
        for (var i = 0; i < splitString.length; i++) {
            this.singleLettersArray.push(splitString[i]);
        }
        // console.log(this.singleLettersArray);
    },

    createLetterArray: function (singleLettersArray) {
        // console.log("inside createLetterArray()")
        for (var j = 0; j < this.singleLettersArray.length; j++) {
            var letter = new Letter(this.singleLettersArray[j], false);

            this.displayArray.push(letter.typeDisplayed());


            // this.displayArray.push(letter);
        }
        // console.log(this.displayArray);
        var display = this.displayArray.join(" ");
        console.log(display)
        // console.log(this.displayArray.toString())
        // console.log("---------------");
    },

    checkLetter: function (x) {
        var hasAlreadyBeenGuessed = false;
        // console.log("inside checkLetter()")
        // check to see if it has been guessed before
        // console.log(x);
        // console.log(this.guessedLettersArray);
        for (var s = 0; s < this.guessedLettersArray.length; s++) {

            if (x === this.guessedLettersArray[s]) {
                console.log("you have already guessed " + x);
                hasAlreadyBeenGuessed = true;
                // return this.userInputLetter();

            }
        };

        if (!hasAlreadyBeenGuessed) {
            this.guessedLettersArray.push(x);
            // console.log(game.guessedLettersArray);

            var letterIndex;
            var isInWord = false;

            for (var k = 0; k < this.singleLettersArray.length; k++) {
                if (x === this.singleLettersArray[k]) {
                    isInWord = true;
                    // console.log("the letter guessed is in the word")
                    letterIndex = k;
                    // the letter is in the word
                    // something like find; letter.name that matches x
                    // change; letter.isInWord to true
                    var letter = new Letter(x, true);
                    this.displayArray[letterIndex] = letter.typeDisplayed();



                };
            };

// console.log(this.displayArray);
var display1 = this.displayArray.join(" ");
console.log(chalk.red(display1));
game.checkAnswer();

            if (!isInWord) {
                this.turns--;
                console.log(x + " is not in the word.");
                console.log(this.turns + " guesses remaining.");

                if (this.turns === 0) {
                    this.losses++;

                    console.log("You Lost, Maybe Try Harder Next Time....");
                    game.displayScore();

                    inquirer.prompt([
                        {
                            type: "confirm",
                            message: "Do you want to play again?",
                            name: "playAgain"
                        },
                    ])
                        .then(function (again) {
                            // console.log(again.playAgain);
                            if (again.playAgain) {
                                console.log("Get ready to play!");
                                game.anotherWord();
                            } else {
                                console.log("Thanks for playing.")
                                game.displayScore();
                                return;
                            }

                        });

                };
               
            };





            


        } else {
            hasAlreadyBeenGuessed = false;
            game.userInputLetter();
        }

    },

    userInputLetter: function () {
        // console.log("inside userinputletter()")
        inquirer.prompt([
            {
                type: "input",
                message: "Enter a letter.",
                name: "letterGuessed"
            },
        ])
            .then(function (user) {
                // console.log(user.letterGuessed);
                game.checkLetter(user.letterGuessed)



            });
    },

    checkAnswer: function () {


        if (this.singleLettersArray.toString() === this.displayArray.toString()) {
            // word has been guessed
            console.log(chalk.green("you won"));
            this.wins++;
            game.displayScore();
            // call a reset function();
            inquirer.prompt([
                {
                    type: "confirm",
                    message: "Do you want to play again?",
                    name: "playAgain"
                },
            ])
                .then(function (again) {
                    // console.log(again.playAgain);
                    if (again.playAgain) {
                        console.log(chalk.yellow("Get ready to play!"));
                        game.anotherWord();
                    } else {
                        console.log("Thanks for playing.")
                        game.displayScore();
                        return;
                    }

                });



        } else {
            // keep guessing
            game.userInputLetter();
        }
    },

    anotherWord: function () {
        // console.log("inside anotherWord()")

        this.displayArray = [];
        this.guessedLettersArray = [];
        this.singleLettersArray = [];
        this.word = "";
        this.turns = 9;

        game.pickWord();
        game.lettersIntoArray();
        game.createLetterArray();
        game.userInputLetter();

    },

    displayScore: function () {
        console.log(chalk.cyan(`
         ----Your Score----
        Wins    ${this.wins}
        Losses  ${this.losses}`));
    }

};

// start of game using inquirer------

inquirer
    .prompt([
        {
            type: "confirm",
            message: "Do you want to play wordGuess in the Command Line?",
            name: "confirm"
        },
    ])
    .then(function (gameStart) {
        // console.log(gameStart.confirm);
        console.log(chalk.yellow("Get ready to Play!"));
        if (gameStart.confirm) {
            // start game
            game.pickWord();
            game.lettersIntoArray();
            game.createLetterArray();
            game.userInputLetter();

        } else {
            // dont start game
            console.log("Maybe next time!");
        }
    }); // end of first inquirer prompt












