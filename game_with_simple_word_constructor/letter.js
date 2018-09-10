
var Letter = function (x, status) {
    this.name = x,
        // console.log("this is letter.name: " + this.name)
        this.hasBeenGuessed = status,
        this.typeDisplayed = function () {
            if (this.hasBeenGuessed) {
                // console.log(this.name);
                return this.name;
            } else {
                // console.log("_");
                return "_";
            }
        }
};

module.exports = Letter;