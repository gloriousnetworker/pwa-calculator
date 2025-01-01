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

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-info bar from appearing
  e.preventDefault();
  deferredPrompt = e;

  // Show the custom install button
  const installButton = document.getElementById('install-btn');
  installButton.style.display = 'block';

  installButton.addEventListener('click', () => {
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user's response
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('PWA installed');
      } else {
        console.log('PWA installation declined');
      }
      deferredPrompt = null; // Reset the deferred prompt
    });
  });
});