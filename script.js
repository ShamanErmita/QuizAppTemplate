const question = document.querySelector(".question");
const answers = document.querySelector(".answers");
const spnQtd = document.querySelector(".spnQtd");
const textFinish = document.querySelector(".finish span");
const content = document.querySelector(".content");
const contentFinish = document.querySelector(".finish");
const btnRestart = document.querySelector(".finish button");

import questions from "./questions.js";

let currentIndex = 0;
let questionsCorrect = 0;

btnRestart.onclick = () => {
  content.style.display = "flex";
  contentFinish.style.display = "none";

  questions.forEach((q) => (q.used = false));

  currentIndex = 0;
  questionsCorrect = 0;
  loadQuestion();
};

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function nextQuestion(e) {
  const selectedButton = e.target;

  if (selectedButton.getAttribute("data-correct") === "true") {
    selectedButton.style.backgroundColor = "green";
    questionsCorrect++;
  } else {
    selectedButton.style.backgroundColor = "red";
  }

  document.querySelectorAll(".answer").forEach((item) => {
    item.removeEventListener("click", nextQuestion);
  });

  setTimeout(() => {
    if (currentIndex < questions.length - 1) {
      currentIndex++;
      loadQuestion();
    } else {
      finish();
    }
  }, 1500);
}

function finish() {
  textFinish.innerHTML = `Você acertou ${questionsCorrect} de ${questions.length}`;
  content.style.display = "none";
  contentFinish.style.display = "flex";
}

function loadQuestion() {
  spnQtd.innerHTML = `${currentIndex + 1}/${questions.length}`;
  const unusedQuestions = questions.filter((q) => !q.used);

  if (unusedQuestions.length != 0) {
    const randomIndex = Math.floor(Math.random() * unusedQuestions.length);
    const item = unusedQuestions[randomIndex];
    item.used = true;

    answers.innerHTML = "";
    question.innerHTML = item.question;

    item.answers.forEach((answer) => {
      const div = document.createElement("div");

      div.innerHTML = `
      <button class="answer" data-correct="${answer.correct}">
        ${answer.option}
      </button>
      `;

      answers.appendChild(div);
    });

    document.querySelectorAll(".answer").forEach((item) => {
      item.addEventListener("click", nextQuestion);
    });
  }
}

loadQuestion();