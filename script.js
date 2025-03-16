// Qustion of the Quiz Which will displayed
const quizQuestions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Hyper Transfer Markup Language",
            "Hyperlink Text Modern Language"
        ],
        correctAnswer: 0
    },
    {
        question: "Which CSS property is used to change the text color?",
        options: [
            "text-color",
            "color",
            "font-color",
            "text-style"
        ],
        correctAnswer: 1
    },
    {
        question: "Which of the following is NOT a JavaScript data type?",
        options: [
            "Object",
            "Boolean",
            "String",
            "Float"
        ],
        correctAnswer: 3
    },
    {
        question: "What is Bootstrap primarily used for?",
        options: [
            "Responsive web design",
            "Server-side programming",
            "Database management",
            "Backend development"
        ],
        correctAnswer: 0
    },
    {
        question: "Which event occurs when a user clicks on an HTML element?",
        options: [
            "onmouseover",
            "onchange",
            "onclick",
            "onmouseclick"
        ],
        correctAnswer: 2
    }
];

let C_questionIndex = 0;
let score = 0;
let optiionSelected = null;

// DOM elements
const startScreen = document.getElementById('start-screen');
const questionsScreen = document.getElementById('questions-screen');
const resultsScreen = document.getElementById('results-screen');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const playAgainBtn = document.getElementById('play-again-btn');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const questionProgress = document.getElementById('question-progress');
const currentScoreDisplay = document.getElementById('current-score');
const finalScore = document.getElementById('final-score');
const scorePercent = document.querySelector('.score-percent');
const answersList = document.getElementById('answers-list');

// Quiz Emplementation
startBtn.addEventListener('click', () => {
    startScreen.style.display = 'none';
    questionsScreen.style.display = 'block';
    loadQuestion();
});

function loadQuestion() {
    const currentQuestion = quizQuestions[C_questionIndex];
    questionText.textContent = currentQuestion.question;
    optionsContainer.innerHTML = '';
    currentScoreDisplay.textContent = score;

    questionProgress.textContent = `${C_questionIndex + 1} of ${quizQuestions.length}`;

    currentQuestion.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.classList.add('option-button', 'btn');
        btn.textContent = option;
        btn.addEventListener('click', () => selectOption(btn, index));
        optionsContainer.appendChild(btn);
    });

    optiionSelected = null;
}

// Function for slecting option for quiz
function selectOption(button, index) {
    const optionButtons = document.querySelectorAll('.option-button');
    optionButtons.forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
    optiionSelected = index;
}

nextBtn.addEventListener('click', () => {
    if (optiionSelected === null) return alert('Please select an option!');

    const currentQuestion = quizQuestions[C_questionIndex];

    const optionButtons = document.querySelectorAll('.option-button');
    if (optiionSelected === currentQuestion.correctAnswer) {
        optionButtons[optiionSelected].classList.add('correct');
        score++;
    } else {
        optionButtons[optiionSelected].classList.add('incorrect');
        optionButtons[currentQuestion.correctAnswer].classList.add('correct');
    }

    setTimeout(() => {
        C_questionIndex++;
        if (C_questionIndex < quizQuestions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }, 500);
});

// function showing Final Result
function showResults() {
    questionsScreen.style.display = 'none';
    resultsScreen.style.display = 'block';

    finalScore.textContent = `${score}/${quizQuestions.length}`;
    const percent = Math.round((score / quizQuestions.length) * 100);
    scorePercent.textContent = `${percent}%`;
    // document.querySelector('.progress').style.background = `conic-gradient(#3498db ${percent}%, #ddd ${percent}% 100%)`;


    answersList.innerHTML = '';
    quizQuestions.forEach((q, idx) => {
        const div = document.createElement('div');
        div.classList.add('answer-item');
        div.innerHTML = `
            <strong>Q${idx + 1}: ${q.question}</strong><br>
            Correct Answer: <span class="correct">${q.options[q.correctAnswer]}</span>
        `;
        answersList.appendChild(div);
    });
}

// PlayAgain Buttons
playAgainBtn.addEventListener('click', () => {
    C_questionIndex = 0;
    score = 0;
    optiionSelected = null;
    resultsScreen.style.display = 'none';
    startScreen.style.display = 'block';
});
