const bodyRef = document.querySelector('body');
const btnStartRef = document.querySelector('[data-start]');
const btnStopRef = document.querySelector('[data-stop]');
const deley = 1000;
let interaslId;

btnStartRef.addEventListener('click', handleButtonStartEvent);
btnStartRef.addEventListener('click', disableButtonStartOn);
btnStartRef.addEventListener('click', disableButtonStopOff);
btnStopRef.addEventListener('click', handleButtonStopEvent);
btnStopRef.addEventListener('click', disableButtonStartOff);
btnStopRef.addEventListener('click', disableButtonStopOn);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function handleButtonStartEvent() {
  interaslId = setInterval(() => {
    bodyRef.style.backgroundColor = getRandomHexColor();
  }, deley);
}

function handleButtonStopEvent() {
  clearInterval(interaslId);
}

function disableButtonStartOn() {
  btnStartRef.disabled = true;
}

function disableButtonStartOff() {
  btnStartRef.disabled = false;
}

function disableButtonStopOn() {
  btnStopRef.disabled = true;
}

function disableButtonStopOff() {
  btnStopRef.disabled = false;
}
