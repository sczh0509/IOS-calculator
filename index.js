// declare a calculation obj to hold useful values
const calc = {
  buffer: "0",
  runningTotal: 0,
  currentOperator: null,
  lastOperation: {
    operant: null,
    operator: null,
  },
};

// get screen, clear-button and calc-buttons elements
const screen = document.getElementById("screen-value");
const calcBtns = document.getElementById("calc-buttons");
const clearBtn = document.getElementById("clear-button");

// add click event listener to calc-buttons
calcBtns.addEventListener("click", (e) => handleClick(e.target.textContent));

// handle click events
const handleClick = (val) => {
  if ((!isNaN(val) || val === ".") && checkLength()) {
    handleNumber(val);
  } else {
    handleSymbol(val);
  }
  renderScreen();
};

// handle clicks on number buttons
const handleNumber = (val) => {
  clearBtn.textContent = "C";
  if (calc.buffer === "0" && val !== ".") {
    calc.buffer = val;
  } else {
    if (!isNaN(val) || !calc.buffer.includes(".")) {
      calc.buffer += val;
    }
  }
  console.log(calc.buffer);
};

// handle clicks on symbol buttons
const handleSymbol = (val) => {
  switch (val) {
    case "C":
      // only reset buffer content when Clear button is clicked
      clearBtn.textContent = "AC";
      calc.buffer = "0";
      break;
    case "AC":
      // reset all values when All Clear is clicked
      calc.currentOperator = null;
      calc.lastOperation.operant = null;
      calc.lastOperation.operator = null;
      calc.runningTotal = 0;
      break;
  }
};

// function to check buffer length
const checkLength = () => {
  const filtered = calc.buffer
    .split("")
    .filter((char) => char !== "." && char !== "-" && char !== ",");
  if (filtered.length < 9) {
    return true;
  }
  return false;
};

// render number on calc-screen
const renderScreen = () => {
  screen.textContent = calc.buffer;
};
