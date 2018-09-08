

var inquirer = require("inquirer");

var displayArray = [];


putBlanksInArray = function(y) {
    for (var k = 0; k < game.word.length; k++) {
        displayArray.push("_");
    }
}



var lettersAlreadyGuessedArray = [];


var game = {
    word : ["b","i","n","g","o"],
    roundComplete : false,
};

putBlanksInArray(game.word);

// var wordToGuess = ["b","i","n","g","o"];

pickLetter = function() {
    inquirer
    .prompt([
        {
            type: "input",
            name: "letter",
            message: "Guess a Letter."
        },
        
    ]).then(function (user) {
        var letter = user.letter.toLowerCase();
        console.log(letter);

        checkLetterInWord(letter);


        if (game.roundComplete) {
            // start another round
        } else {
            // continue guessing letters
            // call pickLetter() again
        }

    });
}

checkStatus = function() {
    console.log("inside the check status function");
    console.log(game.word);
    console.log(displayArray);
    console.log("---------")
    if (game.word.toString() === displayArray.toString()) {
        // word has been guessed
        console.log("you won");
        // call a reset function();
    } else {
        // keep guessing
        pickLetter();
    }
}







checkLetterInWord = function(x) {
    // var indexOfArray;
    for (var i = 0; i < game.word.length; i++) {
        if (x === game.word[i]) {
            // letter is in the word
            console.log("the letter is in the word at index: " + i);
            // indexOfArray = i;

            displayArray[i] = x;
            lettersAlreadyGuessedArray.push(x);
            

            // use a letter.js function to return the letter(push it into an array to be displayed)
           
        } else {
            // letter is not in the word
            console.log("the letter is NOT in the word at index: " + i);

            // for (var j = 0; j < displayArray.length; j++) {
            //     if (displayArray[i] )
            // }
            // displayArray[i] = "_";
            // displayArray.push("_");
            lettersAlreadyGuessedArray.push(x);
            // use a letter.js function to return an underscore(push it into an array to be displayed)
           
        }
    } // end of forloop
    console.log(displayArray);
    // pickLetter();

    // call function to see if the game is over or to continue
    checkStatus();
};

pickLetter();