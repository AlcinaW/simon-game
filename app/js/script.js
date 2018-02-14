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

// const redButton = document.getElementsByClassName('red');;
// const blueButton = document.getElementsByClassName('blue');
// const greenButton = document.getElementsByClassName('green');
// const yellowButton = document.getElementsByClassName('yellow');

const counterDiv = document.getElementById('step-counter');
//needs to show what step you are one right now

const audio = {
  redAudio: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
  blueAudio: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
  yellowAudio: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
  greenAudio: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")
};

// let redAudio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
// let blueAudio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
// let yellowAudio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
// let greenAudio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");

counterDiv.innerHTML = "--";
let round;
//"use strict";

resetButton.onclick = (function(){
  startGame(); });
startButton.onclick = (function(){
  startGame(); });
redButton.onclick = (function(){
  audio.redAudio.load();
  audio.redAudio.play();
  console.log("Colour pressed is red");
  simon.sendColor(red) });
blueButton.onclick = (function(){
  audio.blueAudio.load();
  audio.blueAudio.play();
  console.log("Colour pressed is blue");
  simon.sendColor(blue) });
greenButton.onclick = (function(){
  audio.greenAudio.load();
  audio.greenAudio.play();
  console.log("Colour pressed is green");
  simon.sendColor(green) });
yellowButton.onclick = (function(){
  audio.yellowAudio.load();
  audio.yellowAudio.play();
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
  } else {
    strictButton.value = "OFF";
    console.log("strict mode is off");
    strictButton.innerHTML = "Strict OFF"
  }
});


// function myTimeoutFunction() {
//   doStuff();
// }
//
// myTimeoutFunction();
// setInterval(myTimeoutFunction, 1000);


//add max at 20 steps, then reset
let simon = {
  sendColor: function(color){
    //0 as false-y value
    //if(simon.sequence.length === 0){
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
    //have the new array

    //loop through the array and put together a series of colour flashes and sounds
    //disable buttons until sequence is complete
    // ==

    round++;

    if (round === 20){
      alert("Congrats you won");
      console.log("bbb");
      startGame();
    }

    counterDiv.innerHTML = round;
    console.log("Round is " + round);
    //simon.playSequence();

    for (let i = 0; i < simon.sequence.length; i++){
      if (simon.sequence[i] == "red"){
        //redButton.click();
        console.log("red button sound and flash");
      } else if (simon.sequence[i] == "blue"){
          //audio.blueAudio.load();
          //audio.blueAudio.play();
          //blueButton.click();
          console.log("blue button sound and flash");
      } else if (simon.sequence[i] == "green"){
          //audio.greenAudio.load();
          //audio.greenAudio.play();
          //greenButton.click();
          console.log("green button sound and flash");
      } else if (simon.sequence[i] == "yellow"){
        //audio.yellowAudio.load();
        //audio.yellowAudio.play();
        //yellowButton.click();
        console.log("yellow button sound and flash");
      } else {
        console.log("something is wrong", i);
      }
    }
  }
  //,
  //playSequence: function(){
    // let playRedPromise = audio.redAudio.play();
    // let playBluePromise = audio.blueAudio.play();
    // let playGreenPromise = audio.greenAudio.play();
    // let playYellowPromise = audio.yellowAudio.play();

    //for (let key in simon.sequence) {
    //for (let i = 0; i < simon.sequence.length; i++){
      //if (simon.sequence[i] == "red"){
        // if (playRedPromise !== undefined) {
        //   playredPromise.then(function() {
        //     console.log("played red");
        //   }).catch(function(error) {
        //     console.log(error);
        //   });
        // }

        //add remove classList
        //play sound
        //redButton[0].removeAttribute("id");
        //redButton.classList.toggle('.red');
        // audio.redAudio.load();
        // audio.redAudio.play();
        //if (Object.prototype.hasOwnProperty.call(obj, prop)) {
          // prop is not inherited
        //}
        //redButton.click();
        //console.log(key, red);
        //console.log("red button sound and flash");
        //redButton.classList.toggle('');
      //} else if (simon.sequence[i] == "blue"){

          //audio.blueAudio.load();
          //audio.blueAudio.play();
      //     blueButton.click();
      //     console.log("blue button sound and flash");
      // } else if (simon.sequence[i] == "green"){
          //audio.greenAudio.load();
          //audio.greenAudio.play();
      //     greenButton.click();
      //     console.log("green button sound and flash");
      // } else if (simon.sequence[i] == "yellow"){
        //audio.yellowAudio.load();
        //audio.yellowAudio.play();
    //     yellowButton.click();
    //     console.log("yellow button sound and flash");
    //   } else {
    //     console.log("something is wrong", i);
    //   }
    // }
  //}
};

//TODO Case switch for button disable
