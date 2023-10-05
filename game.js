
let buttonColours = ["red", "blue", "green", "yellow"];  //all button colors

let gamePattern = [];
let userClickedPattern = [];

let level = 0;
let started = false;

$(document).keypress(() => {
  if (!started) {
    nextSequence();
    started = true;
  }
})

$(".btn").click(function () {

  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  pressedColor(userChosenColour)
  checkAnswer(userClickedPattern.length - 1);
});


//The main fuction 
function nextSequence() {
  userClickedPattern = []
  level++;
  $("#level-title").text("Level " + level);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log(randomChosenColour)
  console.log(userClickedPattern);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

//The sound player
playSound = (name) => {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//key activator function
pressedColor = (userChosenColour) => {
  let activeKey = $("#" + userChosenColour);
  activeKey.addClass("pressed")
  remover = () => {
    activeKey.removeClass('pressed');
  }
  setTimeout(remover, 100);

}


//to check whether the answer is correct or not
checkAnswer = (currentLevel) => {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    let gameOver = $("body");
    gameOver.addClass("red")
    remover = () => {
      gameOver.removeClass('red');
    }
    setTimeout(remover, 100);
    $("#level-title").text("Game over,Press any key to restart");
    startOver();

  }
}

startOver = () => {
  level = 0;
  gamePattern = [];
  started = false;
}

