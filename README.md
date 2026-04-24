# JavaScript Calculator

[Live Demo](https://francescogemolo.github.io/JS-Calculator/)

## Overview
A stylish, responsive calculator webapp built with vanilla HTML, CSS, and JavaScript. Features include basic arithmetic operations, dark/light mode toggle, and a modern clean interface.

## How It Works

### HTML Structure
- **Display area**: Two divs showing the current expression and the result
- **Button layout**: A 4x4 layout of calculator buttons (numbers 0-9, operators, and function keys)
- Each button uses `data-action` and `data-value` attributes for easy JavaScript handling

### JavaScript Logic
1. **State management**: Three variables track `firstNumber`, `secondNumber`, and `currentOperator`
2. **Event delegation**: All button clicks are handled via a single event listener on the input container
3. **Operations**: Functions `add`, `subtract`, `multiply`, and `divide` perform the math
4. **Display update**: The `updateDisplay()` function renders the expression and result in real-time
5. **Dark mode**: Toggle adds/removes a CSS class on the body to switch themes

## Features
- Basic operations: `+`, `-`, `*`, `/`
- Additional functions: `C` (clear), `+/-` (sign toggle), `%` (percentage), backspace
- Dark/Light mode toggle
- Responsive design
- Keyboard support (optional)

## Team
- [Francesco](https://github.com/francescoGemolo)
- [Daniele](https://github.com/DanieleLG90)
- [Paula](https://github.com/PaulaBCdev)
