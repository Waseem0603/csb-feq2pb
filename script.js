const questions = [
  {
    questionText: "Commonly used data types DO NOT include:",
    options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    answer: "3. alerts"
  },
  {
    questionText: "Arrays in JavaScript can be used to store ______.",
    options: [
      "1. numbers and strings",
      "2. other arrays",
      "3. booleans",
      "4. all of the above"
    ],
    answer: "4. all of the above"
  },
  {
    questionText:
      "String values must be enclosed within _____ when being assigned to variables.",
    options: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
    answer: "3. quotes"
  },
  {
    questionText:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    options: [
      "1. JavaScript",
      "2. terminal/bash",
      "3. for loops",
      "4. console.log"
    ],
    answer: "4. console.log"
  },
  {
    questionText:
      "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
    options: ["1. break", "2. stop", "3. halt", "4. exit"],
    answer: "1. break"
  }
];

let startCard = document.getElementById("start-card");
let questionCard = document.getElementById("question-card");
let highScore = document.getElementById("high-score");
let finalOne = document.getElementById("final-one");

let timeleft = 50;
let mark = 0;
let que_count = 0;

function reset() {
  timeleft = 50;
  mark = 0;
  que_count = 0;
  optionIndex = 0;
}

function quizTimer() {
  let downloadTimer = setInterval(function () {
    if (timeleft <= 0) {
      clearInterval(downloadTimer);
      document.getElementById("countdown").innerHTML = "Finished";
      startCard.style.display = "none";
      questionCard.style.display = "none";
      highScore.style.display = "none";

      finalOne.style.display = "flex";
    } else {
      document.getElementById("countdown").innerHTML = timeleft;
    }
    timeleft -= 1;
  }, 1000);

  startCard.style.display = "none";
  questionCard.style.display = "flex";
  showQuestions(0);
}

function showQuestions(index) {
  const que_text = document.querySelector(".question");
  const option_text = document.querySelector(".option-list");

  let que_tag = `<span>` + questions[index].questionText + `</span>`;
  let options_tag =
    `<div class="options">` +
    questions[index].options[0] +
    `</div>` +
    `<div class="options">` +
    questions[index].options[1] +
    `</div>` +
    `<div class="options">` +
    questions[index].options[2] +
    `</div>` +
    `<div class="options">` +
    questions[index].options[3] +
    `</div>`;
  que_text.innerHTML = que_tag;
  option_text.innerHTML = options_tag;

  const option = option_text.querySelectorAll(".options");
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

let optionIndex = 0;

function optionSelected(clickedanswer) {
  let userAnswer = clickedanswer.textContent;
  let correctAnswer = questions[optionIndex].answer;

  const res = document.querySelector(".correct1");
  document.querySelector(".hr").style.display = "block";

  if (userAnswer === correctAnswer) {
    res.innerText = "Correct!!!";
    setTimeout(() => {
      res.innerText = "";
    }, 800);
    mark++;

    localStorage.setItem("totalMark", JSON.stringify(mark));
  } else {
    res.innerText = "InCorrect!";
    setTimeout(() => {
      res.innerText = "";
    }, 800);

    timeleft -= 10;
  }

  // console.log(mark)

  que_count++;
  optionIndex++;

  if (que_count <= questions.length - 1) {
    setTimeout(() => {
      showQuestions(que_count);
    }, 1000);
  } else {
    console.log("else finsihedd");
    timeleft = 0;
    questionCard.style.display = "none";
    document.getElementById("countdown").innerHTML = "Finished";
    finalOne.style.display = "flex";
  }

  let markres = localStorage.getItem("totalMark");
  console.log(JSON.parse(markres));
}

function nameSubmit() {
  let markres = localStorage.getItem("totalMark");
  let scoreBoard = document.querySelector("#high-score");
  finalOne.style.display = "none";
  scoreBoard.style.display = "flex";
  let nameInput = document.querySelector(".name-input").value;
  console.log(nameInput);

  let winners = document.querySelector(".score-winners");
  let winnersList =
    `<p class="winners">` +
    nameInput +
    ` <b> ` +
    JSON.parse(markres) +
    ` </b></p>`;
  winners.innerHTML = winnersList;
}

function displayScore() {
  startCard.style.display = "none";
  questionCard.style.display = "none";
  finalOne.style.display = "none";
  highScore.style.display = "flex";
}

function goBack() {
  highScore.style.display = "none";
  startCard.style.display = "flex";
  reset();
}

function clearAll() {
  localStorage.clear();
  let winners = document.querySelector(".score-winners");
  let winnersList = `<p class="winners"><b></b></p>`;
  winners.innerHTML = winnersList;
}