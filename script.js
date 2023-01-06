const keypad = document.querySelector('#keypad');
const operationStringContainer = document.querySelector('#operation-string');
const resultContainer = document.querySelector('#result');
const operators = ['+', '-', 'x', '/'];

let firstNumber = '';
let secondNumber = '';
let operator = '';
let operationString = '';

const addContentToElementContainer = (container, content) => {
    container.textContent = '';
    container.textContent = content;
}

const operate = (operator, a, b) => {
    let intA = parseInt(a);
    let intB = parseInt(b);

    if(a.includes('.')) {
        intA = parseFloat(a);
    }
    if(b.includes('.')) {
        intB = parseFloat(b);
    }

    switch (operator) {
        case '+':
            return intA + intB;
        case '-':
            return intA - intB;
        case 'x':
            return intA * intB;
        case '/':
            return intA / intB;
    }

}

const keypadHandler = (e) => {
    const textContent = e.target.textContent;
    operationString += textContent;

    if(operator !== '' && firstNumber !== '') {
        secondNumber += textContent;
    } else {
        firstNumber += textContent;
    }


    if(operators.includes(textContent)) {
        operator += textContent;
    }

    if(textContent === '=') {
        addContentToElementContainer(resultContainer, operate(operator, firstNumber, secondNumber));
    }

    addContentToElementContainer(operationStringContainer, operationString);
};

keypad.addEventListener('click', keypadHandler);
