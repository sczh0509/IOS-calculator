let buffer = "0";
let runningTotal = 0;
let currentOperator = null;
let isNegative = false;
let lastOperation = {
  operator: null,
  operant: null,
};

const screen = document.getElementById("screen-value");
const calcButtons = document.getElementById("calc-buttons");

calcButtons.addEventListener("click", (e) => {
  if (!isNaN(e.target.textContent)) {
    handleNumber(e.target.textContent);
    renderScreen(buffer);
  } else {
    handleSymbol(e.target.textContent);
  }
});

function format(str, symbol) {
  let oldString = structuredClone(str).split("");
  const formattedString = [];
  let float = "";
  if (oldString.includes("e")) {
    return "Error";
  }
  if (oldString.includes(".")) {
    float = oldString.slice(oldString.indexOf(".")).join("");
    oldString = oldString.slice(0, oldString.indexOf("."));
  }
  let unit = parseInt(oldString.length / 3);
  while (unit > 0) {
    for (let i = 0; i < 3; i++) {
      formattedString.unshift(oldString.pop());
    }
    if (oldString.length) {
      formattedString.unshift(symbol);
    }
    unit--;
  }
  while (oldString.length) {
    formattedString.unshift(oldString.pop());
  }
  return formattedString.join("") + float;
}

function handleSymbol(symbol) {
  switch (symbol) {
    case "C":
      isNegative = false;
      buffer = "0";
      runningTotal = 0;
      currentOperator = null;
      // lastOperation.operator = null;
      renderScreen(buffer);
      break;
    case "/":
      runningTotal = runningTotal * -1;
      isNegative = !isNegative;
      renderScreen(buffer);
      break;
    case "%":
      const result = parseFloat(buffer) / 100;
      buffer = `${result}`;
      renderScreen(buffer);
      break;
    case "÷":
    case "+":
    case "−":
    case "×":
      if (currentOperator === null) {
        runningTotal = parseFloat(buffer);
      }
      lastOperation.operant = parseFloat(buffer);
      lastOperation.operator = currentOperator;
      currentOperator = symbol;
      if (lastOperation.operator !== null) {
        handleMath();
      }
      buffer = "0";
      renderScreen(`${runningTotal}`);
      break;
    case "=":
      if (currentOperator !== null) {
        lastOperation.operant = parseFloat(buffer);
        lastOperation.operator = currentOperator;
      }
      if (lastOperation.operator !== null) {
        handleMath();
      }
      renderScreen(`${runningTotal}`);
      break;
  }
}

function handleNumber(number) {
  if (buffer === "0") {
    buffer = number;
  } else {
    const numberStringified = `${buffer}${number}`;
    buffer = numberStringified.slice(0, 9);
  }
}

function renderScreen(str) {
  const formattedStr = format(str, ",");
  screen.textContent = `${isNegative ? "-" + formattedStr : formattedStr}`;
}

function handleMath() {
  console.log(
    `runningTotal = ${runningTotal} \n operator = ${lastOperation.operator} \n operant = ${lastOperation.operant}`
  );
  switch (lastOperation.operator) {
    case "÷":
      runningTotal /= parseFloat(lastOperation.operant);
      break;
    case "+":
      runningTotal += parseFloat(lastOperation.operant);
      break;
    case "−":
      runningTotal -= parseFloat(lastOperation.operant);
      break;
    case "×":
      runningTotal *= parseFloat(lastOperation.operant);
      break;
  }
}
