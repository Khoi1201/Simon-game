// alert("Hi");

let buttonColours = ["red", "blue", "green", "yellow"];
let randomNumber;
let gamePattern = [];
let userClickedPattern = [];
let numberOfButtons = $(".btn").length
let gameStarted = 0;
let randomChosenColour;
let level = 0;

// $(document).keypress(function() {playSound(randomChosenColour)});

function nextSequence() {
  userClickedPattern = []; // noob
  randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  // console.log(randomNumber);
  $("h1")[0].innerText = "Level " + level;
  level += 1;

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); // noob
  playSound(randomChosenColour); // noob
};

$(document).keypress(function() {
  if (gameStarted == 0) {
    gameStarted = 1;
    addListener()
    nextSequence();

    playSound(randomChosenColour);
    $("#" + randomChosenColour).addClass("pressed");

    setTimeout(function() {
      $("." + "btn").removeClass("pressed");
    }, 100);
    $("h1")[0].innerText = "Level 0";

  }
  // work for the first time when the game start
});

// console.log($("#" + randomChosenColour))

function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
  // play sound using given name
}

function addListener() {
  for (let i = 0; i < numberOfButtons; i++) {
    $(".btn")[i].addEventListener("click", function() {
      let userChosenColour = this.id; // id  = colour
      // console.log(userChosenColour);
      userClickedPattern.push(userChosenColour);
      // console.log(userClickedPattern);
      playSound(userChosenColour);

      $("#" + this.id).addClass("pressed");

      setTimeout(function() {
        $("." + "btn").removeClass("pressed");
      }, 100);
      checkAnswer(userClickedPattern.length - 1);
      // make the button turn grey when click and turn it back after
    })
  }
}


function checkAnswer(currentLevel) { // noob
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function startOver() { // noob
  level = 0;
  gamePattern = [];
  started = false;
}
