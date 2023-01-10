const keypad = document.querySelector('#keypad');
const display = document.querySelector('#display');
const decimalBtn = document.querySelector('#decimal');
const operators = ['+', '-', 'x', '/'];
const excludedSymbols = ['del', '='];

let firstNumber = '';
let secondNumber = '';
let operator = '';
let operationString = '';
let floatNumber = false;

const updateDisplay = (content) => {
    if(content.length > 10) display.style.fontSize = '40px';
    display.textContent = content;
};

const operate = (operator, a, b) => {
    let intA = parseInt(a);
    let intB = parseInt(b);
    let result = 0;

    if(a.includes('.')) {
        intA = parseFloat(a);
    }
    if(b.includes('.')) {
        intB = parseFloat(b);
    }

    switch (operator) {
        case '+':
            result = intA + intB;
            break;
        case '-':
            result = intA - intB;
            break;
        case 'x':
            result = intA * intB;
            break;
        case '/':
            result = intA / intB;
            break;
    }

    return floatNumber ? result.toFixed(2) : result;
};

const performAC = () => {
    operationString = '';
    operator = '';
    firstNumber = '';
    secondNumber = '';
    floatNumber = false;
    decimalBtn.disabled = false;
    updateDisplay('');
};

const performDel = () => {
    if(firstNumber !== '' && operator === '') {
        firstNumber = firstNumber.slice(0, -1);
        operationString = operationString.slice(0, -1);
    }

    if(secondNumber !== '' && operator !== '') {
        secondNumber = secondNumber.slice(0, -1);
        operationString = operationString.slice(0, -1);
    }
};

const keypadHandler = (e) => {
    if(e.target.id === 'keypad') return;
    const textContent = e.target.textContent;

    if(
        (firstNumber.includes('.') && textContent === '.' && secondNumber === '') ||
        (firstNumber !== '' && textContent === '.' && secondNumber.includes('.'))
    ) {
        decimalBtn.disabled = true;
        return;
    }

    if(
        (textContent === '=' || operators.includes(textContent)) &&
        firstNumber === '' && secondNumber === ''
    ) {
        return;
    }

    operationString += !excludedSymbols.includes(textContent) ? textContent : '';

    if(operator === '/' && (firstNumber === '0' || secondNumber === '0')) {
        performAC();
        updateDisplay('error!');
        return;
    }

    if(operator !== '' && firstNumber !== '') {
        secondNumber += !excludedSymbols.includes(textContent) ? textContent : '';
    } else {
        firstNumber += !excludedSymbols.includes(textContent) ? textContent : '';
    }


    if(operators.includes(textContent)) {
        decimalBtn.disabled = false;
        if(firstNumber !== '' && secondNumber !== ''){
            firstNumber = operate(operator, firstNumber, secondNumber).toString();
            secondNumber = '';
            operator = textContent;
            operationString = firstNumber + operationString.slice(operationString.indexOf(operator));
        } else {
            operator = textContent;
        }
    }

    if(textContent === 'AC') performAC();
    if(textContent === 'del') performDel();
    if(textContent === '.') floatNumber = true;


    if(textContent === '=' && firstNumber !== '' && secondNumber !== '') {
        operationString = operate(operator, firstNumber, secondNumber);
    }

    updateDisplay(operationString);
};

keypad.addEventListener('click', keypadHandler);
