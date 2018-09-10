
var inquirer = require('inquirer');
var Letter = require("./letter.js");
var Word = require("./practice_word.js");
var chalk = require("chalk");

var game = {
    displayArray: [],
    guessedLettersArray: [],
    word: "",
    singleLettersArray: [],
    wins: 0,
    losses: 0,
    turns: 9,
    pickWord: function () {
        var newWord = new Word();
        this.word = newWord.randomWord();
        this.singleLettersArray = newWord.lettersIntoArray();
        this.displayArray = newWord.createLetterArray(this.singleLettersArray);
        newWord.displayBlankWord();
    },

    checkLetter: function (x) {
        var isALetter = false;

        var letterArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        
        for (var a = 0; a < letterArray.length; a++) {
            if (x === letterArray[a]) {
                 isALetter = true;
            };
        };

        if (isALetter) {
            // guessed a letter correctly
            var hasAlreadyBeenGuessed = false;

            for (var s = 0; s < this.guessedLettersArray.length; s++) {
                if (x === this.guessedLettersArray[s]) {
                    console.log("you have already guessed " + x);
                    hasAlreadyBeenGuessed = true;
                };
            };

            if (!hasAlreadyBeenGuessed) {
                this.guessedLettersArray.push(x);
                var letterIndex;
                var isInWord = false;

                for (var k = 0; k < this.singleLettersArray.length; k++) {
                    if (x === this.singleLettersArray[k]) {
                        isInWord = true;
                        letterIndex = k;
                        var letter = new Letter(x, true);
                        this.displayArray[letterIndex] = letter.typeDisplayed();
                    };
                };

                var display1 = this.displayArray.join(" ");
                console.log(chalk.red(`       
                ${display1}
                                        `));


                if (!isInWord) {

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
                                if (again.playAgain) {
                                    console.log("Get ready to play!");
                                    game.anotherWord();
                                } else {
                                    console.log("Thanks for playing.")
                                    game.displayScore();
                                    return;
                                };
                            });

                    };

                    this.turns--;
                    console.log(x + " is not in the word.");
                    console.log(this.turns + " guesses remaining.");
                    hasAlreadyBeenGuessed = false;
                    game.userInputLetter();

                } else {
                    game.checkAnswer();
                };

            } else {
                hasAlreadyBeenGuessed = false;
                game.userInputLetter();
            };

        } else {
            // did not guess a real letter
            console.log("you need to guess a letter between a - z");
            game.userInputLetter();
        }

        // var hasAlreadyBeenGuessed = false;


        // for (var s = 0; s < this.guessedLettersArray.length; s++) {
        //     if (x === this.guessedLettersArray[s]) {
        //         console.log("you have already guessed " + x);
        //         hasAlreadyBeenGuessed = true;
        //     };
        // };

        // if (!hasAlreadyBeenGuessed) {
        //     this.guessedLettersArray.push(x);
        //     var letterIndex;
        //     var isInWord = false;

        //     for (var k = 0; k < this.singleLettersArray.length; k++) {
        //         if (x === this.singleLettersArray[k]) {
        //             isInWord = true;
        //             letterIndex = k;
        //             var letter = new Letter(x, true);
        //             this.displayArray[letterIndex] = letter.typeDisplayed();
        //         };
        //     };

        //     var display1 = this.displayArray.join(" ");
        //     console.log(chalk.red(`       
        //         ${display1}
        //                                 `));


        //     if (!isInWord) {

        //         if (this.turns === 0) {
        //             this.losses++;
        //             console.log("You Lost, Maybe Try Harder Next Time....");
        //             game.displayScore();

        //             inquirer.prompt([
        //                 {
        //                     type: "confirm",
        //                     message: "Do you want to play again?",
        //                     name: "playAgain"
        //                 },
        //             ])
        //                 .then(function (again) {
        //                     if (again.playAgain) {
        //                         console.log("Get ready to play!");
        //                         game.anotherWord();
        //                     } else {
        //                         console.log("Thanks for playing.")
        //                         game.displayScore();
        //                         return;
        //                     };
        //                 });

        //         };

        //         this.turns--;
        //         console.log(x + " is not in the word.");
        //         console.log(this.turns + " guesses remaining.");
        //         hasAlreadyBeenGuessed = false;
        //         game.userInputLetter();

        //     } else {
        //         game.checkAnswer();
        //     };

        // } else {
        //     hasAlreadyBeenGuessed = false;
        //     game.userInputLetter();
        // };

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
                game.checkLetter(user.letterGuessed)
            });
    },

    checkAnswer: function () {
        if (this.singleLettersArray.toString() === this.displayArray.toString()) {
            console.log(chalk.green("you won"));
            this.wins++;
            game.displayScore();
            inquirer.prompt([
                {
                    type: "confirm",
                    message: "Do you want to play again?",
                    name: "playAgain"
                },
            ])
                .then(function (again) {
                    if (again.playAgain) {
                        console.log(chalk.yellow(`
                        Get ready to play!
                        `));
                        game.anotherWord();
                    } else {
                        console.log("Thanks for playing.")
                        game.displayScore();
                        return;
                    };
                });

        } else {
            game.userInputLetter();
        };
    },

    anotherWord: function () {
        this.displayArray = [];
        this.guessedLettersArray = [];
        this.singleLettersArray = [];
        this.word = "";
        this.turns = 9;

        game.pickWord();
        game.userInputLetter();
    },

    displayScore: function () {
        console.log(chalk.cyan(`
         ----Your Score----
        Wins    ${this.wins}
        Losses  ${this.losses}`));
    },

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

        if (gameStart.confirm) {
            // start game
            console.log(chalk.yellow("Get ready to Play!"));
            game.pickWord();
            game.userInputLetter();

        } else {
            // dont start game
            console.log("Maybe next time!");
        }
    }); // end of first inquirer prompt

