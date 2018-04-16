'use strict';

var game = {
    count: 1,
    possibilities: ['#green','#blue', '#red', '#yellow'],
    currentGame: [],
    user: []
};

$(".start").click(function() {
    newGame()
});

function newGame() {
    start();
    $(".score").text(1);
}

function reset() {
    game.user = []
}

function start() {
    game.currentGame = [];
    game.player = [];
    game.count = 0;
    generateMove();
}

function generateMove(){
    game.currentGame.push(game.possibilities[(Math.floor(Math.random()*4))]);
    showMoves();
    console.log(game.currentGame);
}

function showMoves() {
    var i = 0;
    var moves = setInterval(function(){
        playGame(game.currentGame[i]);
        i++;
        if (i >= game.currentGame.length) {
            clearInterval(moves);
        }
    }, 600);

    reset();
}

function playGame(color) {
    $(color).addClass('light');
    setTimeout(function(){
        $(color).removeClass('light');
    }, 300);
}

//

function check() {
    if (game.currentGame[i] === game.user[i]) {
        if (game.user.length === game.currentGame.length) {
            count();
            $(".score").text(game.count + 1);
            nextRound();
            i = 0;
            return
        }
        i++;

    } else {
        alert("Thank You Come Again");
        i = 0;
        newGame();
    }
}

function count() {
    game.count++;
}


function nextRound() {
    generateMove()
}

$("#green").click(function() {
    $(this).addClass("light");
    setTimeout(function () {
        $("#green").removeClass("light");
    }, 300);
    game.user.push("#" + this.id);
    check();
});

$("#red").click(function() {
    $(this).addClass("light");
    setTimeout(function () {
        $("#red").removeClass("light");
    }, 300);
    game.user.push("#" + this.id);
    check();
});

$("#blue").click(function() {
    $(this).addClass("light");
    setTimeout(function () {
        $("#blue").removeClass("light");
    }, 300);
    game.user.push("#" + this.id);
    check();
});

$("#yellow").click(function() {
    $(this).addClass("light");
    setTimeout(function () {
        $("#yellow").removeClass("light");
    }, 300);
    game.user.push("#" + this.id);
    check();
});