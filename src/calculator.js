let state = []
const digits = ['0','1','2','3','4','5','6','7','8','9']
const operators = ['+', '-', '/', '*']

function divide(num1, num2) {
  return Math.floor(num1 / num2);
}

function add(num1, num2) {
  return num1 + num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function handleOperator(operator) {
  if(!state.length) {
    return;
  }
  if(!( operators.includes(state[state.length-1]) )) {
    state.push(operator);
  }
  console.log(state);
}

function handleClear() {
  state = [];
  console.log(state);
}

function operate(num1, num2, op) {
  switch(op) {
    case '+': return add(num1, num2);
    case '-': return subtract(num1, num2);
    case '*': return multiply(num1, num2);
    case '/': return divide(num1, num2);
  }
}

function handleEquation() {
  // PEMDAS
  console.log(state);
}

function handleDigit(digit) {
  if(!state.length) {
    state.push(digit);
  } else if(parseInt(state[state.length-1])) {
    state[state.length-1] += digit;
  } else {
    state.push(digit);
  }
  console.log(state);
}

function onClick(e) {
  let val = e.target.innerText;

  if(digits.includes(val)) {
    handleDigit(val);
  } else if(val==="=") {
    handleEquation();
  } else if(val==="Clear") {
    handleClear();
  } else {
    handleOperator(val);
  }
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function setButtonHandler() {
  const buttons = document.querySelectorAll("button");
  buttons.forEach(button => button.addEventListener("click", onClick));
}

function main() {
  setButtonHandler();
}

main();
