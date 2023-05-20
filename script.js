const display = document.querySelector("#display");
const decimal = document.querySelector("#decimalButton");
let numbers = ["0"];
let operators = [];
let displayValue = [numbers[0]];
let result = "";
display.textContent = displayValue.join("");

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
    if (!(result === ""))
    {
        //Number pressed after an operation.

        result = "";
        resetCalculator();
        numbers[0] = convertToNumber(buttonID);
        displayValue[0] = numbers[0];
    }
    else if (operators.length === 0)
    {        
        //Number pressed when there's only a number in display
        
        if (numbers[numbers.length - 1] === "0")
            numbers[numbers.length - 1] = convertToNumber(buttonID);
        else
            numbers[numbers.length - 1] += convertToNumber(buttonID);

        displayValue[numbers.length - 1] = numbers[numbers.length - 1];
    }
    else
    {
        //Number pressed when there is at least an operator on display
        
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

    display.textContent = `${displayValue.join("")}`;
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
    if (!(result === ""))
    {
        resetCalculator();
        numbers[0] = result;
        result = "";
        displayValue[0] = numbers[0];
        display.textContent = `${displayValue.join("")}`;
    }

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
            display.textContent = `${displayValue.join("")}`;
        }
    }
}

function isAnAction(buttonID)
{
    switch (buttonID)
    {
        case "clearButton":
        case "backspaceButton":
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
    display.textContent = displayValue.join("");
}

function decimalButtonResponse()
{
    if (!(result === ""))
    {
        result = "";
        resetCalculator();
        numbers[0] = "0.";
        displayValue[0] = numbers[0];
    }
    else if (operators.length === 0)
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
    display.textContent = `${displayValue.join("")}`;
}

function calcAdd(number1, number2)
{
    const addend1 = parseFloat(number1);
    const addend2 = parseFloat(number2);
    
    return addend1 + addend2;
}

function calcSubstract(number1, number2)
{
    const minuend = parseFloat(number1);
    const subtrahend = parseFloat(number2);
    
    return minuend - subtrahend;
}

function calcMultiply(number1, number2)
{
    const factor1 = parseFloat(number1);
    const factor2 = parseFloat(number2);
    
    return factor1 * factor2;
}

function calcDivide(number1, number2)
{
    const dividend = parseFloat(number1);
    const divisor = parseFloat(number2);

    if (divisor === 0)
    {
        alert("ERROR: You can't divide by zero! Congratulations, you broke math.\n\nI'll just ignore this division :)");
        
        return dividend;
    }
    else
        return parseFloat((dividend / divisor).toFixed(5));
}

function calcModulo(number1, number2)
{
    const dividend = parseFloat(number1);
    const divisor = parseFloat(number2);

    if (divisor === 0)
    {
        alert("ERROR: You can't divide by zero! Congratulations, you broke math.\n\nI'll just ignore this division :)");
        return dividend;
    }
    else
        return parseFloat((dividend % divisor).toFixed(5));
}

function calcOperate(input)
{ 
    let number1 = "";
    let operator = "";
    let number2 = "";

    for (let index = 1; index < input.length; index += 2)
    {
        if(index === 1)
            number1 = input[index - 1];

        operator = input[index];
        number2 = input[index + 1];

        switch (operator)
        {
            case `%`:
                number1 = calcModulo(number1, number2);
                break;
            case `/`:
                number1 = calcDivide(number1, number2);
                break;
            case `*`:
                number1 = calcMultiply(number1, number2);
                break;
            case `-`:
                number1 = calcSubstract(number1, number2);
                break;
            case `+`:
                number1 = calcAdd(number1, number2);
                break;
            default:
                alert(`ERROR: ${displayValue[index]} is not an operator!`);
        }
    }

    return number1;
}

function equalsButtonResponse()
{
    if ( isAnOperator(displayValue[displayValue.length - 1]) )
        alert("ERROR: Please add a number before calculating the result.");
    else
    {
        const decimalCheck = displayValue[displayValue.length - 1];

        if (decimalCheck[decimalCheck.length - 1] === ".")
            alert("ERROR: Please add a number before calculating the result.");
        else
        {
            if(operators.length === 0)
                result = displayValue[0];
            else
                result = calcOperate(displayValue).toString(); 

            decimal.disabled = false;
            display.textContent = parseFloat(result);
        }
    }
}

function backspaceResponse()
{
    if (display.textContent === result)
    {
        //User pressed backspace after obtaining result from previous operation.
        //Not sure what to do here. I'll just reset calculator.
        result = "";
        resetCalculator();
    }
    else
    {
        if (numbers.length === operators.length)
        {
            //Last input was an operator.
            operators.pop();
            displayValue.pop();
        }
        else
        {
            //Last input was a number.
            let aux = numbers[numbers.length - 1];
            aux = aux.split("");
            aux.pop();
            
            if (numbers.length === 1)
            {
                if (aux.length === 0)
                {
                    aux.push("0");
                }

                numbers[numbers.length - 1] = aux.join("");
                displayValue[displayValue.length - 1] = numbers[numbers.length - 1];
            }
            else
            {
                if (aux.length === 0)
                {
                    numbers.pop();
                    displayValue.pop();
                }
                else
                {
                    numbers[numbers.length - 1] = aux.join("");
                    displayValue[displayValue.length - 1] = numbers[numbers.length - 1];
                }
            }
        }
        
        display.textContent = displayValue.join("");
    }
}

function buttonResponse(buttonID)
{
    if (isANumber(buttonID))
        numberButtonResponse(buttonID);
    else if (isAnOperator(buttonID))
        operatorButtonResponse(buttonID);
    else if (isAnAction(buttonID))  //Maybe this could be inside isAnAction()
    {
        switch (buttonID)
        {
            case "clearButton":
            {
                result = "";
                resetCalculator();
                break;   
            }

            case "backspaceButton":
            {                
                backspaceResponse();
                break;
            }

            case "decimalButton":
            {
                decimalButtonResponse();
                break;
            }

            case "equalsButton":
            {
                equalsButtonResponse();
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