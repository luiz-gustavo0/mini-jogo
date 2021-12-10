const URL =
  'https://us-central1-ss-devops.cloudfunctions.net/rand?min=1&max=300';

let SECRET_NUMBER;

function fetchNumber() {
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      if (data.value) {
        SECRET_NUMBER = data.value;
      } else {
        printMessage('Erro');
        printNumber(generateArray(data.StatusCode), 'error');
        showButtonNewGame();
      }
    });
}

function generateSvgNumber(value, className = '') {
  const svg = `
  <svg
  width="56"
  height="100"
  viewBox="0 0 56 100"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  class="num-inicial"
  >
    <path
      class="seg-1 num-${value} ${className}"
      d="M12.7918 10.9848H42.6309L52.9545 1.18126C51.9989 0.442677 50.8034 4.76837e-06 49.5038 4.76837e-06H5.65773C4.36601 4.76837e-06 3.18002 0.436367 2.2276 1.16469L12.7918 10.9848Z"
    />
    <path
      class="seg-2 num-${value} ${className}"
      d="M1.27122 2.08556C0.477403 3.06007 0 4.30288 0 5.65694V44.0221C0 46.2212 1.257 48.1229 3.09003 49.0588L11.7352 42.5796V11.8126L1.27122 2.08556Z"
    />
    <path
      class="seg-3 num-${value} ${className}"
      d="M43.4255 12.049V42.5707L52.0707 49.0498C53.9037 48.114 55.1607 46.2123 55.1607 44.0131V5.64801C55.1607 4.30184 54.6888 3.06851 53.9053 2.09794L43.4255 12.049Z"
    />
    <path
      class="seg-4 num-${value} ${className}"
      d="M12.7918 89.0144H42.6309L52.9545 98.8187C51.9989 99.5557 50.8034 100 49.5038 100H5.65773C4.36601 100 3.18002 99.5621 2.2276 98.8337L12.7918 89.0144Z"
    />
    <path
      class="seg-5 num-${value} ${className}"
      d="M1.27122 97.9218C0.477403 96.9481 0 95.7061 0 94.3512V55.9861C0 53.7869 1.257 51.886 3.09003 50.9494L11.7352 57.4285V88.1956L1.27122 97.9218Z"
    />
    <path
      class="seg-6 num-${value} ${className}"
      d="M43.4255 87.9413V57.4196L52.0707 50.9405C53.9037 51.8771 55.1607 53.778 55.1607 55.9772V94.3423C55.1607 95.6877 54.6888 96.921 53.9053 97.8932L43.4255 87.9413Z"
    />
    <path
      class="seg-7 num-${value} ${className}"
      d="M42.5551 43.9926H12.6056L4.62952 49.8721L12.6056 55.7523H24.0243H31.1363H42.5551L50.5312 49.8721L42.5551 43.9926Z"
    />
  </svg>
  
  `;

  return svg;
}

function generateArray(number) {
  const array = number.toString().split('');

  return array;
}

function printNumber(arrayOfNumbers, className) {
  const div = document.querySelector('.adjacent-number');
  let svgInicial = document.querySelector('.num-inicial');

  let number = '';

  if (arrayOfNumbers.length === 1 && Number(arrayOfNumbers[0]) < 10) {
    svgInicial.style.display = 'none';

    div.innerHTML =
      generateSvgNumber(0, className) +
      generateSvgNumber(arrayOfNumbers[0], className);
  } else {
    arrayOfNumbers.forEach((element) => {
      number += generateSvgNumber(element, className);
    });
    svgInicial.style.display = 'none';
    div.innerHTML = number;
  }
}

function printMessage(message) {
  const boxMessage = document.querySelector('.message');

  switch (message) {
    case 'É maior':
    case 'É menor':
      boxMessage.classList.add('alert');
      break;
    case 'Você acertou!!!!':
      boxMessage.classList.remove('alert');
      boxMessage.classList.add('success');
      break;
    case 'Erro':
      boxMessage.classList.add('error');
      break;
    default:
      boxMessage.classList.remove('error');
      boxMessage.classList.remove('alert');
      boxMessage.classList.remove('success');
  }

  boxMessage.textContent = message;
}

let buttonSubimt = document.querySelector('.btn-submit');
const inputField = document.querySelector('input');

buttonSubimt.addEventListener('click', handleClick);

function handleClick(event) {
  const value = Number(inputField.value);

  if (!value || value > 300) {
    alert('O valor de entrada deve ser maior que 0 e menor que 301');
    inputField.focus();
    return;
  }

  if (SECRET_NUMBER === value) {
    printMessage('Você acertou!!!!');
    printNumber(generateArray(value), 'success');

    buttonSubimt.disabled = true;
    inputField.disabled = true;

    showButtonNewGame();
  } else if (SECRET_NUMBER < value) {
    printMessage('É menor');
    printNumber(generateArray(value));
  } else {
    printMessage('É maior');
    printNumber(generateArray(value));
  }

  inputField.value = '';
  inputField.focus();
}

const buttonNewGame = document.querySelector('.btn-new-game');
buttonNewGame.addEventListener('click', handleRestartGame);

function showButtonNewGame() {
  buttonNewGame.classList.add('show');
}

function handleRestartGame() {
  buttonNewGame.classList.remove('show');
  buttonSubimt.disabled = false;
  inputField.disabled = false;
  document.querySelector('.num-inicial').style.display = 'block';
  document.querySelector('.adjacent-number').innerHTML = '';
  printMessage();
  fetchNumber();
}

fetchNumber();
