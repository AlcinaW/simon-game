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

const redButton = document.getElementById('red');
const blueButton = document.getElementById('blue');
const greenButton = document.getElementById('green');
const yellowButton = document.getElementById('yellow');

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
redButton.onclick = (function(){
  audio.redAudio.load();

  // let isRedPlaying = audio.redAudio.currentTime > 0 && !audio.redAudio.paused && !audio.redAudio.ended
  //     && audio.redAudio.readyState > 2;
  //
  // if (!isRedPlaying) {
  audio.redAudio.play();
  audio.redAudio.currentTime = 0;
  //}
  console.log("Colour pressed is red");
  simon.sendColor(red) });
blueButton.onclick = (function(){
  audio.blueAudio.load();
  audio.blueAudio.play();
  audio.blueAudio.currentTime = 0;
  console.log("Colour pressed is blue");
  simon.sendColor(blue) });
greenButton.onclick = (function(){
  audio.greenAudio.load();
  audio.greenAudio.play();
  audio.greenAudio.currentTime = 0;
  console.log("Colour pressed is green");
  simon.sendColor(green) });
yellowButton.onclick = (function(){
  audio.yellowAudio.load();
  audio.yellowAudio.play();
  audio.yellowAudio.currentTime = 0;
  console.log("Colour pressed is yellow");
  simon.sendColor(yellow) });

redButton.disabled = true;
blueButton.disabled = true;
greenButton.disabled =  true;
yellowButton.disabled = true;

function startGame(){
  //TODo disable all buttons until start is pressed on
  round = 0;
  counterDiv.innerHTML = round;
  simon.sequence = [];
  simon.step = 0;
  simon.nextSequence();
  console.log("start / reset");

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
    strictButton.innerHTML = "Strict OFF"
  }
});

let simon = {
  sendColor: function(color){
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
          simon.nextSequence();
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
    //console.log("Colour pressed:" + color);
  },
  sequence: [],
  //play sound associated with each array item
  colors: [red, blue, green, yellow],
  step: 0,
  nextSequence: function(){
    let nextColor = simon.colors[Math.floor(Math.random() * simon.colors.length)];
    console.log("Random color:", nextColor);
    simon.sequence.push(nextColor);
    //PLAY NEXT SEQUENCE --> flash in sequence + make sound
    console.log(simon.sequence);

    round++;

    if (round === 20){
      alert("Congrats you won");
      console.log("bbb");
      startGame();
    }

    counterDiv.innerHTML = round;
    console.log("Round is " + round);

    //set timeout for watch loop of the audio
    //setTimeout(function(){
      for (let i = 0; i < simon.sequence.length; i++){
        if (simon.sequence[i] == "red"){
          playRedAudio();
          //audio.redAudio.load();
          //audio.redAudio.play();
          //TODO For each loop through the array, call a delay to each sound and flash is seperate
          console.log("red button go");
        } else if (simon.sequence[i] == "blue"){
            // audio.blueAudio.load();
            // audio.blueAudio.play();
            console.log("blue button sound and flash");
        } else if (simon.sequence[i] == "green"){
            //audio.greenAudio.load();
            //audio.greenAudio.play();
            console.log("green button sound and flash");
        } else if (simon.sequence[i] == "yellow"){
            //audio.yellowAudio.load();
            //audio.yellowAudio.play();
            console.log("yellow button sound and flash");
        } else {
            console.log("something is wrong", i);
        }
      }
    //}, 1500);
  }
};

function playRedAudio(){
  setTimeout(function(){
    audio.redAudio.load();
    audio.redAudio.play();
    console.log("red button sound and flash 1");
  }, 1500);
}

//TODO Case switch for button disable
