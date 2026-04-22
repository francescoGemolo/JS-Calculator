// Dark Mode (I'm Francesco, do not delete this!)
const container = document.querySelector(".dark-mode");
const iconOn = document.querySelector(".hgi-idea");
const iconOff = document.querySelector(".hgi-lightbulb-off");

container.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
  iconOn.classList.toggle("hidden");
  iconOff.classList.toggle("hidden");
});

// Calculator
let firstNumber = "";
let secondNumber = "";
let currentOperator = null;
let shouldResetDisplay = false;

const expressionDiv = document.getElementById("expression");
const resultDiv = document.getElementById("result");
const inputBox = document.getElementById("input");

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => (b === 0 ? "Really?" : a / b);