

var Word = function() {
    this.wordArray = ["dog", "cat", "bird", "duck"],
    this.word = "",
    this.randomWord = function() {
        this.word = this.wordArray[Math.floor((Math.random() * 5))];
        return this.word;
    }
};

module.exports = Word;