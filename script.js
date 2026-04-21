// Dark Mode (Do not delete this!)
const container = document.querySelector(".dark-mode");
const iconOn = document.querySelector(".hgi-idea");
const iconOff = document.querySelector(".hgi-lightbulb-off");

container.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");

  iconOn.classList.toggle("hidden");
  iconOff.classList.toggle("hidden");
});

// Access DOM elements of the calculator
const inputBox = document.getElementById("input");
const expressionDiv = document.getElementById("expression");
const resultDiv = document.getElementById("result");

// Define expression and result variable
let expression = "";
let result = "";

//Event handler
function buttonClick(event) {
  const target = event.target;
  const action = target.dataset.action;
  const value = target.dataset.value;

  switch (action) {
    case "number":
      addValue(value);
      break;
    case "clear":
      clear();
      break;
    case "backspace":
      backspace();
      break;

    case "addition":
    case "substraction":
    case "multiplication":
    case "division":
      if (expression === "" && result !== "") {
        startFromResult(value);
      } else if (expression !== "" && !isLastCharOperator()) {
        addValue(value);
      }
  }

  updateDisplay(expression, result);
}

function addValue(value) {
  expression += value;
}

function updateDisplay(expression, result) {
  expressionDiv.textContent = expression;
  resultDiv.textContent = result;
}

function clear() {
  expression = "";
  result = "";
}

function backspace() {
  expression = expression.slice(0, -1);
}

function isLastCharOperator() {
  return isNaN(parseInt(expression.slice(-1)));
}

inputBox.addEventListener("click", buttonClick);
