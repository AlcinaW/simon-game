//Requirements

//Four different coloured zones that will need to light up
//takes user input and verifies that is it correct
//loop through array of actions and check if correct? What is the sequence, and how long can you go?
//each colour has a sound associated with it
//what is strict mode?
//unintrustive alert mode for making a mistake and playing again
//counter to display and keep track of how many wins

//4 buttons that play sounds

//Strict Mode listener
//if not on strict mode, replay sequence

//colours
const red = "red";
const blue = "blue";
const green = "green";
const yellow = "yellow";
const strict = "strict";

//buttons for starting game and setting strict/not-strict
const startButton = document.getElementById("start");
const strictButton = document.getElementById("strict");

//button input for matching and showing sequence
const redButton = document.getElementById("red");
const blueButton = document.getElementById("blue");
const greenButton = document.getElementById("green");
const yellowButton = document.getElementById("yellow");

//counts what round is currently active
const counterDiv = document.getElementById("step-counter");
counterDiv.innerHTML = "--";
let round;

//audio when button is pressed of sequence is played
const audio = {
  redAudio: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
  blueAudio: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
  yellowAudio: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
  greenAudio: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")
};

//start or reset
startButton.onclick = (function(){
  startGame(); });

//TODO rewrite this
redButton.onmousedown = (function(){
  redButton.classList.replace("black", "red");
  audio.redAudio.load();
  audio.redAudio.play();
  console.log("Colour pressed is red");
  simon.sendColor(red) });
redButton.onmouseup = (function(){
  redButton.classList.replace("red", "black");
});
blueButton.onmousedown = (function(){
  blueButton.classList.replace("black", "blue");
  audio.blueAudio.load();
  audio.blueAudio.play();
  audio.blueAudio.currentTime = 0;
  console.log("Colour pressed is blue");
  simon.sendColor(blue) });
blueButton.onmouseup = (function(){
  blueButton.classList.replace("blue", "black");
});
greenButton.onmousedown = (function(){
  greenButton.classList.replace("black", "green");
  audio.greenAudio.load();
  audio.greenAudio.play();
  audio.greenAudio.currentTime = 0;
  console.log("Colour pressed is green");
  simon.sendColor(green) });
greenButton.onmouseup = (function(){
  greenButton.classList.replace("green", "black");
});
yellowButton.onmousedown = (function(){
  yellowButton.classList.replace("black", "yellow");
  audio.yellowAudio.load();
  audio.yellowAudio.play();
  audio.yellowAudio.currentTime = 0;
  console.log("Colour pressed is yellow");
  simon.sendColor(yellow) });
yellowButton.onmouseup = (function(){
  yellowButton.classList.replace("yellow", "black");
});

//on page load, buttons are disabled
redButton.disabled = true;
blueButton.disabled = true;
greenButton.disabled =  true;
yellowButton.disabled = true;


let strictMode = true;
//controls if game is strict or not, and resets the game
strictButton.onclick = (function strictToggle(classToggle) {
  this.classList.toggle('strict-on');
  this.classList.toggle('strict-off');

  if(strictButton.value == "OFF"){
    strictButton.value = "ON";
    console.log("strict mode is on");
    strictButton.innerHTML = "Strict ON";
    strictMode = true;
    startGame();
    //strictGame(yesno);
    //TODO send value to simon game to determine if strict is on or off
    //If the "strict" toggle is changed, reset game (should not disable this button)
  } else {
    strictButton.value = "OFF";
    console.log("strict mode is off");
    strictButton.innerHTML = "Strict OFF";
    strictMode = false;
    startGame();
  }
});



//TODO disable all buttons until start is pressed on
let startGame = function(){
  round = 0;
  counterDiv.innerHTML = round;
  simon.sequence = [];
  simon.step = 0;
  simon.nextSequence();
  console.log("game restarted");
};

