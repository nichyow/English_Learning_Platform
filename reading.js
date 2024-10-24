const ieltsReadingData = {
    passage: `The importance of reading cannot be overstated. It is a skill that opens doors to knowledge and 
    allows individuals to explore the world through words. In recent studies, researchers have found that 
    reading not only improves vocabulary but also enhances critical thinking. Through the process of reading, 
    one can gain a deeper understanding of different cultures and historical contexts. In a world dominated 
    by digital media, the significance of traditional reading habits continues to be emphasized.`,
    
    questions: [
        {
            question: "1. What does reading improve, according to recent studies?",
            answer: "vocabulary"
        },
        {
            question: "2. How does reading help individuals understand the world?",
            answer: "deeper understanding of different cultures"
        }
    ]
};

function renderReading() {
    const passageElement = document.querySelector('.reading-text p');
    passageElement.textContent = ieltsReadingData.passage;

    const questionSection = document.getElementById('reading-form');
    questionSection.innerHTML = '';

    ieltsReadingData.questions.forEach((item, index) => {
        const questionHtml = `
            <p>${item.question}</p>
            <input type="text" id="answer${index + 1}">
        `;
        questionSection.innerHTML += questionHtml;
    });

    questionSection.innerHTML += `<button type="button" id="submit-button">Submit</button>`;
    document.getElementById('submit-button').addEventListener('click', checkIELTSReading);
}

function checkIELTSReading() {
    let correctAnswers = 0;
    const feedback = document.getElementById('reading-feedback');
    const totalQuestions = ieltsReadingData.questions.length;

    ieltsReadingData.questions.forEach((item, index) => {
        const userAnswer = document.getElementById(`answer${index + 1}`).value.toLowerCase();
        if (userAnswer.includes(item.answer.toLowerCase())) {
            correctAnswers++;
        }
    });

    if (correctAnswers === totalQuestions) {
        renderResults(correctAnswers);  
    } else {
        feedback.textContent = `You answered ${correctAnswers}/${totalQuestions} questions correctly. Please review your answers and try again.`;
        feedback.style.color = 'red';
    }
}


function renderResults(correctAnswers) {
    const feedback = document.getElementById('reading-feedback');
    const formSection = document.getElementById('reading-form');
    const passageSection = document.querySelector('.reading-text');

    formSection.style.display = 'none';
    passageSection.style.display = 'none';

    feedback.style.color = 'black';
    feedback.innerHTML = `
        <h3>Quiz Complete!</h3>
        <p>You answered ${correctAnswers}/${ieltsReadingData.questions.length} questions correctly.</p>
        <button onclick="restartReading()">Restart</button>
    `;
}


function restartReading() {
    const feedback = document.getElementById('reading-feedback');
    const formSection = document.getElementById('reading-form');
    const passageSection = document.querySelector('.reading-text');

    
    feedback.innerHTML = '';
    formSection.style.display = 'block';
    passageSection.style.display = 'block';

    renderReading(); 
}

renderReading();

function goBackToMenu() {
    window.location.href = 'index.html'; 
}
