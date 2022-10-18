import Notiflix from 'notiflix';

const formRef = document.querySelector('.form');
const btnRef = formRef.lastElementChild;
let delayValue;
let stepValue;
let amountValue;

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}

function formSubmit(event) {
  event.preventDefault();
  delayValue = Number(event.currentTarget.elements.delay.value);
  stepValue = Number(event.currentTarget.elements.step.value);
  amountValue = Number(event.currentTarget.elements.amount.value);

  for (let i = 1; i <= amountValue; i += 1) {
    createPromise(i, delayValue)
      .then(({ position, delay }) => {
        // console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        // console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });

    delayValue += stepValue;
  }
}
formRef.addEventListener('submit', formSubmit);
