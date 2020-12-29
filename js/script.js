var globalCalculations = [
  {
    id: 1,
    description: 'Soma (a + b):',
    calculationFunction: function sum(a, b) {
      return a + b;
    },
    type: 'a_b',
  },

  {
    id: 2,
    description: 'Subtração 1 (a - b):',
    calculationFunction: function subtract(a, b) {
      return a - b;
    },
    type: 'a_b',
  },

  {
    id: 3,
    description: 'Subtração 2 (b - a):',
    calculationFunction: function subtract(b, a) {
      return b - a;
    },
    type: 'b_a',
  },

  {
    id: 4,
    description: 'Multiplicação (a x b):',
    calculationFunction: function multiply(a, b) {
      return formatNumber(a * b);
    },
    type: 'a_b',
  },

  {
    id: 5,
    description: 'Divisão 1 (a ÷ b):',
    calculationFunction: function division(a, b) {
      return getDivisionFrom(a, b);
    },
    type: 'a_b',
  },

  {
    id: 6,
    description: 'Divisão 2 (b ÷ a):',
    calculationFunction: function division(b, a) {
      return getDivisionFrom(b, a);
    },
    type: 'b_a',
  },

  {
    id: 7,
    description: 'Quadrado de a (a²):',
    calculationFunction: function square(a) {
      return formatNumber(a ** 2);
    },
    type: 'a',
  },

  {
    id: 8,
    description: 'Quadrado de b (b²):',
    calculationFunction: function square(b) {
      return formatNumber(b ** 2);
    },
    type: 'b',
  },

  {
    id: 9,
    description: 'Divisores inteiros de a:',
    calculationFunction: function divisorsFrom(a) {
      return getDivisorsFrom(a);
    },
    type: 'a',
  },

  {
    id: 10,
    description: 'Divisores inteiros de b:',
    calculationFunction: function divisorsFrom(b) {
      return getDivisorsFrom(b);
    },
    type: 'b',
  },

  {
    id: 11,
    description: 'Fatorial de a (a!):',
    calculationFunction: function factorial(a) {
      return getFactorialRecursive(a);
    },
    type: 'a',
  },

  {
    id: 12,
    description: 'Fatorial de b (b!):',
    calculationFunction: function factorial(b) {
      return getFactorialRecursive(b);
    },
    type: 'b',
  },

  {
    id: 13,
    description: 'Triplo de a:',
    calculationFunction: function threeTimes(a) {
      return a * 3;
    },
    type: 'a',
  },
];

var globalInputA = document.querySelector('#inputA');
var globalInputB = document.querySelector('#inputB');

function start() {
  globalInputA.addEventListener('input', handleChangeInputA);
  globalInputB.addEventListener('input', handleChangeInputB);

  calculate();
}

function handleChangeInputA() {
  calculate();
}

function handleChangeInputB() {
  calculate();
}

function calculate() {
  var divCalculations = document.querySelector('#calculations');

  var innerCalculations = document.createElement('div');
  innerCalculations.classList.add('row');

  var a = parseInt(globalInputA.value, 10);
  var b = parseInt(globalInputB.value, 10);

  for (var i = 0; i < globalCalculations.length; i++) {
    var currentCalculation = globalCalculations[i];
    var type = currentCalculation.type;
    var calculationFunction = currentCalculation.calculationFunction;

    var id = 'input_' + currentCalculation.id;

    var value = getCalculationFrom(type, calculationFunction, a, b);

    var div = getMaterializeDiv();
    var input = getMaterializeInput(id, value);
    var label = getMaterializeLabel(id, currentCalculation.description);

    div.appendChild(input);
    div.appendChild(label);
    innerCalculations.appendChild(div);
  }

  divCalculations.innerHTML = '';
  divCalculations.appendChild(innerCalculations);
}

function getMaterializeDiv() {
  var div = document.createElement('div');
  div.classList.add('input-field', 'col', 's12', 'm6', 'l4');

  return div;
}

function getMaterializeInput(id, value) {
  var input = document.createElement('input');
  input.readOnly = true;
  input.type = 'text';
  input.id = id;
  input.value = value;

  return input;
}

function getMaterializeLabel(id, description) {
  var label = document.createElement('label');
  label.for = id;
  label.textContent = description;
  label.classList.add('active');

  return label;
}

function getCalculationFrom(type, calculationFunction, number1, number2) {
  var value = '';

  switch (type) {
    case 'a':
      value = calculationFunction(number1);
      break;

    case 'b':
      value = calculationFunction(number2);
      break;

    case 'a_b':
      value = calculationFunction(number1, number2);
      break;

    case 'b_a':
      value = calculationFunction(number2, number1);
      break;

    default:
      value = 'O tipo de cálculo não foi identificado.';
  }

  return value;
}

function getDivisionFrom(number1, number2) {
  if (number2 === 0) {
    return 'Divisão por 0';
  }

  return formatNumber((number1 / number2).toFixed(2));
}

function formatNumber(number) {
  return new Intl.NumberFormat('pt-BR').format(number);
}

function getDivisorsFrom(number) {
  var divisors = [];

  for (var i = 1; i <= number; i++) {
    if (number % i === 0) {
      divisors.push(i);
    }
  }

  return divisors.join(', ') + ' (' + divisors.length + ')';
}

function getFactorialFrom(number) {
  if (number > 21) {
    return 'Número muito grande.';
  }

  var factorial = 1;

  for (var i = number; i > 1; i--) {
    factorial *= i;
  }

  return formatNumber(factorial);
}

function getFactorialRecursive(number) {
  if (number <= 1) {
    return 1;
  }

  return number * getFactorialRecursive(number - 1);
}

start();
