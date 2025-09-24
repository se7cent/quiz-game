const questions = [
  {
    q: "Ibukota Indonesia?",
    a: ["Jakarta", "Bandung", "Surabaya"],
    correct: 0
  },
  {
    q: "2 + 2 = ?",
    a: ["3", "4", "5"],
    correct: 1
  },
  {
    q: "Planet terdekat dengan matahari?",
    a: ["Merkurius", "Mars", "Venus"],
    correct: 0
  }
];

let current = 0;
let score = 0;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const resultEl = document.getElementById("result");
const restartBtn = document.getElementById("restart");

function loadQuestion() {
  if (current < questions.length) {
    const q = questions[current];
    questionEl.textContent = q.q;
    answersEl.innerHTML = "";
    q.a.forEach((ans, idx) => {
      const btn = document.createElement("button");
      btn.textContent = ans;
      btn.onclick = () => checkAnswer(idx);
      answersEl.appendChild(btn);
    });
  } else {
    showResult();
  }
}

function checkAnswer(idx) {
  if (idx === questions[current].correct) {
    score++;
  }
  current++;
  loadQuestion();
}

function showResult() {
  questionEl.textContent = "Quiz Selesai!";
  answersEl.innerHTML = "";
  resultEl.textContent = `Skor kamu: ${score} / ${questions.length}`;
  restartBtn.style.display = "inline-block";
}

restartBtn.onclick = () => {
  current = 0;
  score = 0;
  resultEl.textContent = "";
  restartBtn.style.display = "none";
  loadQuestion();
};

loadQuestion();