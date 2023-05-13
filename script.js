let number1 = 0;
let operator = "";
let number2 = 0;

const display = document.querySelector("#display");
let displayValue = `${number1.toString()} ${operator} ${number2.toString()}`;
// display.textContent = displayValue;

//function buttonResponse(buttonID) {}
const buttons = document.querySelectorAll("button");
console.log(buttons);
buttons.forEach( button =>
{
    button.addEventListener("click", console.log(button.id));
});

//function add() {}
//function substract() {}
//function multiply() {}
//function divide() {}
//function operate(operator, number1, number2) {}