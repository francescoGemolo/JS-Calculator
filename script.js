// Dark Mode
const container = document.querySelector('.dark-mode');
const iconOn = document.querySelector('.hgi-idea');
const iconOff = document.querySelector('.hgi-lightbulb-off');

container.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');

    iconOn.classList.toggle('hidden');
    iconOff.classList.toggle('hidden');
});

// Access DOM elements of the calculator
const inputBox = document.getElementById('input');
const expressionDiv = document.getElementById('expression');
const resultDiv = document.getElementById('result');

// Define expression and result variable
let expression = '';
let result = '';

// Define event handler for button clicks
function buttonClick(event) {
    const target = event.target;
    const action = target.dataset.action;
    const value = target.dataset.value;

    // Switch case to control the calculator
    switch (action) {
        case 'number':
            addValue(value);
            break;
        case 'clear':
            break;
    }

    // Update display
    updateDisplay(expression, result);
}

inputBox.addEventListener('click', buttonClick);

function addValue(value) {
    expression = expression + value;
}

function updateDisplay(expression, result) {
    expressionDiv.textContent = expression;
    resultDiv.textContent = result;
}