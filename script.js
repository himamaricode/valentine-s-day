// Quiz data
const quizData = [
  {
    question: "What is my favourite color?",
    options: [
      { text: "a) Black", color: "black" },
      { text: "b) Lilac", color: "violet" },
      { text: "c) Dark green", color: "darkgreen" },
      { text: "d) Red", color: "red" }
    ],
    answer: "c) Dark green"
  },
  {
    question: "What is the color of my eyes?",
    options: ["a) Brown", "b) Dark black", "c) Hazel"],
    answer: "a) Brown"
  },
  {
    question: "What type of chocolate is my favourite?",
    options: ["a) Milk chocolate", "b) White chocolate", "c) Dark chocolate", "d) Caramel chocolate"],
    answer: "c) Dark chocolate"
  },
  {
    question: "What I'm afraid of?",
    options: ["a) Insects", "b) Disha", "c) Both a and d", "d) You"],
    answer: "c) Both a and d"
  },
  {
    question: "I have allergy from what?",
    options: ["a) Perfume", "b) Dust", "c) Pollen", "d) Smoke"],
    answer: "a) Perfume"
  }
];

// State
let currentQuestion = 0;
let score = 0;
let responses = []; // selected option text per question
let valentineAnswer = ""; // final Yes/No

// Navigation
function showQuizIntro() {
  hideAll();
  document.getElementById("quizIntro").classList.remove("hidden");
}

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  responses = [];
  valentineAnswer = "";
  hideAll();
  document.getElementById("quiz").classList.remove("hidden");
  loadQuestion();
}

function showLetter() {
  hideAll();
  document.getElementById("letterPage").classList.remove("hidden");
  document.getElementById("letterText").innerText = getLoveLetter();
}

function showValentinePage() {
  hideAll();
  document.getElementById("valentinePage").classList.remove("hidden");
}

function showThankYouPage() {
  hideAll();
  document.getElementById("thankYouPage").classList.remove("hidden");
}

function hideAll() {
  ["welcome", "quizIntro", "quiz", "resultPage", "letterPage", "valentinePage", "thankYouPage"].forEach(id =>
    document.getElementById(id).classList.add("hidden")
  );
}

// Initial page load
document.addEventListener("DOMContentLoaded", () => {
  try {
    const audio = document.getElementById("bgMusic");
    audio.volume = 0.4; // softer ambiance
  } catch (e) {}
  hideAll();
  document.getElementById("welcome").classList.remove("hidden");
});

// Quiz mechanics
function loadQuestion() {
  const q = quizData[currentQuestion];
  document.getElementById("question").innerText = q.question;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.innerText = opt.text || opt;
    btn.className = "quiz-option";

    // Apply color if defined (for the favorite color question)
    if (opt.color) {
      btn.style.backgroundColor = opt.color;
    } else {
      // default romantic gradient fallback
      btn.style.backgroundImage = "linear-gradient(45deg, #ff758c, #ff7eb3)";
    }

    btn.onclick = () => {
      // Remove selection from other buttons
      document.querySelectorAll(".quiz-option").forEach(b => b.classList.remove("selected"));

      // Pop + highlight selected
      btn.classList.add("pop", "selected");
      setTimeout(() => btn.classList.remove("pop"), 250);

      // Record response for this question
      responses[currentQuestion] = btn.innerText;
    };

    optionsDiv.appendChild(btn);
  });
}

function nextQuestion() {
  // If no option selected, gently nudge
  if (responses[currentQuestion] == null) {
    const next = document.getElementById("nextBtn");
    next.style.transform = "scale(1.05)";
    setTimeout(() => (next.style.transform = "scale(1)"), 200);
    return;
  }

  // Update score based on selection
  const q = quizData[currentQuestion];
  if (responses[currentQuestion] === q.answer) score++;

  // Advance or show results
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    hideAll();
    document.getElementById("resultPage").classList.remove("hidden");
    document.getElementById("score").innerText = `You got ${score} out of ${quizData.length} correct 💕`;
    saveProgress();
  }
}

// Final proposal recording
function recordValentine(answer) {
  valentineAnswer = answer;
  saveProgress();
  alert(answer === "Yes" ? "You just made my heart do a happy dance! 💖" : "No worries, I cherish you anyway. 🌸");
}

// Report download (works on GitHub Pages)
function downloadReport() {
  const lines = [];

  lines.push("Valentine's Day Quiz Responses");
  lines.push("By: Himanshu");
  lines.push("Date: " + new Date().toLocaleString());
  lines.push("");

  quizData.forEach((q, i) => {
    lines.push(`Q${i + 1}: ${q.question}`);
    lines.push(`- Selected: ${responses[i] || "No selection"}`);
    lines.push(`- Correct Answer: ${q.answer}`);
    lines.push("");
  });

  lines.push(`Final Proposal Answer: ${valentineAnswer || "No response"}`);
  lines.push("");
  lines.push(`Score: ${score} / ${quizData.length}`);

  const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "valentine_responses.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// LocalStorage helpers
function saveProgress() {
  const payload = {
    timestamp: Date.now(),
    responses,
    score,
    valentineAnswer
  };
  try {
    localStorage.setItem("valentineQuiz", JSON.stringify(payload));
  } catch (e) {}
}

function resetQuiz() {
  currentQuestion = 0;
  score = 0;
  responses = [];
  valentineAnswer = "";
  saveProgress();
  hideAll();
  document.getElementById("welcome").classList.remove("hidden");
}

// Love letter content
function getLoveLetter() {
  return `
My dearest Aditi,

I don’t know the exact moment my heart decided that you were home, 
but I remember the feeling—a soft, steady warmth that made everything else quieter. 
It’s in the way you smile without trying, the way you notice tiny things no one else sees, 
and the way you make ordinary days feel like a gentle kind of magic.

I love our small moments: the half-finished conversations, the shared glances, 
the way we laugh at the same silly stories. I love the way you care, 
even when you think no one is watching. I love your courage, your kindness, your beautiful, curious mind.

When life feels heavy, you are my calm. When I’m unsure, you are my reminder to keep going. 
With you, I’ve learned that love isn’t loud or complicated—it’s patient, honest, 
and quietly certain, like the sun returning each morning.

I choose you—today and every day—for the way you make me better without asking, 
for the way you make my world softer and brighter, and for the way my heart rests when you’re near. 
Thank you for being you—unapologetically, beautifully you.

Forever yours,
Himanshu 💕
  `;
}