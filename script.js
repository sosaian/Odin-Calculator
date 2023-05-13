let number1 = 0;
let operator = "";
let number2 = 0;

const display = document.querySelector("#display");
let displayValue = `${number1.toString()} ${operator} ${number2.toString()}`;

function isANumber(buttonID)
{
    switch (buttonID)
    {
        case "buttonZero":
        case "buttonOne":
        case "buttonTwo":
        case "buttonThree":
        case "buttonFour":
        case "buttonFive":
        case "buttonSix":
        case "buttonSeven":
        case "buttonEight":
        case "buttonNine":
            return true;
    
        default:
            return false;
    }
}

function isAnOperator(buttonID)
{
    switch (buttonID)
    {
        case "percentageButton":
        case "divideButton":
        case "multiplyButton":
        case "minusButton":
        case "plusButton":
            return true;
    
        default:
            return false;
    }
}

function isAnAction(buttonID)
{
    switch (buttonID)
    {
        case "clearButton":
        case "plusMinusButton":
        case "decimalButton":
        case "equalsButton":
            return true;
    
        default:
            return false;
    }
}

function buttonResponse(buttonID)
{
    if (isANumber(buttonID))
    {
        if (operator === "")
            console.log("The button pressed is a number");
            // add buttonID.substring(6) to number1
        else
            console.log("The button pressed is a number2");
            // add buttonID.substring(6) to number2
    }
    else if (isAnOperator(buttonID))
        console.log("The button pressed is an operator");
    else if (isAnAction(buttonID))
        console.log("The button pressed is an action");
    else
        console.log("ERROR: somehow this button is not registered!");
}

const buttons = document.querySelectorAll("button");
buttons.forEach( button =>
{
    button.addEventListener("click", (e) => buttonResponse(e.target.id));
});

//function add() {}
//function substract() {}
//function multiply() {}
//function divide() {}
//function operate(operator, number1, number2) {}