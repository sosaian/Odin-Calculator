const display = document.querySelector("#display");
const decimal = document.querySelector("#decimalButton");
let numbers = ["0"];
let operators = [];
let displayValue = [numbers[0]];
display.textContent = displayValue.join(" ");

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

function numberButtonResponse(buttonID)
{
    if (operators.length === 0)
    {
        if (numbers[numbers.length - 1] === "0")
            numbers[numbers.length - 1] = convertToNumber(buttonID);
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
            if (numbers[numbers.length - 1] === "0")
                numbers[numbers.length - 1] = convertToNumber(buttonID);
            else
                numbers[numbers.length - 1] += convertToNumber(buttonID);

            displayValue[displayValue.length - 1] = numbers[numbers.length - 1];
        }
    }

    display.textContent = `${displayValue.join(" ")}`;
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

function operatorButtonResponse(buttonID)
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
            const decimalCheck = displayValue[displayValue.length - 1];
            
            if (decimalCheck[decimalCheck.length - 1] === ".")
                displayValue[displayValue.length - 1] += "0";

            operators.push(convertToOperator(buttonID));
            displayValue.push(operators[operators.length - 1]);
            decimal.disabled = false;
            display.textContent = `${displayValue.join(" ")}`;
        }
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
    decimal.disabled = false;

    numbers = ["0"];
    operators = [];
    displayValue = [numbers[0]];
    display.textContent = displayValue.join(" ");
}

function decimalButtonResponse()
{
    if (operators.length === 0)
    {
        if (numbers.length === 0)
            numbers.push("0.");
        else
            numbers[numbers.length - 1] += ".";

        displayValue[numbers.length - 1] = numbers[numbers.length - 1];
    }
    else
    {
        if (numbers.length === operators.length)
        {
            numbers.push("0.");
            displayValue.push(numbers[numbers.length - 1]);
        }
        else
        {
            numbers[numbers.length - 1] += ".";
            displayValue[displayValue.length - 1] = numbers[numbers.length - 1];
        }
    }
    
    decimal.disabled = true;
    display.textContent = `${displayValue.join(" ")}`;
}

function calcAdd(number1, number2)
{
    const sum1 = parseInt(number1);
    const sum2 = parseInt(number2);
    
    return sum1 + sum2;
}

function calcSubstract(number1, number2)
{
    const sum1 = parseInt(number1);
    const sum2 = parseInt(number2);
    
    return sum1 - sum2;
}

function calcMultiply(number1, number2)
{
    const sum1 = parseInt(number1);
    const sum2 = parseInt(number2);
    
    return sum1 * sum2;
}

function calcDivide(number1, number2)
{
    const sum1 = parseInt(number1);
    const sum2 = parseInt(number2);

    if (sum2 === 0)
    {
        alert("ERROR: You can't divide by zero! Congratulations, you broke math.\n\nI'll just ignore this division :)");
        
        return sum1;
    }
    else
        return sum1 / sum2;
}

function calcOperate(input)
{
    //input = displayValue
}

function buttonResponse(buttonID)
{
    if (isANumber(buttonID))
        numberButtonResponse(buttonID);
    else if (isAnOperator(buttonID))
        operatorButtonResponse(buttonID);
    else if (isAnAction(buttonID))
    {
        switch (buttonID)
        {
            case "clearButton":
            {
                resetCalculator();
                break;   
            }

            case "plusMinusButton":
            {                
                alert("+/- button pressed!");
                //Maybe change this to a backspace action button.
                break;
            }

            case "decimalButton":
            {
                decimalButtonResponse();
                break;
            }

            case "equalsButton":
            {
                if ( isAnOperator(displayValue[displayValue.length - 1]) )
                    alert("ERROR: Please add a number before calculating the result.");
                else
                {
                    const decimalCheck = displayValue[displayValue.length - 1];
            
                    if (decimalCheck[decimalCheck.length - 1] === ".")
                    {
                        alert("ERROR: Please add a number before calculating the result.");
                    }
                    else
                    {
                        decimal.disabled = false;
                        alert("Equals button pressed!");
                    }
                }

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