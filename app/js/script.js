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
const redButton = document.getElementById('red');
const blueButton = document.getElementById('blue');
const greenButton = document.getElementById('green');
const yellowButton = document.getElementById('yellow');

const counterDiv = document.getElementById('step-counter');
//needs to show what step you are one right now

const audio = {
  red: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
  blue: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
  yellow: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
  green: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")
};

counterDiv.innerHTML = "--";
let round;
//"use strict";

//reset and start do the same thing, move function to below
resetButton.onclick = (function(){ startGame(); });
startButton.onclick = (function(){ startGame(); });
redButton.onclick = (function(){ audio.red.currentTime = 0; audio.red.play(); simon.sendColor(red)});
blueButton.onclick = (function(){ simon.sendColor(blue) });
greenButton.onclick = (function(){ simon.sendColor(green) });
yellowButton.onclick = (function(){ simon.sendColor(yellow) });

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

// function playSound() {
//       var sound = document.getElementById("audio");
//       sound.play()
// }

//add max at 20 steps, then reset
let simon = {
  sendColor: function(color){
    //0 as false-y value
    //if(simon.sequence.length === 0){
    if(!simon.sequence.length){
    //if(!simon.sequence.length && simon.sequence.length <= 4){
      //start new game
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
    console.log("Colour pressed:" + color);
  },
  sequence: [],
  colors: [red, blue, green, yellow],
  step: 0,
  nextSequence: function(){
    let nextColor = simon.colors[Math.floor(Math.random() * simon.colors.length)];
    console.log("Random color:", nextColor);
    simon.sequence.push(nextColor);
    console.log(simon.sequence);
    //simon.roundCount();
    round++;
    counterDiv.innerHTML = round;
    console.log("Round is " + round);
  }
};

//TODO Case switch for button disable
