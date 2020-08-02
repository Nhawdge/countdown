var app = new Vue({
    el: '#countdown',
    methods: {
        selectStuff: function () {
            var takeVowel = confirm("Want a vowel?")
            this.letters.push(getRandomFromList(takeVowel ? this.vowels : this.consonant));
        }
    },
    data: {
        message: 'Hello Vue!',
        letters: [],
        alphabet: "abcdefghijklmnopqrstuvwxyz".split(""),
        vowels: "aeiou".split(""),
        consonant: "bcdfghjklmnpqrstvwxyz".split("")
    }
})

function getRandomFromList(list) {
    var rand = Math.floor(Math.random() * 1000 % list.length);
    return list[rand];
}