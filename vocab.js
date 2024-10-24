const vocabData = [
    { word: "Aberration", definition: "A departure from what is normal or expected", wordId: "word1", defId: "def1" },
    { word: "Abdicate", definition: "To renounce a throne, right, power, or responsibility", wordId: "word2", defId: "def2" },
    { word: "Cacophony", definition: "A harsh, discordant mixture of sounds", wordId: "word3", defId: "def3" },
    { word: "Capitulate", definition: "To surrender or give in", wordId: "word4", defId: "def4" },
    { word: "Debilitate", definition: "To make someone weak or infirm", wordId: "word5", defId: "def5" },
    { word: "Enervate", definition: "To cause someone to feel drained of energy or vitality", wordId: "word6", defId: "def6" },
    { word: "Furtive", definition: "Attempting to avoid notice or attention", wordId: "word7", defId: "def7" },
    { word: "Garrulous", definition: "Excessively talkative, especially on trivial matters", wordId: "word8", defId: "def8" },
    { word: "Ineffable", definition: "Too great or extreme to be expressed in words", wordId: "word9", defId: "def9" },
    { word: "Lugubrious", definition: "Looking or sounding sad and dismal", wordId: "word10", defId: "def10" },
    { word: "Mendacious", definition: "Not telling the truth; lying", wordId: "word11", defId: "def11" },
    { word: "Nefarious", definition: "Wicked or criminal", wordId: "word12", defId: "def12" },
    { word: "Obfuscate", definition: "To render obscure, unclear, or unintelligible", wordId: "word13", defId: "def13" },
    { word: "Parsimony", definition: "Extreme unwillingness to spend money or use resources", wordId: "word14", defId: "def14" },
    { word: "Quixotic", definition: "Exceedingly idealistic; unrealistic and impractical", wordId: "word15", defId: "def15" },
    { word: "Recalcitrant", definition: "Having an obstinately uncooperative attitude", wordId: "word16", defId: "def16" },
    { word: "Sycophant", definition: "A person who acts obsequiously toward someone important", wordId: "word17", defId: "def17" },
    { word: "Taciturn", definition: "Reserved or uncommunicative in speech", wordId: "word18", defId: "def18" },
    { word: "Ubiquitous", definition: "Present, appearing, or found everywhere", wordId: "word19", defId: "def19" },
    { word: "Voracious", definition: "Wanting or devouring great quantities of food", wordId: "word20", defId: "def20" }
];

let selectedVocab = [];
let score = 0;

const vocabContainer = document.getElementById('vocab-container');

// Function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to render 10 random vocab words and definitions at once
function renderVocab() {
    score = 0; // Reset score when the game is restarted
    selectedVocab = [...vocabData]; // Clone the vocabData array
    shuffleArray(selectedVocab); // Shuffle the array
    selectedVocab = selectedVocab.slice(0, 10); // Select the first 10 items from the shuffled array

    let upperHtml = `<div class="words">`;
    let upperDefsHtml = `<div class="definitions">`;

    let lowerHtml = `<div class="words">`;
    let lowerDefsHtml = `<div class="definitions">`;

    // Render first 5 words and definitions in the upper container
    selectedVocab.slice(0, 5).forEach(vocab => {
        upperHtml += `
            <p draggable="true" ondragstart="drag(event)" id="${vocab.wordId}">${vocab.word}</p>
        `;
        upperDefsHtml += `
            <div class="definition-item">
                <div id="${vocab.defId}" ondrop="drop(event)" ondragover="allowDrop(event)" class="drop-box"></div>
                <p class="definition-text">${vocab.definition}</p>
            </div>
        `;
    });

    // Render the remaining 5 words and definitions in the lower container
    selectedVocab.slice(5).forEach(vocab => {
        lowerHtml += `
            <p draggable="true" ondragstart="drag(event)" id="${vocab.wordId}">${vocab.word}</p>
        `;
        lowerDefsHtml += `
            <div class="definition-item">
                <div id="${vocab.defId}" ondrop="drop(event)" ondragover="allowDrop(event)" class="drop-box"></div>
                <p class="definition-text">${vocab.definition}</p>
            </div>
        `;
    });

    upperHtml += `</div>`;
    upperDefsHtml += `</div>`;
    
    lowerHtml += `</div>`;
    lowerDefsHtml += `</div>`;
    
    // Insert HTML into upper and lower containers
    vocabContainer.innerHTML = `
        <div id="upper-container">
            ${upperHtml}
            ${upperDefsHtml}
        </div>
        <div id="lower-container">
            ${lowerHtml}
            ${lowerDefsHtml}
        </div>
    `;
}

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const draggedElement = document.getElementById(data);
    const dropTarget = event.target;

    if (dropTarget.style.backgroundColor === "lightgreen") {
        return;
    }

    // Check if the answer is correct
    const vocab = selectedVocab.find(v => v.wordId === data);
    if (vocab && dropTarget.id === vocab.defId) {
        dropTarget.appendChild(draggedElement);
        dropTarget.style.backgroundColor = "lightgreen";
        score++;
        
        // Check if game is complete
        if (score === selectedVocab.length) {
            setTimeout(renderResults, 500);
        }
    } else {
        dropTarget.style.backgroundColor = "lightcoral";
        setTimeout(() => dropTarget.style.backgroundColor = "", 500);
    }
}

function renderResults() {
    document.querySelector('h1').style.display = 'none';
    const vocabContainer = document.getElementById('vocab-container');
    vocabContainer.innerHTML = `
        <div class="results">
            <h2>Game Complete!</h2>
            <!-- Play Again button -->
            <div class="back-button">
                <button id="play-again" onclick="restartGame()">Play Again</button>
            </div>
        </div>
    `;
}


function restartGame() {
    score = 0;
    renderVocab();
    document.querySelector('h1').style.display = ''; // Restart the game
}

// Initialize game
renderVocab();
function goBackToMenu() {
    window.location.href = 'index.html'; 
}