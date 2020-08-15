var countdownLetters = new Vue({
    el: '#countdownLetters',
    methods: {
        pickVowel: function () {
            if (this.letters.length < 9) {
                this.letters.push(getRandomFromList(this.vowels))
            }
        },
        pickConsonant: function () {
            if (this.letters.length < 9) {
                this.letters.push(getRandomFromList(this.consonants))
            }
        },
        addLetter: function (a) {
            this.word += a.target.innerText
        },
        removeLastLetter: function () {
            this.word = this.word.slice(0, this.word.length - 1)
        }
    },
    computed: {
        showInput: function () {
            return this.letters.length == 9;
        }
    },
    data: {
        letters: [],
        vowels: "eeeeeeeeeeeeaaaaaaaaaiiiiiiiiioooooooouuuu".split(""),
        consonants: "nnnnnnrrrrrrttttttllllssssddddgggbbccmmppffhhvvwwyykjxqz".split(""),
        word: ""
    }
})

function getRandomFromList(list) {
    var rand = Math.floor(Math.random() * 1000 % list.length);
    return list[rand];
}
var countdownNumbers = new Vue({
    el: "#countdownNumbers",
    methods: {
        addBigNumber: function () {
            var numbs = ["25", "50", "75", "100"];
            var rand = Math.floor(Math.random() * 1000 % numbs.length);
            if (this.numbers.length < 6) {
                this.numbers.push(numbs[rand]);
            }
        },
        addSmallNumber: function () {
            var numbs = "123456789".split("");
            var rand = Math.floor(Math.random() * 1000 % numbs.length);
            if (this.numbers.length < 6) {
                this.numbers.push(numbs[rand]);
            }
        },
        addToEquations: function (e) {
            var equation = this.equations.find(x => !x.isComplete()) || new Equation();

            if (["+", "-", "*", "/"].includes(e.target.innerText)) {
                equation.mathThing = e.target.innerText;
            } else if (!equation.firstNum) {
                equation.firstNum = +e.target.innerText;
                this.equations.push(equation);
            } else {
                equation.secondNum = +e.target.innerText;
            }
            this.equations = this.equations.slice();
        }
    },
    data: {
        numbers: [],
        equations: []
    },
    computed: {
        guessNumber: function () {
            if (this.numbers.length == 6) {
                return Math.floor(Math.random() * 1000 % 1001);
            }
        },
        isDone: function () {
            return this.equations.some(x => x.getResult() == this.guessNumber)
        }
    }
})

function Equation() {
    var self = this;
    self.firstNum;
    self.secondNum;
    self.mathThing;
    self.isComplete = function () {
        return self.firstNum && self.mathThing && self.secondNum;
    }
    self.getResult = function () {
        if (self.isComplete()) {
            return eval(`${self.firstNum} ${self.mathThing} ${self.secondNum} `)
        }
    }
}