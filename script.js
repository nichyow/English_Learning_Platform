// Add event listeners to buttons to navigate to corresponding pages
document.getElementById('vocab-btn').addEventListener('click', function() {
    window.location.href = 'vocab.html';
});

document.getElementById('grammar-btn').addEventListener('click', function() {
    window.location.href = 'grammar.html';
});

document.getElementById('reading-btn').addEventListener('click', function() {
    window.location.href = 'reading.html';
});
document.getElementById('back-button').addEventListener('click', function() {
    window.location.href = 'index.html';
});
function goToVocab() {
    window.location.href = 'vocab.html'; // Redirect to the main menu page
}
function goToGrammar() {
    window.location.href = 'grammar.html'; // Redirect to the main menu page
}
function goToReading() {
    window.location.href = 'reading.html'; // Redirect to the main menu page
}
function goBackToMenu() {
    window.location.href = 'index.html'; // Redirect to the main menu page
}