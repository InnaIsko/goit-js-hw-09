import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const btnStartRef = document.querySelector('[data-start]');
const inputRef = document.querySelector('#datetime-picker');
const spanDayRef = document.querySelector('[data-days]');
const spanHoursRef = document.querySelector('[data-hours]');
const spanMinutesRef = document.querySelector('[data-minutes]');
const spanSecondsRef = document.querySelector('[data-seconds]');
let intervalId;
let currentData = null;

disableButtonStartOn();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const date = new Date();
    if (selectedDates[0] <= date) {
      Notiflix.Notify.failure('Please choose a date in the future');
      //   window.alert('Please choose a date in the future');
    } else {
      disableButtonStartOff();
      currentData = selectedDates[0];
    }
  },
};

function startTimer() {
  disableInputOn();
  disableButtonStartOn();
  intervalId = setInterval(() => {
    const currentTime = new Date();
    const deltaTime = currentData - currentTime;
    const timeComponents = convertMs(deltaTime);

    if (deltaTime <= 0) {
      clearInterval(intervalId);
    } else {
      changeClock(timeComponents);
    }
  }, 1000);
}

function changeClock({ days, hours, minutes, seconds }) {
  spanDayRef.textContent = days;
  spanHoursRef.textContent = hours;
  spanMinutesRef.textContent = minutes;
  spanSecondsRef.textContent = seconds;
}

function disableButtonStartOn() {
  btnStartRef.disabled = true;
}

function disableButtonStartOff() {
  btnStartRef.disabled = false;
}

function disableInputOn() {
  inputRef.disabled = true;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

flatpickr('#datetime-picker', options);
btnStartRef.addEventListener('click', startTimer);
