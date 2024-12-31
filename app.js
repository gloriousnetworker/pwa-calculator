function appendToDisplay(value) {
  const display = document.getElementById('display');
  if (display.innerText === '0' && value !== '.') {
    display.innerText = value;
  } else {
    display.innerText += value;
  }
}

function clearDisplay() {
  const display = document.getElementById('display');
  display.innerText = '0';
}

function calculateResult() {
  const display = document.getElementById('display');
  try {
    display.innerText = eval(display.innerText.replace('÷', '/').replace('×', '*'));
  } catch (error) {
    display.innerText = 'Error';
  }
}
