let interval;

export const timer = (value) => {
  const timer = document.querySelector(".timer");
  let seconds = 0,
    minutes = 0;

  const secondCounter = () => {
    if (seconds === 60) {
      minutes++;
      seconds = 0;
    } else {
      seconds++;
    }

    let timerMinutes = minutes;
    if (timerMinutes < 10) {
      timerMinutes = "0" + timerMinutes;
    }

    let timerSeconds = seconds;
    if (timerSeconds < 10) {
      timerSeconds = "0" + timerSeconds;
    }

    timer.textContent = `${timerMinutes} : ${timerSeconds}`;
  };

  if (value) {
    interval = setInterval(secondCounter, 1000);
  } else {
    clearInterval(interval);
    seconds = 0;
    minutes = 0;
    timer.textContent = "00 : 00";
  }
};
