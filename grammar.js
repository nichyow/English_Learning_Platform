const quizData = [
    {
        question: "What is the correct form of the verb in this sentence: She _____ to the store yesterday.",
        options: ["goes", "went", "going"],
        correctAnswer: 1
    },
    // {
    //     question: "Which preposition fits in the blank? He arrived _____ the airport on time.",
    //     options: ["in", "at", "on"],
    //     correctAnswer: 1
    // },
    // {
    //     question: "Choose the correct word: The lecture _____ at 9:00 AM every Monday.",
    //     options: ["begins", "begin", "beginning"],
    //     correctAnswer: 0
    // },
    // {
    //     question: "Select the correct article: He is _____ engineer.",
    //     options: ["the", "a", "an"],
    //     correctAnswer: 2
    // },
    // {
    //     question: "Complete the sentence: They have been _____ English for two years.",
    //     options: ["learned", "learning", "learn"],
    //     correctAnswer: 1
    // },
    // {
    //     question: "Choose the correct verb form: By the time he arrived, the class _____.",
    //     options: ["had started", "has started", "started"],
    //     correctAnswer: 0
    // },
    // {
    //     question: "Select the correct conjunction: I will stay here _____ you come back.",
    //     options: ["until", "because", "before"],
    //     correctAnswer: 0
    // },
    // {
    //     question: "Choose the correct tense: She _____ her homework when I called.",
    //     options: ["does", "is doing", "was doing"],
    //     correctAnswer: 2
    // },
    // {
    //     question: "Pick the correct pronoun: Everyone must bring _____ own lunch.",
    //     options: ["their", "his", "her"],
    //     correctAnswer: 0
    // },
    // {
    //     question: "Select the correct form: He wishes he _____ more time to study.",
    //     options: ["has", "had", "have"],
    //     correctAnswer: 1
    // },
    // {
    //     question: "Choose the correct word: This is the most _____ subject I have ever studied.",
    //     options: ["excited", "exciting", "excitement"],
    //     correctAnswer: 1
    // },
    // {
    //     question: "Pick the correct phrase: He _____ finished the project by next week.",
    //     options: ["will have", "would have", "will"],
    //     correctAnswer: 0
    // },
    // {
    //     question: "Complete the sentence: If I _____ you, I would accept the offer.",
    //     options: ["am", "was", "were"],
    //     correctAnswer: 2
    // },
    // {
    //     question: "Pick the correct form: They have _____ for hours.",
    //     options: ["wait", "waiting", "waited"],
    //     correctAnswer: 2
    // },
    // {
    //     question: "Choose the correct verb: The professor suggested that the student _____ more research.",
    //     options: ["do", "does", "did"],
    //     correctAnswer: 0
    // },
];

let currentQuestion = 0;
let score = 0;
const quizContainer = document.querySelector('.quiz-container');
const quizContent = document.getElementById('quiz-content');
const nextButton = document.getElementById('next');

// Initialize total questions display
document.getElementById('total').textContent = quizData.length;

// Function to render a question
function renderQuestion(questionIndex) {
    const question = quizData[questionIndex];
    
    let html = `
        <h3>${question.question}</h3>
        <div class="options">
    `;

    question.options.forEach((option, index) => {
        html += `
            <label class="option">
                <input type="radio" name="quiz" value="${index}">
                ${option}
            </label>
        `;
    });

    html += '</div>';
    quizContent.innerHTML = html;
}

// Function to render results
function renderResults() {
    document.querySelector('h1').style.display = 'none';
    quizContent.innerHTML = `
        <div class="results">
            <h2>Quiz Complete!</h2>
            <div class="score">You answered ${score}/${quizData.length} questions correctly</div>
            <button class="play-again" onclick="restartQuiz()">Restart Quiz</button>
        </div>
    `;
    nextButton.style.display = 'none'; // Hide the next button when quiz ends
    document.querySelector('.progress').style.display = 'none';
}

// Function to check answer and move to next question
function nextQuestion() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    
    // Validate answer selection
    if (!selectedOption && currentQuestion < quizData.length) {
        alert('Please select an answer');
        return;
    }

    // Check answer and update score
    if (selectedOption && parseInt(selectedOption.value) === quizData[currentQuestion].correctAnswer) {
        score++;
    }

    currentQuestion++;

    // Update progress or show results
    if (currentQuestion < quizData.length) {
        document.getElementById('current').textContent = currentQuestion + 1;
        renderQuestion(currentQuestion);
        
        // Update button text on last question
        if (currentQuestion === quizData.length - 1) {
            nextButton.textContent = 'Finish';
        }
    } else {
        renderResults();
    }
}
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.querySelector('h1').style.display = 'block';
    document.getElementById('current').textContent = 1;
    document.querySelector('.progress').style.display = 'block';
    nextButton.style.display = 'block';
    nextButton.textContent = 'Next';
    renderQuestion(currentQuestion);
}
function goBackToMenu() {
    window.location.href = 'index.html'; // Redirect to the main menu page
}


// Initialize first question
renderQuestion(0);
