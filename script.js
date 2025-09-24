let score = 0;
let timer;
let timeLeft = 3;
let currentCorrect;

function generateQuestion() {
  // Dynamic difficulty
  const difficulty = Math.random();
  let a, b;
  if(difficulty < 0.4){ a = Math.floor(Math.random()*10)+1; b = Math.floor(Math.random()*10)+1; }
  else if(difficulty < 0.8){ a = Math.floor(Math.random()*20)+10; b = Math.floor(Math.random()*20)+1; }
  else { a = Math.floor(Math.random()*31)+20; b = Math.floor(Math.random()*41)+10; }

  currentCorrect = a * b;
  document.getElementById("question").innerText = `❓ Berapa ${a} × ${b} ?`;

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
  document.getElementById("score").innerText = `Skor: ${score}`;

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
      gameOver("⏰ Waktu habis!");
    }
  },1000);
}

function checkAnswer(answer){
  clearInterval(timer);
  if(answer===currentCorrect){
    score++;
    document.getElementById("message").innerText = `✅ Benar! Skor: ${score}`;
    setTimeout(generateQuestion, 500);
  } else {
    gameOver("❌ Salah!");
  }
}

function gameOver(reason){
  document.getElementById("message").innerText = `${reason} | Skor Akhir: ${score}`;
  document.getElementById("options").innerHTML = "";
  document.getElementById("timer").innerText = "";
  document.getElementById("actions").innerHTML = `
    <button onclick="generateQuestion();">▶ Main Lagi (Gratis)</button>
    <button>⏸ Istirahat 1 menit ($0.01)</button>
    <button>⏭ Skip soal ($0.02)</button>
    <button>🔄 Second chance ($0.05)</button>
  `;
}

// mulai game
generateQuestion();