let simon = {
  sendColor: function(color){
    if(!simon.sequence.length){
      simon.nextSequence();
    } else {
      //check if colour matches with step we are on
      //TODO wrap in a new if strict or not-strict, or rewrite
      if(color === simon.sequence[simon.step]){
        //got to next step
        if(simon.step === simon.sequence.length - 1){
          console.log("sequence complete");
          //reset the step
          simon.step = 0;
          setTimeout(function(){
            simon.nextSequence();
          },1200);
        } else {
          simon.step++;
        }
      } else {
        //lose condition in strict
        //if (strictMode == true){
          alert("Wrong!");
          //reset all buttons to default
          redButton.classList.replace("red", "black");
          blueButton.classList.replace("blue", "black");
          greenButton.classList.replace("green", "black");
          yellowButton.classList.replace("yellow", "black");
          console.log("strict mode reset");
          startGame();
        //}
        // redButton.classList.replace("red", "black");
        // blueButton.classList.replace("blue", "black");
        // greenButton.classList.replace("green", "black");
        // yellowButton.classList.replace("yellow", "black");
        // simon.nextSequence();
        //replay notes again
        //how to seperate "strict" from not-strict play?
        //call startGame to reset game

      }
    }
  },
  sequence: [],
  //play sound associated with each array item
  colors: [red, blue, green, yellow],
  step: 0,
  nextSequence: function(){
    let nextColor = simon.colors[Math.floor(Math.random() * simon.colors.length)];
    console.log("Random color:", nextColor);
    simon.sequence.push(nextColor);
    console.log(simon.sequence);
    round++;

    //if arrive at round 21, you win and restart
    if (round > 20){
      alert("Congrats, you won!");
      console.log("you win, restart");
      startGame();
    }

    counterDiv.innerHTML = round;
    console.log("Round is " + round);

    //controls the audio sequence being played so that not all the nots play at the same time
    let i = 0;

    function delayedAudioLoop(){
      //while looping through the audio, input is not allowed
      redButton.disabled = true;
      blueButton.disabled = true;
      greenButton.disabled = true;
      yellowButton.disabled = true;

      if (simon.sequence[i] == "red"){
        redButton.classList.replace("black", "red");
        setTimeout(function(){
          redButton.classList.replace("red", "black");
          console.log("red button flashed");
        },800);
        audio.redAudio.load();
        audio.redAudio.play();
        audio.redAudio.currentTime = 0;
        console.log("red button sound done");
      } else if (simon.sequence[i] == "blue"){
        blueButton.classList.replace("black", "blue");
        setTimeout(function(){
          blueButton.classList.replace("blue", "black");
          console.log("blue button flashed");
        },800);
          audio.blueAudio.load();
          audio.blueAudio.play();
          audio.blueAudio.currentTime = 0;
          console.log("blue button sound");
      } else if (simon.sequence[i] == "green"){
          greenButton.classList.replace("black", "green");
          setTimeout(function(){
            greenButton.classList.replace("green", "black");
            console.log("green button flashed");
          },800);
          audio.greenAudio.load();
          audio.greenAudio.play();
          audio.greenAudio.currentTime = 0;
          console.log("green button sound");
      } else if (simon.sequence[i] == "yellow"){
          yellowButton.classList.replace("black", "yellow");
          setTimeout(function(){
            yellowButton.classList.replace("yellow", "black");
            console.log("yellow button flashed");
          },800);
          audio.yellowAudio.load();
          audio.yellowAudio.play();
          audio.yellowAudio.currentTime = 0;
          console.log("yellow button sound");
      } else {
          console.log("something is wrong", i);
      }

    //if the end of the array has been reached, stop
    if(++i == simon.sequence.length){
      console.log("buttons enabled");
      redButton.disabled = false;
      blueButton.disabled = false;
      greenButton.disabled = false;
      yellowButton.disabled = false;
      return;
    }

    //recursively call the delayed loop function with a delay
    window.setTimeout(delayedAudioLoop, 1200);
    }
    //start loop
    delayedAudioLoop();
  }
};
