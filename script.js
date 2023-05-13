const display = document.querySelector("#display");
const decimal = document.querySelector("#decimalButton");
let numbers = [];
let operators = [];
let displayValue = [];

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
        case `%`:
        case `/`:
        case `*`:
        case `-`:
        case `+`:
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

function resetCalculator()
{
    numbers = [];
    operators = [];
    displayValue = [];
    display.textContent = 0;
}

function buttonResponse(buttonID)
{
    if (isANumber(buttonID)) // || buttonID === "decimalButton"
    {
        if (operators.length === 0)
        {
            if (numbers.length === 0)
                numbers.push(convertToNumber(buttonID));
            else
                numbers[numbers.length - 1] += convertToNumber(buttonID);

            displayValue[numbers.length - 1] = numbers[numbers.length - 1];
        }
        else
        {
            if (numbers.length === operators.length)
            {
                numbers.push(convertToNumber(buttonID));
                displayValue.push(numbers[numbers.length - 1]);
            }
            else
            {
                numbers[numbers.length - 1] += convertToNumber(buttonID);
                displayValue[displayValue.length - 1] = numbers[numbers.length - 1];
            }
        }

        display.textContent = `${displayValue.join(" ")}`;
    }
    else if (isAnOperator(buttonID))
    {
        if ( !(numbers.length > 0) )
            alert("ERROR: An operator must not come before any number is entered!");
        else 
        {
            //Maybe I should create another function for this specific test...
            if ( isAnOperator(displayValue[displayValue.length - 1]) )
                alert("ERROR: Multiple consecutive operators cannot be added.");
            else
            {
                operators.push(convertToOperator(buttonID));
                displayValue.push(operators[operators.length - 1]);
                display.textContent = `${displayValue.join(" ")}`;
            }
        }
    }
    else if (isAnAction(buttonID))
    {
        // console.log("The button pressed is an action");

        switch (buttonID)
        {
            case "clearButton":
            {
                // alert("Clear button pressed!");
                resetCalculator();
                break;   
            }

            case "plusMinusButton":
            {                
                alert("+/- button pressed!");
                break;
            }

            case "decimalButton":
            {
                alert("Decimal button pressed!");
                break;
            }

            case "equalsButton":
            {
                alert("Equals button pressed!");
                break;
            }

            default:
                alert("ERROR: Invalid action!");
        }
    }
    else
        alert("ERROR: Somehow this button is not registered!");
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