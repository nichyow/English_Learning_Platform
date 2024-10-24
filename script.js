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