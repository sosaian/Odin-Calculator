let number1 = 0;
let operator = "";
let number2 = 0;

const display = document.querySelector("#display");
let displayValue = `${number1.toString()} ${operator} ${number2.toString()}`;
// display.textContent = displayValue;

//function isANumber() {}
//function isAnOperator() {}

/*
function buttonResponse(buttonID)
{
    const button = document.querySelector(buttonID);
    const buttonValue = button.textContent;

    if (buttonValue.isANumber())
    {
        if (operator === "")
            number1 = parseInt(buttonValue);
        else
            number2 = parseInt(buttonValue);
    }
    else    //buttonID = Operator || Action
    {
        if (buttonValue.isAnOperator())
            operator = buttonValue;
        else
            console.log("The button pressed is an action");
    }
}
*/

const buttons = document.querySelectorAll("button");
buttons.forEach( button =>
{
    button.addEventListener("click", console.log(button.id));
    // button.addEventListener("click", buttonResponse(button.id));
});

//function add() {}
//function substract() {}
//function multiply() {}
//function divide() {}
//function operate(operator, number1, number2) {}