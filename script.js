let timer;
let timeLeft = 3;
let correctAnswer;

function generateQuestion() {
  const num1 = Math.floor(Math.random() * 50) + 1;
  const num2 = Math.floor(Math.random() * 50) + 1;
  const operators = ['+', '-', '*'];
  const operator = operators[Math.floor(Math.random() * operators.length)];
  let questionText = `${num1} ${operator} ${num2}`;
  correctAnswer = eval(questionText);
  document.getElementById('question').innerText = `What is ${questionText}?`;
  generateOptions(correctAnswer);
  resetTimer();
}

function generateOptions(answer) {
  const optionsDiv = document.getElementById('options');
  optionsDiv.innerHTML = '';
  let options = [answer];
  while (options.length < 4) {
    let fake = answer + Math.floor(Math.random() * 20) - 10;
    if (!options.includes(fake)) options.push(fake);
  }
  options.sort(() => Math.random() - 0.5);
  options.forEach(opt => {
    let btn = document.createElement('button');
    btn.innerText = opt;
    btn.onclick = () => checkAnswer(opt);
    optionsDiv.appendChild(btn);
  });
}

function checkAnswer(selected) {
  if (selected === correctAnswer) {
    document.getElementById('status').innerText = '✅ Correct!';
    setTimeout(generateQuestion, 1000);
  } else {
    document.getElementById('status').innerText = '❌ Wrong! Game Over';
    clearInterval(timer);
  }
}

function resetTimer() {
  clearInterval(timer);
  timeLeft = 3;
  document.getElementById('timer').innerText = `⏳ ${timeLeft}`;
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById('timer').innerText = `⏳ ${timeLeft}`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      document.getElementById('status').innerText = '⏰ Time's up! Game Over';
    }
  }, 1000);
}

document.getElementById('restart').onclick = () => {
  document.getElementById('status').innerText = '';
  generateQuestion();
};

generateQuestion();