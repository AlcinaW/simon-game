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

//use CSS to flash the move?
//on button press, play the audio, except when wrong

const red = "red";
const blue = "blue";
const green = "green";
const yellow = "yellow";

const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const strictButton = document.getElementById('strict');

let redButton = document.getElementById('red');
let blueButton = document.getElementById('blue');
let greenButton = document.getElementById('green');
let yellowButton = document.getElementById('yellow');

const counterDiv = document.getElementById('step-counter');
//needs to show what step you are one right now

const audio = {
  redAudio: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
  blueAudio: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
  yellowAudio: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
  greenAudio: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")
};

counterDiv.innerHTML = "--";
let round;
//"use strict";

//Both buttons do the same thing, just have one that swaps between?
resetButton.onclick = (function(){
  startGame(); });
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

redButton.disabled = true;
blueButton.disabled = true;
greenButton.disabled =  true;
yellowButton.disabled = true;

//TODO disable all buttons until start is pressed on
let startGame = function(){
  round = 0;
  counterDiv.innerHTML = round;
  simon.sequence = [];
  simon.step = 0;
  simon.nextSequence();
  console.log("start / reset was pressed");

  redButton.disabled = false;
  blueButton.disabled = false;
  greenButton.disabled = false;
  yellowButton.disabled = false;
};

strictButton.onclick = (function strictToggle(classToggle) {
  this.classList.toggle('strict-on');
  this.classList.toggle('strict-off');

  if(strictButton.value == "OFF"){
    strictButton.value = "ON";
    console.log("strict mode is on");
    strictButton.innerHTML = "Strict ON"
    //TODO send value to simon game to determine if strict is on or off
    //If the "strict" toggle is changed, reset game (should not disable this button)
  } else {
    strictButton.value = "OFF";
    console.log("strict mode is off");
    strictButton.innerHTML = "Strict OFF";
  }
});

let simon = {
  sendColor: function(color){
    //TODO set another setTimeout to delay 1500ms after the last button press?
    if(!simon.sequence.length){
      simon.nextSequence();
    } else {
      //check if colour matches with step we are on
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
        //!!lose condition
        alert("Wrong!");
        //how to seperate "strict" from not-strict play?
        //call startGame to reset game
        startGame();
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

    if (round === 20){
      alert("Congrats, you won!");
      console.log("you win, restart");
      startGame();
    }

    counterDiv.innerHTML = round;
    console.log("Round is " + round);

    let i = 0;

    function delayedAudioLoop(){

    //set timeout for watch loop of the audio
      if (simon.sequence[i] == "red"){
        redButton.classList.replace("black", "red");
        setTimeout(function(){
          redButton.classList.replace("red", "black");
          console.log("red button flashed");
        },800);
        audio.redAudio.load();
        audio.redAudio.play();
        audio.redAudio.currentTime = 0;
        //TODO For each loop through the array, call a delay to each sound and flash is seperate
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
      return;
    }

    //recursively call the delayed loop function with a delay
    window.setTimeout(delayedAudioLoop, 1200);
    }
    delayedAudioLoop(); //start loop


  }
};
