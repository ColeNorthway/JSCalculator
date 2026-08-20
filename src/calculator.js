let state = []
const digits = ['0','1','2','3','4','5','6','7','8','9']
const operators = ['*', '/', '+', '-']  // Note in PEMDAS order

function divide(num1, num2) {
  if(num2==='0') return "Err Div by 0";
  return String(Math.floor(parseInt(num1) / parseInt(num2)));
}

function add(num1, num2) {
  return String(parseInt(num1) + parseInt(num2));
}

function multiply(num1, num2) {
  return String(parseInt(num1) * parseInt(num2));
}

function subtract(num1, num2) {
  return String(parseInt(num1) - parseInt(num2));
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function formatState() {
  let res = "";
  for(const s of state) {
    res += s + " ";
  }
  return res.trim();
}

function updateUI() {
  let ui = document.querySelector("input");
  ui.value = formatState();
}

function handleOperator(operator) {
  if(!state.length) {
    return;
  }
  if(!( operators.includes(state[state.length-1]) )) {
    state.push(operator);
  }
}

function handleClear() {
  state = [];
}

function operate(num1, num2, op) {
  switch(op) {
    case '+': return add(num1, num2);
    case '-': return subtract(num1, num2);
    case '*': return multiply(num1, num2);
    case '/': return divide(num1, num2);
  }
}

function getNextOperatorPos() {
  for(const op of operators) {
    for(let i=0; i<state.length; i++) {
      if(state[i]===op) return i;
    }
  }
}

function checkErr(res) {
  return res === "Err Div by 0";
}

function updateState(indx, res){
  state.splice(indx-1, 3);
  state.splice(indx-1, 0, res);
}

function handleEquation() {
  if(state.length===0)   return;
  if(state.length===1)   return;
  if(state.length%2===0) return;  // Impossible bc operators

  // PEMDAS
  while(state.length!==1) {
    let indx = getNextOperatorPos();
    let res = operate(state[indx-1], state[indx+1], state[indx]);
    if(checkErr(res)) {
      handleClear();
      alert(res);
    }
    updateState(indx, res);
  }
}

function handleDigit(digit) {
  if(!state.length) {
    state.push(digit);
  } else if(parseInt(state[state.length-1])) {
    state[state.length-1] += digit;
  } else {
    state.push(digit);
  }
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

  updateUI();
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
