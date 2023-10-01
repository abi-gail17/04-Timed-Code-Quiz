// Different box variables
var introCard = document.querySelector(".introCard");
var quizCard = document.querySelector("#quizCard");
var resultCard = document.querySelector("#resultCard");
var scoreCard = document.querySelector("#scoreCard");

// Timer variables
var timerElement = document.querySelector("#timer");
var secondsElement = document.querySelector("#seconds");
var timeLeft = 90;

// Quiz variables
var questionNumber = document.querySelector("#questionNumber");
var currentQuestionNumber = 0;
var questionText = document.querySelector("#question");
var answerSelect = document.querySelector("#answers");
var choiceResult = document.querySelector("#choiceResult");
var beginButton = document.querySelector("#begin");

// Highscore elements
var scoreResult = document.querySelector("#scoreResult");
var clearScoreButton = document.querySelector("#clearHighscores");
var scoreBoard = document.querySelector("#scoreBoard");
var scoreList = document.querySelector("#scoreList");
var submitButton = document.querySelector("#submit");
var goBackButton = document.querySelector("#goBack");
var initialsInput = document.querySelector("#initials");
var score = 0;

const questions = [
  {
    question: "What does HTML stand for?",
    choices: [
      "a. HighText Machine Language",
      "b. HyperText Markup Language",
      "c. HyperText and links Markup Language",
      "d. None of the above",
    ],
    correctAnswer: "b. HyperText Markup Language",
  },
  {
    question: "The function and var are known as:",
    choices: [
      "a. Declaration statements",
      "b. Keywords",
      "c. Prototypes",
      "d. Datatypes",
    ],
    correctAnswer: "a. Declaration statements",
  },
  {
    question: "Which CSS property changes the text color of an element?",
    choices: [
      "a. background-color",
      "b. text-color",
      "c. font-color",
      "d. color",
    ],
    correctAnswer: "d. color",
  },
  {
    question: "What does CSS stand for?",
    choices: [
      "a. Cascade style sheets",
      "b. Color and style sheets",
      "c. Cascading style sheets",
      "d. None of the above",
    ],
    correctAnswer: "c. Cascading style sheets",
  },
  {
    question:
      "What is the correct sequence of HTML tags for starting a webpage?",
    choices: [
      "a. Head, Title, HTML, body",
      "b. HTML, Head, Title, Body",
      "c. HTML, Body, Title, Head",
      "d. HTML, Head, Title, Body",
    ],
    correctAnswer: "b. HTML, Head, Title, Body",
  },
  {
    question: "What type of language is Javascript?",
    choices: [
      "a. High-Level",
      "b. Object-Oriented",
      "c. Assembly-language",
      "d. Object-Based",
    ],
    correctAnswer: "d. Object-Based",
  },
  {
    question:
      " Which of the following elements is responsible for making the text bold in HTML?",
    choices: ["a. <br>", "b. <a>", "c. <b>", "d. <s>"],
    correctAnswer: "c. <b>",
  },
  {
    question: "In javascript, the statement x===y implies that:",
    choices: [
      "a. Both are equal in the value and data type",
      "b. Both x and y are equal in value, type and reference address as well",
      "c. Both are x and y are equal in value only",
      "d. Both are not same at all",
    ],
    correctAnswer: "a. Both are equal in the value and data type",
  },
  {
    question:
      "Which of the following is the correct syntax to display the hyperlinks without any underline?",
    choices: [
      "a. a {text-decoration : underline;}",
      "b. a {decoration : no-underline;}",
      "c. a {text-decoration : none;}",
      "d. a {text-decoration : dashed;}",
    ],
    correctAnswer: "c. a {text-decoration : none;}",
  },
  {
    question: "The HTML attribute used to define the internal stylesheet is:",
    choices: ["a. <style>", "b. <link>", "c. <script>", "d. style"],
    correctAnswer: "a. <style>",
  },
];

//start quiz takes you to the first question
quizCard.style.display = "none";
resultCard.style.display = "none";
scoreCard.style.display = "none";
timeLeft: 90
beginButton.addEventListener("click", startQuiz);


//View high scores shows you the scoreboard
scoreBoard.addEventListener("click", function () {
  showScoreBoard();
});

