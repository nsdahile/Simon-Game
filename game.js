//data
let gamePattern = [];
let userClickedPattern = [];
let buttonColor = ["red", "blue", "green", "yellow"];
let isGameStarted = false;
let level = 0;


//start game
$(document).keypress(function () {
    if (!isGameStarted) {
        isGameStarted = true;
        nextSequence();
    }
});


function nextSequence() {
    //create game pattern
    updateHeading('Level ' + ++level);

    setTimeout(() => {

        let randomNumber = Math.floor(Math.random() * 4);
        let randomChosenColor = buttonColor[randomNumber];
        gamePattern.push(randomChosenColor);

        playSound(randomChosenColor);
        animateBtn(randomChosenColor);

    }, 1000);

    userClickedPattern = [];
}


//detecting button click
$('.btn').click(function () {
    //create user clicked pattern
    if (!isGameStarted)
        return;

    let userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animateBtn(userChosenColor);

    checkAnswer();
});

function checkAnswer() {
    if (gamePattern[userClickedPattern.length - 1] === userClickedPattern[userClickedPattern.length - 1]) {
        if (gamePattern.length === userClickedPattern.length) {
            //next level
            nextSequence();
        }
        //now click next button
    }
    else {
        //failed
        restartGame();
    }
}

function restartGame() {
    gamePattern = [];
    userClickedPattern = [];
    isGameStarted = false;
    level = 0;

    playSound('wrong');
    updateHeading('Game over, press any key to restart the game!');
    $('body').toggleClass('game-over');
    setTimeout(() => {
        $('body').toggleClass('game-over');
    }, 200);
}

function playSound(color) {
    let sound = new Audio('sounds/' + color + '.mp3');
    sound.play();
}

function animateBtn(color) {
    $('#' + color).fadeOut(100).fadeIn(100);
}

function updateHeading(str) {
    $('h1').text(str);
}