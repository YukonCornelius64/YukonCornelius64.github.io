window.addEventListener('DOMContentLoaded', (event) => {
  var timerInput = document.getElementById('timer-input');
  var startButton = document.getElementById('start-button');

  startButton.addEventListener('click', function () {
    var timerHTML = `
    <div class="hour">
      <div class="time">
        <span class="prev" id="prev-hours"></span>
        <input class="input-field-new" type="text" id="hours-input" maxlength="2" placeholder="00" />
        <span class="next" id="next-hours"></span>
      </div>
    </div>
    <div class="minute">
      <div class="time">
        <span class="prev" id="prev-minutes"></span>
        <input class="input-field-new" type="text" id="minutes-input" maxlength="2" placeholder="00" />
        <span class="next" id="next-minutes"></span>
        <div class="minutes-box" id="minutes-box"></div>
      </div>
    </div>
    <div class="second">
      <div class="time">
        <span class="prev" id="prev-seconds"></span>
        <input class="input-field-new" type="text" id="seconds-input" maxlength="2" placeholder="00" />
        <span class="next" id="next-seconds"></span>
        <div class="seconds-box" id="seconds-box"></div>
      </div>
  `;

    // Replace the timer input structure with the new timer HTML
    timerInput.innerHTML = timerHTML;
  });
});

/*
.box {
  position: absolute;
  width: 175px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: 1px solid rgb(0, 0, 0);
}

.box>.hours-span,
.box>.minutes-span,
.box>.seconds-span {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  display: none;
  color: #7751de;
  font-size: 150px;
  font-weight: bold;
}



<input class="input-field" type="text" id="hours-input" maxlength="2" placeholder="00" />

  let countdownInterval; // Variable to store the interval ID
  var time = document.querySelector('.time');

  var hoursInput = document.getElementById('hours-box');
  var minutesInput = document.getElementById('minutes-box');
  var secondsInput = document.getElementById('seconds-box');

  var hours = parseInt(hoursInput.textContent);
  var minutes = parseInt(minutesInput.textContent);
  var seconds = parseInt(secondsInput.textContent);

  time.textContent = formatTime(hours, minutes, seconds);

  document
    .getElementById('start-button')
    .addEventListener('click', startCountdown);

  document
    .getElementById('stop-button')
    .addEventListener('click', stopCountdown);

  document
    .getElementById('stop-button')
    .addEventListener('click', stopCountdown);

  document.getElementById('next-hours').addEventListener('click', nextHour);
  document.getElementById('prev-hours').addEventListener('click', prevHour);

  function startCountdown() {
    hoursInput = document.getElementById('hours');
    minutesInput = document.getElementById('minutes');
    secondsInput = document.getElementById('seconds');

    hours = parseInt(hoursInput.textContent);
    minutes = parseInt(minutesInput.textContent);
    seconds = parseInt(secondsInput.textContent);

    time.textContent = formatTime(hours, minutes, seconds);

    var targetTime = new Date();
    targetTime.setHours(targetTime.getHours() + hours);
    targetTime.setMinutes(targetTime.getMinutes() + minutes);
    targetTime.setSeconds(targetTime.getSeconds() + seconds + 1);

    countdownInterval = setInterval(() => {
      updateCountdown(targetTime);
    }, 1000);
  }

  function stopCountdown() {
    clearInterval(countdownInterval);
  }

  function updateCountdown(targetTime) {
    // Get the current time, day , month and year
    var currentTime = new Date().getTime(); // Get the current time
    var remainingTime = Math.max(targetTime - currentTime, 0);

    // format date and time
    var hoursLeft = Math.floor(remainingTime / (1000 * 60 * 60)) % 24;
    var minutesLeft = Math.floor(remainingTime / (1000 * 60)) % 60;
    var secondsLeft = Math.floor(remainingTime / 1000) % 60;

    if (remainingTime <= 0) {
      clearInterval(countdownInterval);
    }

    // display date and time
    time.textContent = formatTime(hoursLeft, minutesLeft, secondsLeft);

    // Update the HTML values
    document.getElementById('hours').textContent = hoursLeft
      .toString()
      .padStart(2, '0');
    document.getElementById('minutes').textContent = minutesLeft
      .toString()
      .padStart(2, '0');
    document.getElementById('seconds').textContent = secondsLeft
      .toString()
      .padStart(2, '0');
  }

  function formatTime(hours, minutes, seconds) {
    if (hours != 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else if (minutes != 0) {
      return `${minutes.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')}`;
    } else {
      return `${seconds.toString().padStart(2, '0')}`;
    }
  }

























  document
    .getElementById('start-button')
    .addEventListener('click', startCountdown);

  document
    .getElementById('start-button')
    .addEventListener('click', stopCountdown);

  function startCountdown() {
    const hoursInput = document.getElementById('hours');
    const minutesInput = document.getElementById('minutes');
    const secondsInput = document.getElementById('seconds');
    const countdownElement = document.getElementById('countdown');
    const timerElement = document.getElementById('timer'); // Updated reference to the timer div

    const hours = parseInt(hoursInput.value);
    const minutes = parseInt(minutesInput.value);
    const seconds = parseInt(secondsInput.value);

    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
      alert('Invalid timer values');
      return;
    }

    const targetTime = new Date();
    targetTime.setHours(targetTime.getHours() + hours);
    targetTime.setMinutes(targetTime.getMinutes() + minutes);
    targetTime.setSeconds(targetTime.getSeconds() + seconds);

    countdownInterval = setInterval(() => {
      const currentTime = new Date().getTime();
      const remainingTime = Math.max(targetTime - currentTime, 0);

      const remainingHours = Math.floor(remainingTime / (1000 * 60 * 60));
      const remainingMinutes = Math.floor(
        (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
      );
      const remainingSeconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

      const formattedTime = formatTime(
        remainingHours,
        remainingMinutes,
        remainingSeconds
      );

      timerElement.textContent = `Time remaining: ${formattedTime}`; // Update the timer display

     
    }, 1000);
  }

  function stopCountdown() {
    clearInterval(countdownInterval);
    const countdownElement = document.getElementById('countdown');
    countdownElement.textContent = 'Countdown stopped';
  }


*/
