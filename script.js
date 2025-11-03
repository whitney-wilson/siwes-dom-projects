// --- Counter App by Ogbu Ijeoma Whitney ---
// Select elements
const counterDisplay = document.getElementById('count');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const resetBtn = document.getElementById('reset');

// Initialize count
let count = 0;

// Functions
function updateDisplay() {
    counterDisplay.textContent = count;
}

increaseBtn.addEventListener("click", function() {
    count++;
    updateDisplay();
});

decreaseBtn.addEventListener("click", function() {
    count--;
    updateDisplay();
});

resetBtn.addEventListener("click", function() {
    count = 0;
    updateDisplay();
});