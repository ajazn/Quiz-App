// quiz.js

// Example questions (replace or expand as needed)
const QUESTIONS = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "London", "Paris", "Madrid"],
    answer: 2,
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: 1,
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: ["Harper Lee", "Mark Twain", "J.K. Rowling", "Jane Austen"],
    answer: 0,
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    answer: 3,
  },
  {
    question: "What is the chemical symbol for gold?",
    options: ["Au", "Ag", "Gd", "Go"],
    answer: 0,
  },
  {
    question: "How many continents are there?",
    options: ["5", "6", "7", "8"],
    answer: 2,
  },
  {
    question: "Who painted the Mona Lisa?",
    options: [
      "Vincent Van Gogh",
      "Pablo Picasso",
      "Leonardo da Vinci",
      "Claude Monet",
    ],
    answer: 2,
  },
  {
    question: "What is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    answer: 2,
  },
  {
    question: "Which language is used for web apps?",
    options: ["PHP", "Python", "JavaScript", "All"],
    answer: 3,
  },
  {
    question: "What year did World War II end?",
    options: ["1942", "1945", "1948", "1950"],
    answer: 1,
  },
  {
    question: "What is the boiling point of water? (°C)",
    options: ["90", "100", "110", "120"],
    answer: 1,
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    answer: 2,
  },
];

let quizQuestions = [];
let userAnswers = Array(10).fill(null);
let submitted = false;
let currentQuestion = 0;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function generateQuiz() {
  quizQuestions = [...QUESTIONS];
  shuffle(quizQuestions);
  quizQuestions = quizQuestions.slice(0, 10);
  userAnswers = Array(10).fill(null);
  submitted = false;
  currentQuestion = 0; // Reset question index
  document.getElementById("result").textContent = "";
  document.getElementById("restart-btn").style.display = "none";
  document.getElementById("submit-btn").style.display = "none";
  renderQuiz();
}

function renderQuiz() {
  const form = document.getElementById("quiz-form");
  form.innerHTML = "";
  if (submitted) {
    form.innerHTML = "";
    return;
  }
  const q = quizQuestions[currentQuestion];
  const idx = currentQuestion;
  if (!q) return;

  const qDiv = document.createElement("div");
  qDiv.className = "question";

  const qTitle = document.createElement("div");
  qTitle.textContent = `${idx + 1}. ${q.question}`;
  qDiv.appendChild(qTitle);

  const optionsDiv = document.createElement("div");
  optionsDiv.className = "options";
  q.options.forEach((opt, oidx) => {
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "radio";
    input.name = `q${idx}`;
    input.value = oidx;
    input.checked = userAnswers[idx] == oidx;
    input.addEventListener("change", () => {
      userAnswers[idx] = oidx;
      // Re-render to enable the 'Next' button
      renderQuiz();
    });
    label.appendChild(input);
    label.appendChild(document.createTextNode(opt));
    optionsDiv.appendChild(label);
  });
  qDiv.appendChild(optionsDiv);
  form.appendChild(qDiv);

  // Navigation and Submit buttons
  const navDiv = document.createElement("div");
  navDiv.className = "nav-actions";
  navDiv.style.textAlign = "center";
  navDiv.style.marginTop = "18px";

  if (idx > 0) {
    const prevBtn = document.createElement("button");
    prevBtn.type = "button";
    prevBtn.textContent = "Previous";
    prevBtn.onclick = function () {
      currentQuestion--;
      renderQuiz();
    };
    navDiv.appendChild(prevBtn);
  }

  const nextBtn = document.createElement("button");
  nextBtn.type = "button";
  nextBtn.style.marginLeft = "10px";
  if (idx === quizQuestions.length - 1) {
    nextBtn.textContent = "Submit Quiz";
    nextBtn.onclick = function () {
      if (userAnswers[idx] === null) return;
      document.getElementById("submit-btn").click();
    };
  } else {
    nextBtn.textContent = "Next";
    nextBtn.onclick = function () {
      if (userAnswers[idx] === null) return;
      currentQuestion++;
      renderQuiz();
    };
  }
  nextBtn.disabled = userAnswers[idx] === null;
  navDiv.appendChild(nextBtn);
  form.appendChild(navDiv);
}

document.getElementById("submit-btn").addEventListener("click", function (e) {
  e.preventDefault();
  if (submitted) return;
  submitted = true;
  let score = 0;
  quizQuestions.forEach((q, idx) => {
    if (userAnswers[idx] == q.answer) score++;
  });
  document.getElementById(
    "result"
  ).textContent = `You scored ${score} out of ${quizQuestions.length}.`;
  document.getElementById("submit-btn").style.display = "none";
  document.getElementById("restart-btn").style.display = "inline-block";
  renderQuiz();
});

document.getElementById("restart-btn").addEventListener("click", function (e) {
  e.preventDefault();
  generateQuiz();
});

generateQuiz();
