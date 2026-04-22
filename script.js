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
const divide = (a, b) => (b === 0 ? "Nice try, Einstein" : a / b);

function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);
  switch (operator) {
    case "+": return add(a, b);
    case "-": return subtract(a, b);
    case "*": return multiply(a, b);
    case "/": return divide(a, b);
    default: return null;
  }
}

function updateDisplay() {
  let fullExpression = firstNumber;
  if (currentOperator) fullExpression += currentOperator; // Senza spazi " "
  if (secondNumber) fullExpression += secondNumber;

  expressionDiv.textContent = fullExpression || "0";

  // Scroll to end for long expressions
  expressionDiv.scrollLeft = expressionDiv.scrollWidth;
}

function clear() {
  firstNumber = "";
  secondNumber = "";
  currentOperator = null;
  resultDiv.textContent = "";
  updateDisplay();
}

function handleNumber(num) {
  if (shouldResetDisplay) {
    firstNumber = num;
    shouldResetDisplay = false;
  } else if (!currentOperator) {
    firstNumber += num;
  } else {
    secondNumber += num;
  }
  updateDisplay();
}

function handleOperator(op) {
  if (firstNumber && currentOperator && secondNumber) {
    evaluate();
  }

  if (firstNumber !== "") {
    currentOperator = op;
    shouldResetDisplay = false;
    updateDisplay();
  }
}

function evaluate() {
  if (!firstNumber || !currentOperator || !secondNumber) return;

  const solution = operate(currentOperator, firstNumber, secondNumber);

  if (solution === "Nice try, Einstein") {
    resultDiv.textContent = solution;
    firstNumber = "";
  } else {
    firstNumber = Math.round(solution * 1000) / 1000;
    resultDiv.textContent = firstNumber;
  }

  secondNumber = "";
  currentOperator = null;
  shouldResetDisplay = true;
  updateDisplay();
}

function handleDecimal() {
  if (shouldResetDisplay) {
    firstNumber = "0.";
    shouldResetDisplay = false;
    return;
  }
  // Multiple decimals
  if (!currentOperator && !firstNumber.includes(".")) firstNumber += ".";
  else if (currentOperator && !secondNumber.includes(".")) secondNumber += ".";
  updateDisplay();
}

function backspace() {
  if (secondNumber) secondNumber = secondNumber.slice(0, -1);
  else if (currentOperator) currentOperator = null;
  else if (firstNumber) firstNumber = firstNumber.toString().slice(0, -1);
  updateDisplay();
}

inputBox.addEventListener("click", (e) => {
  const target = e.target;
  if (!target.classList.contains("btn")) return;

  const action = target.dataset.action;
  const value = target.dataset.value;

  if (action === "number") handleNumber(value);
  if (["addition", "subtraction", "multiplication", "division"].includes(action)) handleOperator(value);
  if (action === "submit") evaluate();
  if (action === "clear") clear();
  if (action === "decimal") handleDecimal();
  if (action === "backspace") backspace();
});

document.addEventListener("keydown", (e) => {
  if (e.key >= 0 && e.key <= 9) handleNumber(e.key);
  if (["+", "-", "*", "/"].includes(e.key)) handleOperator(e.key);
  if (e.key === "Enter" || e.key === "=") evaluate();
  if (e.key === "Backspace") backspace();
  if (e.key === "Escape") clear();
  if (e.key === "." || e.key === ",") handleDecimal();
});