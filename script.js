const questionText = document.getElementById('question-text');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');
const timerElement = document.getElementById('timer');
const questionNumber = document.getElementById('question-number');

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 120;  
let timerInterval;
let isPaused = false;

const questions = [
{ question: "Chi ha vinto l’ultimo scudetto serie A", answers: [{ text: "Juve", correct: true }, { text: "Inter", correct: false }] },
{ question: "Quale pescatore cattura le carpe più grosse", answers: [{ text: "Erik", correct: true }, { text: "Flipper", correct: false }] },
{ question: "Chi è il giocatore piu dominante", answers: [{ text: "Polonara", correct: true }, { text: "Gallinari", correct: false }] },
{ question: "Dopo 4 gin tonic a Ferragosto a quale percentuale stai", answers: [{ text: "90%", correct: true }, { text: "20%", correct: false }] },
{ question: "Quale è la tua altezza", answers: [{ text: "2 cm in meno di bes", correct: true }, { text: "1.90", correct: false }] },
{ question: "Quale mangi come carpaccio", answers: [{ text: "Maionese", correct: true }, { text: "Salame", correct: false }] },
{ question: "Quale spiaggia è la migliore", answers: [{ text: "Polinesia", correct: true }, { text: "Isola della Maddalena", correct: false }] },
{ question: "Quale cane è il più rompicoglioni", answers: [{ text: "Gaia", correct: true }, { text: "Noel", correct: false }] },
{ question: "Qual’è il centrocampista più forte", answers: [{ text: "Barella", correct: true }, { text: "Koopmainers", correct: false }] },
{ question: "Chi beve di più in serata", answers: [{ text: "Bacchi", correct: true }, { text: "Bes", correct: false }] },
{ question: "Chi ha il culo più bello", answers: [{ text: "Nicole Farinelli", correct: true }, { text: "Valentina Gelli", correct: false }] },
{ question: "Quale indumento usi in serata", answers: [{ text: "Camicia", correct: true }, { text: "Polo blu", correct: false }] },
{ question: "Quale hai dovuto ripagare", answers: [{ text: "Tandem", correct: true }, { text: "Bicicletta", correct: false }] },
{ question: "Il marketing strategico è un processo orientato", answers: [{ text: "All’azione", correct: true }, { text: "All’analisi", correct: false }] },
{ question: "L’obiettivo strategico di Markenting è", answers: [{ text: "Consolidamento", correct: true }, { text: "Costruzione", correct: false }] },
{ question: "Quale ti si alza per primo?", answers: [{ text: "Cazzo", correct: true }, { text: "Sopracciglio", correct: false }] },
{ question: "Chi é stato il tuo primo amore?", answers: [{ text: "Laura", correct: true }, { text: "Alexia", correct: false }] },
{ question: "Quali erano gli ingredienti del barababacchi?", answers: [{ text: "Gin, Succo Arancia", correct: true }, { text: "Vodka Liscia, Succo Arancia", correct: false }] },
{ question: "Quale ê la tua frase preferita?", answers: [{ text: "Bella Giocata", correct: true }, { text: "Bella Chiamata", correct: false }] },
{ question: "Quale é il bacchi perfetto?", answers: [{ text: "Demone", correct: true }, { text: "Demonio", correct: false }] }

];
function startGame() {
  currentQuestionIndex = 0;
  score = 0;
  timeLeft = 120;
  nextButton.style.display = 'none';
  startTimer();
  showQuestion();
}
function startTimer() {
clearInterval(timerInterval);  // Ferma il timer corrente, se attivo
timerElement.innerText = formatTime(timeLeft);
timerInterval = setInterval(() => {
  if (timeLeft > 0 && !isPaused) {
    timeLeft--;
    timerElement.innerText = formatTime(timeLeft);
  } else if (timeLeft <= 0) {
    clearInterval(timerInterval);
    alert("Tempo scaduto! Il gioco si riavvierà.");
    startGame();
  }
}, 1000);
}


function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionNumber.innerText = `Domanda ${currentQuestionIndex + 1}`;
  questionText.innerText = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    button.classList.add(answer.correct ? 'btn-sì' : 'btn-no');  // Colore fisso: verde per 'Sì' e rosso per 'No'
    button.addEventListener('click', () => selectAnswer(button, answer.correct));
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = 'none';
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(button, correct) {
if (correct) {
button.classList.add('correct');
score++;
setTimeout(showNextQuestion, 200); // Passa alla domanda successiva dopo 0.5 secondi
} else {
button.classList.add('wrong');
currentQuestionIndex = 0; // Riporta l’indice della domanda a 0 (prima domanda)
score = 0; // Resetta il punteggio (opzionale)
showQuestion(); // Mostra la prima domanda
}
}

function showNextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    questionText.innerText = `Quiz finito! Hai totalizzato ${score} punti.`;
    nextButton.innerText = 'Ricomincia';
    nextButton.style.display = 'block';
    nextButton.addEventListener('click', () => {
      clearInterval(timerInterval);
      startGame();
    });
  }
}

nextButton.addEventListener('click', showNextQuestion);
startGame();



