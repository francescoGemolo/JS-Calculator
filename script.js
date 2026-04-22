// Dark Mode (I'm Francesco, don't delete this!)
const container = document.querySelector(".icon-dark-mode");
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

function showSnarkyError() {
  const randomMsg = snarkyMessages[Math.floor(Math.random() * snarkyMessages.length)];
  resultDiv.textContent = randomMsg;
  firstNumber = "";
  currentOperator = null;
  secondNumber = "";
  expressionDiv.textContent = "0";
}

function handleOperator(op) {
  if (firstNumber !== "" && currentOperator !== null && secondNumber !== "") {
    const solution = operate(currentOperator, firstNumber, secondNumber);

    if (solution === "Really?") {
      showSnarkyError();
      return;
    }

    firstNumber = (Math.round(solution * 1000) / 1000).toString();
    secondNumber = "";
  }

  if (firstNumber !== "") {
    currentOperator = op;
    shouldResetDisplay = false;
    updateDisplay();
  }
}

function handleToggleSign() {
  if (secondNumber) {
    secondNumber = (parseFloat(secondNumber) * -1).toString();
  } else if (firstNumber) {
    firstNumber = (parseFloat(firstNumber) * -1).toString();
  }
  updateDisplay();
}

function handlePercent() {
  if (secondNumber) {
    secondNumber = (parseFloat(secondNumber) / 100).toString();
  } else if (firstNumber) {
    firstNumber = (parseFloat(firstNumber) / 100).toString();
  }
  updateDisplay();
}

const snarkyMessages = [
  "Nice try, Einstein!",
  "Black hole alert!",
  "To infinity... or not :)"
];

function evaluate() {
  if (firstNumber === "" || currentOperator === null || secondNumber === "") return;

  const solution = operate(currentOperator, firstNumber, secondNumber);

  if (solution === "Really?") {
    showSnarkyError();
  } else {
    const finalResult = (Math.round(solution * 1000) / 1000).toString();
    resultDiv.textContent = finalResult;

    firstNumber = finalResult;
    secondNumber = "";
    currentOperator = null;
    shouldResetDisplay = true;
    updateDisplay();
  }
}

function handleDecimal() {
  if (shouldResetDisplay) {
    firstNumber = "0.";
    shouldResetDisplay = false;
    updateDisplay();
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
  if (action === "toggle-sign") handleToggleSign();
  if (action === "percent") handlePercent();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    evaluate();
  }

  if (e.key >= "0" && e.key <= "9") handleNumber(e.key);
  if (["+", "-", "*", "/"].includes(e.key)) handleOperator(e.key);
  if (e.key === "=") evaluate();
  if (e.key === "Backspace") backspace();
  if (e.key === "Escape") clear();
  if (e.key === "." || e.key === ",") handleDecimal();
  if (e.key === "%") handlePercent();
});