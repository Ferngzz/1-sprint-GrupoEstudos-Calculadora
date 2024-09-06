const resultPreview = document.querySelector('.preview');
const result = document.querySelector('.result');
const buttons = document.querySelectorAll('button');

const maxLength = 9;

let inputNumber = '';
let resultNumber = '';
let currentOperation = '';
let operation = undefined;

buttons.forEach(b => {
    b.addEventListener('click', (e) => onButtonClick(e.target));
})

/**
 * Chama a função referente ao tipo de botão clicado.
 * @param button recebe o botão clicado como parâmetro.
 */
function onButtonClick(button) {
    if (isNumber(button)) {
        onNumberClick(button);
    } else if (isOperator(button)) {
        onOperatorClick(button);
    } else if (isDecimalPoint(button)) {
        onDecimalPointClick(button);
    } else {
        onOutroClick(button);
    }

    result.value = inputNumber;
    resultPreview.value = currentOperation;
}

/**
 * Verifica se o botão clicado é um número
 * @param button recebe o botão clicado
 * @returns {boolean} retorna true se for número
 */
function isNumber(button) {
    return button.classList.contains('number');
}

/**
 * Insere o número a qual o botão se refere na variável de número de entrada.
 * Limita o máximo de digitos do número.
 * @param button
 */
function onNumberClick(button) {
    if (inputNumber.length + 1 > maxLength) {
        return;
    }

    inputNumber += button.value;
}

/**
 * Verifica se o botão clicado é um operador
 * @param button recebe o botão clicado como parâmetro
 * @returns {boolean} true se é um operador
 */
function isOperator(button) {
    return button.classList.contains('operator');
}

/**
 * Verifica condições para a entrada de um operador.
 * Se o número em digitação não estiver começado, não insere ponto decimal.
 * Se o número em digitação já tiver ponto decimal, não insere ponto.
 * @param button recebe o botão clicado como parâmetro
 */
function onOperatorClick(button) {
    if (inputNumber.length < 1 && resultNumber < 1) {
        return;
    }

    if (resultNumber) {
        resultNumber = operation(
            parseFloat(resultNumber),
            parseFloat(inputNumber),
        );
    } else {
        resultNumber = inputNumber;
    }

    if (button.value !== '=') {
        currentOperation = resultNumber + `${button.value}`;
    } else {
        currentOperation = resultNumber;
    }

    inputNumber = '';

    result.placeholder = '';

    switch (button.value) {
        case '+':
            operation = (n1, n2) => n1 + n2;
            break;
        case '-':
            operation = (n1, n2) => n1 - n2;
            break;
        case '*':
            operation = (n1, n2) => n1 * n2;
            break;
        case '/':
            operation = (n1, n2) => {
                if (n2 !== 0) {
                    return n1 / n2;
                } else {
                    return "Erro";
                }
            }
            break;
        case '=':
            operation = () => eval(currentOperation);
            break;
        default:
            throw 'Operador invalido';
    }
}

/**
 * Verifica se o botão clicado é um ponto decimal
 * @param button recebe o botão clicado como parâmetro
 * @returns {boolean} true se for ponto decimal
 */
function isDecimalPoint(button) {
    return button.classList.contains('dot');
}

/**
 * Verifica se o número que está sendo digitado já contém ponto decimal
 */
function onDecimalPointClick(button) {
    if (!inputNumber || inputNumber.includes('.')) {
        return;
    }

    inputNumber += '.';
}

/**
 * Ações para botões de outras funcões da calculadora
 * @param button recebe o botão clicado
 */
function onOutroClick(button) {
    switch (button.value) {
        case '+/-':
            if (!inputNumber) {
                return;
            }
            inputNumber = -parseFloat(inputNumber);
            break;
        case 'CE':
            inputNumber = '';
            resultNumber = '';
            currentOperation = '';
            operation = undefined;
            result.placeholder = '0';
            break;
        case 'C':
            inputNumber = inputNumber.slice(0, -1);
            break;
        case '%':
            if (!inputNumber || !resultNumber) {
                return;
            } else {
                inputNumber = parseFloat(inputNumber / resultNumber).toFixed(2);
                result.value = inputNumber;
            }

            break;
        default:
            throw 'Botao invalido';
    }
}
