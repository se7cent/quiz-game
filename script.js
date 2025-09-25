let score = 0;
let timer;
let timeLeft = 3;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const timerElement = document.getElementById("timer");
const scoreElement = document.getElementById("score");
const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", startGame);

function startGame() {
  score = 0;
  scoreElement.textContent = "Score: " + score;
  startBtn.style.display = "none";
  nextQuestion();
}

function nextQuestion() {
  clearInterval(timer);
  timeLeft = 3;
  timerElement.textContent = "Time: " + timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = "Time: " + timeLeft;
    if (timeLeft <= 0) {
      gameOver();
    }
  }, 1000);

  generateQuestion();
}

function generateQuestion() {
  optionsElement.innerHTML = "";

  let a = Math.floor(Math.random() * 20) + 1;
  let b = Math.floor(Math.random() * 20) + 1;
  let operators = ["+", "-", "*"];
  let operator = operators[Math.floor(Math.random() * operators.length)];

  let correctAnswer;
  switch (operator) {
    case "+": correctAnswer = a + b; break;
    case "-": correctAnswer = a - b; break;
    case "*": correctAnswer = a * b; break;
  }

  questionElement.textContent = `What is ${a} ${operator} ${b}?`;

  let answers = [correctAnswer];
  while (answers.length < 4) {
    let wrong = correctAnswer + Math.floor(Math.random() * 10) - 5;
    if (!answers.includes(wrong)) answers.push(wrong);
  }
  answers.sort(() => Math.random() - 0.5);

  answers.forEach(answer => {
    let btn = document.createElement("button");
    btn.textContent = answer;
    btn.onclick = () => {
      if (answer === correctAnswer) {
        score++;
        scoreElement.textContent = "Score: " + score;
        nextQuestion();
      } else {
        gameOver();
      }
    };
    optionsElement.appendChild(btn);
  });
}

function gameOver() {
  clearInterval(timer);
  questionElement.textContent = "Game Over! Final Score: " + score;
  optionsElement.innerHTML = "";
  timerElement.textContent = "";
  startBtn.style.display = "block";
  startBtn.textContent = "Play Again";
}
