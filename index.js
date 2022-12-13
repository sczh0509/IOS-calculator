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

// get screen and calc-buttons elements
const screen = document.getElementById("screen-value");
const calcBtns = document.getElementById("calc-buttons");

// add click event listener to calc-buttons
calcBtns.addEventListener("click", (e) => handleClick(e.target.textContent));

// handle click events
const handleClick = (val) => {
  if (!isNaN(val) && calc.buffer.length < 9) {
    handleNumber(val);
  }
  renderScreen();
};

// handle clicks on number buttons
const handleNumber = (val) => {
  if (calc.buffer === "0") {
    calc.buffer = val;
  } else {
    calc.buffer += val;
  }
  console.log(calc.buffer);
};

// render number on calc-screen
const renderScreen = () => {
  screen.textContent = calc.buffer;
};
