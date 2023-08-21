/**
 * This project implements one of the earliest applications
 * of Artificial Neural Networks. It allows the user to draw characters
 * on a canvas and then train the program to be able to recognize these characters
 * correctly.
 *
 * The project uses a 200x200 pixel canvas.
 *
 * Classes:
 *         Letter class:                Creates a letter the user specifies.
 */
var canvas = document.getElementById("canvasForDrawing");
var ctx = canvas.getContext("2d");

//text box and button for training
var lbi = document.getElementById("letterTrain");
var trainBt = document.getElementById("trainBt");

//guess button
var guessBt = document.getElementById("guessBt");

//wrong guess
var wgl = document.getElementById("letterWrong");
var wguess = document.getElementById("wguessBt");

var count = 0,
  cSize = 200; //cSize for 200 by 200 pixel canvas.
var lt;
var letters = [];

var grid = new Array(cSize);
var weightsArray = new Array(cSize),
  lastGuess = new Array(cSize);

for (var i = 0; i < cSize; i++) {
  grid[i] = new Array(cSize);
  weightsArray[i] = new Array(cSize);
  lastGuess[i] = new Array(cSize);
  for (var j = 0; j < cSize; j++) {
    grid[i][j] = -1;
    weightsArray[i][j] = 0;
  }
}
/**
 * Each time the user trains a letter a new letter
 * object is created with the input, and then after
 * training each letter has its weights array computed
 * and then the weighhtValue computed from the weights array.
 *
 * Class variables:
 *          letter:             Char inputted by the user.
 *
 *          weightArray:        Computed after training is done.
 *
 *          weightValue:        Computed by adding up all the positive
 *                              values in the array weightArray.
 */
class letter {
  constructor(letter, weightArray, weightValue) {
    this.letter = letter;
    this.weightArray = new Array(cSize);
    for (var i = 0; i < cSize; i++) {
      this.weightArray[i] = new Array(cSize);
      for (var j = 0; j < cSize; j++) {
        this.weightArray[i][j] = weightArray[i][j];
      }
    }
    this.weightValue = 0;
  }
}

/**
 * Only one letter can be trained at a time.
 */
trainBt.onclick = function () {
  if (lbi.value.length > 0) {
    if (count == 0) {
      var exists = false;
      for (var i = 0; i < letters.length; i++) {
        if (lbi.value == letters[i].letter) {
          lt = letters[i];
          exists = true;
          break;
        }
      }

      if (!exists) {
        lt = new letter(lbi.value, weightsArray);
        letters.push(lt);
      }
    }

    count++;
    learn(lt, grid);
  } else {
    console.log("Please input a letter in the train letter box");
    clearCanvas();
  }
};

guessBt.onclick = function () {
  if (letters.length > 0) guess(grid);
  else console.log("Please train a letter first");
};

/**
 * If the user identifies a guess as wrong,
 * correcting the guess entails adjusting the
 * corresponding letter weight by recomputing it
 * until the guess based is correct.
 */
wguess.onclick = function () {
  if (wgl.value.length > 0) {
    var guessWrong = false,
      exists = false;
    var lt;
    var countTimes = 0;
    //check if the character is trained and exists in the letters array
    for (var i = 0; i < letters.length; i++) {
      if (wgl.value == letters[i].letter) {
        lt = letters[i];
        exists = true;
        break;
      }
    }

    if (exists) {
      while (!guessWrong) {
        //we modify the letter's weight by making it learn the weight again
        learn(lt, lastGuess);
        if (guess(lastGuess).letter == wgl.value) {
          //test the guess after every time we modify the letter's weight array
          guessWrong = true;
        }
        countTimes++;
      }
      console.log(
        "Output corrected! It took " +
          countTimes +
          " time of modfying the letter's weight to correct the guess"
      );
    }
  } else {
    console.log("Please input the letter for which to correct the output of");
  }
};

function learn(letter, grid) {
  for (var i = 0; i < cSize; i++) {
    for (j = 0; j < cSize; j++) {
      letter.weightArray[i][j] += grid[i][j];
    }
  }
  if (count == 3) {
    for (var i = 0; i < cSize; i++) {
      for (var j = 0; j < cSize; j++) {
        if (letter.weightArray[i][j] > 0) {
          letter.weightValue += letter.weightArray[i][j];
        }
      }
    }
    count = 0;
    console.log(
      "Learned letter: " +
        letter.letter +
        " has a weight value of: " +
        letter.weightValue
    );
  }

  clearCanvas();
}

function guess(grid) {
  var highestQ = 0,
    t = 0,
    index = -1;
  for (var i = 0; i < letters.length; i++) {
    t = getCandidateScore(letters[i], grid) / letters[i].weightValue;

    if (t > highestQ) {
      highestQ = t;
      index = i;
    }
  }

  console.log("Guess was: " + letters[index].letter + " index " + index);

  for (var i = 0; i < cSize; i++) {
    for (var j = 0; j < cSize; j++) {
      lastGuess[i][j] = grid[i][j];
    }
  }

  clearCanvas();
  return letters[index];
}

function getCandidateScore(letter, grid) {
  var candidateScore = 0;
  for (var i = 0; i < cSize; i++) {
    for (var j = 0; j < cSize; j++) {
      candidateScore += grid[i][j] * letter.weightArray[i][j];
    }
  }
  return candidateScore;
}

function clearCanvas() {
  for (var i = 0; i < cSize; i++) {
    for (j = 0; j < cSize; j++) {
      if (grid[i][j] != -1) {
        grid[i][j] = -1;
      }
    }
  }
  ctx.clearRect(0, 0, 200, 200);
}

canvas.onmousedown = function (e) {
  ctx.fillStyle = "#000000";
  lastX = e.pageX - this.offsetLeft;
  lastY = e.pageY - this.offsetTop;
};

canvas.onmousemove = function (e) {
  if (e.buttons == 1) {
    var x = e.x,
      y = e.y;
    ctx.fillRect(e.x, e.y, 20, 20);

    for (var i = x; i < x + 20; i++) {
      for (j = y; j < y + 20; j++) {
        grid[i][j] = 1;
      }
    }
  }
};
