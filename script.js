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
    case "subtraction":
    case "multiplication":
    case "division":
      if (expression === "" && result === "really?") break;
      if (expression === "" && result !== "") {
        startFromResult(value);
      } else if (expression !== "" && !isLastCharOperator()) {
        addValue(value);
      }
      break;
    case "submit":
      submit();
      break;
    case "negation":
      negation();
      break;
    case "mod":
      percentage();
      break;
    case "decimal":
      decimal(value);
      break;
  }

  updateDisplay(expression, result);
}

function addValue(value) {
  if (value === ".") {
    const lastOperatorIndex = expression.search(/[+\-*/]/);
    const lastDecimalIndex = expression.lastIndexOf(".");
    const lastNumberIndex = Math.max(
      expression.lastIndexOf("+"),
      expression.lastIndexOf("-"),
      expression.lastIndexOf("*"),
      expression.lastIndexOf("/"),
    );
    if (
      (lastDecimalIndex < lastOperatorIndex ||
        lastDecimalIndex < lastNumberIndex ||
        lastDecimalIndex === -1) &&
      (expression == "" ||
        expression.slice(lastNumberIndex + 1).indexOf("-") === -1)
    ) {
      expression += value;
    }
  } else {
    expression += value;
  }
}

function updateDisplay(expression, result) {
  expressionDiv.textContent = expression;
  resultDiv.textContent = result;

  expressionDiv.scrollLeft = expressionDiv.scrollWidth;
  resultDiv.scrollLeft = resultDiv.scrollWidth;

  expressionDiv.style.maskImage =
    expressionDiv.scrollWidth > expressionDiv.clientWidth
      ? "linear-gradient(to right, transparent 0%, black 5%)"
      : "none";
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

function startFromResult(value) {
  expression += result + value;
}

function submit() {
  result = evaluateExpression();
  expression = "";
}

function evaluateExpression() {
  if (expression.includes("/0")) {
    return "really?";
  }
  const evalResult = eval(expression);
  return isNaN(evalResult) || !isFinite(evalResult)
    ? " "
    : evalResult < 1
      ? parseFloat(evalResult.toFixed(10))
      : parseFloat(evalResult.toFixed(2));
}

function negation() {
  if (expression === "" && result !== "") {
    result = -result;
  } else if (!expression.startsWith("-") && expression !== "") {
    expression = "-" + expression;
  } else if (expression.startsWith("-")) {
    expression = expression.slice(1);
  }
}

function percentage() {
  if (expression !== "") {
    result = evaluateExpression();
    expression = "";

    if (!isNaN(result) && isFinite(result)) {
      result /= 100;
    } else {
      result = "";
    }
  } else if (result !== "") {
    result = parseFloat(result) / 100;
  }
}

function decimal(value) {
  if (!expression.endsWith(".") && !isNaN(expression.slice(-1))) {
    addValue(value);
  }
}

inputBox.addEventListener("click", buttonClick);

document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (key >= "0" && key <= "9")
    buttonClick({ target: { dataset: { action: "number", value: key } } });
  else if (key === "+")
    buttonClick({ target: { dataset: { action: "addition", value: "+" } } });
  else if (key === "-")
    buttonClick({ target: { dataset: { action: "subtraction", value: "-" } } });
  else if (key === "*")
    buttonClick({
      target: { dataset: { action: "multiplication", value: "*" } },
    });
  else if (key === "/")
    buttonClick({ target: { dataset: { action: "division", value: "/" } } });
  else if (key === "." || key === ",")
    buttonClick({ target: { dataset: { action: "decimal", value: "." } } });
  else if (key === "Enter" || key === "=")
    buttonClick({ target: { dataset: { action: "submit", value: "=" } } });
  else if (key === "Backspace")
    buttonClick({ target: { dataset: { action: "backspace" } } });
  else if (key === "Escape")
    buttonClick({ target: { dataset: { action: "clear" } } });
});
