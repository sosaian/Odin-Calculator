let number1 = "";
let operator = "";
let number2 = "";

const display = document.querySelector("#display");
// let displayValue = `${number1.toString()} ${operator} ${number2.toString()}`;

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

function convertToNumber(word)
{
    const str = word.substring(6);
    switch (str.toLowerCase())
    {
      case "zero":
        return "0";
      case "one":
        return "1";
      case "two":
        return "2";
      case "three":
        return "3";
      case "four":
        return "4";
      case "five":
        return "5";
      case "six":
        return "6";
      case "seven":
        return "7";
      case "eight":
        return "8";
      case "nine":
        return "9";
      default:
        return NaN;
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

function convertToOperator(word)
{
    const str = word.substring(0, word.length - 6);
    
    switch (str)
    {
      case "percentage":
        return "%";
      case "divide":
        return "/";
      case "multiply":
        return "*";
      case "minus":
        return "-";
      case "plus":
        return "+";
      default:
        return NaN;
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
    if (isANumber(buttonID)) // || buttonID === "decimalButton"
    {
        if (operator === "")
        {
            number1 += convertToNumber(buttonID);
            console.log(number1);

            display.textContent = `${number1}`;
        }
        else
        {
            number2 += convertToNumber(buttonID);
            console.log(number2);

            display.textContent = `${number1} ${operator} ${number2}`;
        }
    }
    else if (isAnOperator(buttonID))
    {
        operator = convertToOperator(buttonID);

        display.textContent = `${number1} ${operator}`;
    }
    else if (isAnAction(buttonID))
    {
        console.log("The button pressed is an action");
    }
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