//submit button inputs score on scoreboard
submitButton.addEventListener("click", function () {
  var initials = initialsInput.value;
  if (initials === "" || initials.length > 3){
    alert("Please enter your initials (up to 3 characters).");
    return;
  }
  var totalScore = calculateTotalScore();
  saveScore(initials, totalScore);
  showScoreBoard();
});

//go back button hides scoreboard and shows intro card
goBackButton.addEventListener("click", function () {
  scoreCard.style.display = "none";
  introCard.style.display = "block";
  quizCard.style.display = "none";
  resultCard.style.display = "none";
  timeLeft = 90;
});

//clear high score button clears all scores from the scoreboard
clearScoreButton.addEventListener("click", function () {
  clearScoreBoard();
});

//start quiz function gets rid of intro card, shows quiz card, starts timer, and shows question

function startQuiz() {
  score = 0;
  currentQuestionNumber = 0;
  timeLeft = 90;

  introCard.style.display = "none";
  quizCard.style.display = "block";
  scoreCard.style.display = "none";
  resultCard.style.display = "none";

  startTimer();

  displayQuestion();
}

//start timer function, if timer reaches 0, end quiz
function startTimer() {
  var timerInterval = setInterval(function () {
    if (timeLeft > 0) {
      timeLeft--;
      secondsElement.textContent = timeLeft;
    }

    if (timeLeft <= 0) {
      endQuiz();
      clearInterval(timerInterval);
      timeLeft = 0;
    }

    if (resultCard.style.display === "block") {
      clearInterval(timerInterval);
    }
  }, 1000);
}

//show questions function, makes answer buttons
function displayQuestion() {
  var currentQuestion = questions[currentQuestionNumber];

  questionNumber.textContent = "Q. " + (currentQuestionNumber + 1);
  questionText.textContent = currentQuestion.question;
  answerSelect.innerHTML = "";

  currentQuestion.choices.forEach(function (choice, index) {
    var choiceButton = document.createElement("button");
    choiceButton.textContent = choice;
    choiceButton.classList.add("answer");

    choiceButton.addEventListener("click", checkAnswer);
    answerSelect.appendChild(choiceButton);
  });
}

//check if selected answer is correct function, move onto next question or end quiz
function checkAnswer(event) {
  var selectedAnswer = event.target.textContent;
  var correctAnswer = questions[currentQuestionNumber].correctAnswer;

  if (selectedAnswer === correctAnswer) {
    score++;
    choiceResult.textContent = "Correct!";
  } else {
    timeLeft -= 5;
    choiceResult.textContent = "Incorrect!";
  }

  setTimeout(function () {
    choiceResult.textContent = "";
  }, 1050);

  currentQuestionNumber++;

  if (currentQuestionNumber < questions.length) {
    displayQuestion();
  } else {
    endQuiz();
  }
}

//function to end quiz
function endQuiz() {
  quizCard.style.display = "none";
  resultCard.style.display = "block";
  introCard.style.display = "none";
  scoreCard.style.display = "none";

  var totalScore = score + timeLeft;

  scoreResult.textContent = `You scored ${totalScore} and got ${score}/10 questions correct!`;

  clearInterval(timerInterval);
}

// Function to calculate total score
function calculateTotalScore() {
    return score + timeLeft;
  }

//function to show score board

function showScoreBoard() {
  introCard.style.display = "none";
  quizCard.style.display = "none";
  resultCard.style.display = "none";
  scoreCard.style.display = "block";

  secondsElement.textContent = 0

  displayHighscores();
}

//display each high score on scoreboard
function displayHighscores() {
  scoreList.innerHTML = "";

  var hiScores = getHighScores();

  hiScores.forEach(function (score, index) {
    var listItem = document.createElement("li");
    listItem.textContent = score.initials + ": " + score.totalScore;
    scoreList.appendChild(listItem);
  });
}

//function to save high scores
function saveScore(initials, totalScore) {
  var existingScores = JSON.parse(localStorage.getItem("totalScores")) || [];

  existingScores.push({ initials: initials, totalScore: totalScore });

  localStorage.setItem("totalScores", JSON.stringify(existingScores));
}

//function to get saved high scores
function getHighScores() {
  var storedScores = JSON.parse(localStorage.getItem("totalScores")) || [];

  storedScores.sort(function (a, b) {
    return b.totalScore - a.totalScore;
  });

  return storedScores;
}

//clear scores function
function clearScoreBoard() {
  localStorage.removeItem("totalScores");
  displayHighscores();
}
