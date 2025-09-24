let score = 0;
let timer;
let timeLeft = 3;
let currentCorrect;

function generateQuestion() {
  const difficulty = Math.random();
  let a, b;
  if(difficulty < 0.4){ a = Math.floor(Math.random()*10)+1; b = Math.floor(Math.random()*10)+1; }
  else if(difficulty < 0.8){ a = Math.floor(Math.random()*20)+10; b = Math.floor(Math.random()*20)+1; }
  else { a = Math.floor(Math.random()*31)+20; b = Math.floor(Math.random()*41)+10; }

  currentCorrect = a * b;
  document.getElementById("question").innerText = `❓ What is ${a} × ${b} ?`;

  let options = new Set([currentCorrect]);
  while(options.size < 4){
    options.add(currentCorrect + Math.floor(Math.random()*10)-5);
  }
  const optionsArray = Array.from(options).sort(()=>Math.random()-0.5);

  let html = "";
  optionsArray.forEach(opt => {
    html += `<button onclick="checkAnswer(${opt})">${opt}</button>`;
  });
  document.getElementById("options").innerHTML = html;
  document.getElementById("message").innerText = "";
  document.getElementById("actions").innerHTML = "";
  document.getElementById("score").innerText = `Score: ${score}`;

  startTimer();
}

function startTimer(){
  clearInterval(timer);
  timeLeft=3;
  document.getElementById("timer").innerText = `⏱️ ${timeLeft}`;
  timer = setInterval(()=>{
    timeLeft--;
    document.getElementById("timer").innerText = `⏱️ ${timeLeft}`;
    if(timeLeft<=0){
      clearInterval(timer);
      gameOver("⏰ Time's up!");
    }
  },1000);
}

function checkAnswer(answer){
  clearInterval(timer);
  if(answer===currentCorrect){
    score++;
    document.getElementById("message").innerText = `✅ Correct! Score: ${score}`;
    setTimeout(generateQuestion, 500);
  } else {
    gameOver("❌ Wrong!");
  }
}

function gameOver(reason){
  document.getElementById("message").innerText = `${reason} | Final Score: ${score}`;
  document.getElementById("options").innerHTML = "";
  document.getElementById("timer").innerText = "";
  document.getElementById("actions").innerHTML = `
    <button onclick="generateQuestion();">▶ Play Again (Free)</button>
    <button>⏸ Take a 1-min Break ($0.01)</button>
    <button>⏭ Skip Question ($0.02)</button>
    <button>🔄 Second Chance ($0.05)</button>
  `;
}

generateQuestion();
