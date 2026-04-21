// Dark Mode (Do not delete this!)
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