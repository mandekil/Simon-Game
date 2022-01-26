
var buttonColors = ["red", "blue", "green", "yellow"];  // array of button color
var gamePattern = [];  // to save the color order in a game
var userClickedPattern = [];  // to save user color choice
var started = false;  // false: will not start the game
var level = 0;  // initial level

// user click
$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

// start the game
$(document).keydown(function () {
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});




function nextSequence() {
    // Set random the next button color
    userClickedPattern = []; // saved in array
    level++;  // level up
    $("#level-title").text("Level " + level); // show level number

    var randomNumber = Math.floor(Math.random() * 4);   // get random number
    var randomChosenColor = buttonColors[randomNumber]; // set the button color based on random number
    gamePattern.push(randomChosenColor);  // add the next button color in the array

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100); // button color animation
    playSound(randomChosenColor);  // button color sound
}

function checkAnswer(currentLevel) {
    // Check user answer which is saved in array by matching it to array of gamePattern  
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        // user clicks the right color
        console.log("succes");
    
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        // game over if user click the wrong color
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 300);
        $("#level-title").text("Game Over! Press Any Key to Restart");
        startOver();
    }

    
}

function startOver(params) {
    // restart the game when gets the game over
    gamePattern = [];
    started = false;
    level = 0;
}

function playSound(name) {
    // make sound
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    // user click animation
    $("#" + currentColor).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
    }, 300);
}