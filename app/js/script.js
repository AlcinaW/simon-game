//Requirements


//Four different coloured zones that will need to light up
//takes user input and verifies that is it correct
//loop through array of actions and check if correct? What is the sequence, and how long can you go?
//each colour has a sound associated with it
//what is strict mode?
//unintrustive alert mode for making a mistake and playing again
//counter to display and keep track of how many wins

//4 buttons that play sounds
//using ReactJS?

const red = "red";
const blue = "blue";
const green = "green";
const yellow = "yellow";

let simon = {
  sendColor: function(color){
    console.log("Colour pressed:" + color);
  },
  sequence: [],
  colors: [red, blue, green, yellow],
  nextSequence: function(){
    let nextColor = simon.colors[Math.floor(Math.random() * simon.colors.length)];
    console.log("Random color:", nextColor);
    simon.sequence.push(nextColor);
    console.log(simon.sequence);
  }

};

// const audio = {
//   red: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
//   blue: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
//   yellow: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
//   green: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")
// };

const redButton = document.getElementById('red');
const blueButton = document.getElementById('blue');
const greenButton = document.getElementById('green');
const yellowButton = document.getElementById('yellow');

redButton.onclick = (function(){ simon.sendColor(red) });
blueButton.onclick = (function(){ simon.sendColor(blue) });
greenButton.onclick = (function(){ simon.sendColor(green) });
yellowButton.onclick = (function(){ simon.sendColor(yellow) });

//push random array of colours in sequence and invoke it
