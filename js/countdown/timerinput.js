window.addEventListener('DOMContentLoaded', (event) => {
  var maxHour = 100;
  var maxMinute = 60;
  var maxSecond = 60;
  var initialValue = '00';

  var hoursInput = document.getElementById('hours-input');
  var prevHoursBtn = document.getElementById('prev-hours');
  var nextHoursBtn = document.getElementById('next-hours');
  var minutesInput = document.getElementById('minutes-input');
  var prevMinutesBtn = document.getElementById('prev-minutes');
  var nextMinutesBtn = document.getElementById('next-minutes');
  var secondsInput = document.getElementById('seconds-input');
  var prevSecondsBtn = document.getElementById('prev-seconds');
  var nextSecondsBtn = document.getElementById('next-seconds');

  hoursInput.value = initialValue;
  minutesInput.value = initialValue;
  secondsInput.value = initialValue;

  // Prevent moving input around
  hoursInput.addEventListener('dragstart', function (event) {
    event.preventDefault();
  });

  minutesInput.addEventListener('dragstart', function (event) {
    event.preventDefault();
  });

  secondsInput.addEventListener('dragstart', function (event) {
    event.preventDefault();
  });

  hoursInput.addEventListener('mousedown', function (event) {
    event.preventDefault();
    hoursInput.focus();
  });

  minutesInput.addEventListener('mousedown', function (event) {
    event.preventDefault();
    minutesInput.focus();
  });

  secondsInput.addEventListener('mousedown', function (event) {
    event.preventDefault();
    secondsInput.focus();
  });

  // Remove value on focus (When user clicks field)
  hoursInput.addEventListener('focus', function () {
    if (hoursInput.value === initialValue) {
      hoursInput.value = ''; // Remove the initial value on focus
    }
  });

  minutesInput.addEventListener('focus', function () {
    if (minutesInput.value === initialValue) {
      minutesInput.value = ''; // Remove the initial value on focus
    }
  });

  secondsInput.addEventListener('focus', function () {
    if (secondsInput.value === initialValue) {
      secondsInput.value = ''; // Remove the initial value on focus
    }
  });

  // Blur (Triggered when an element loses focus)
  hoursInput.addEventListener('blur', () => {
    if (hoursInput.value === '') hoursInput.value = initialValue;
    let hours = parseInt(hoursInput.value);
    if (!isNaN(hours)) hoursInput.value = formatNumber(hours);
  });

  minutesInput.addEventListener('blur', () => {
    if (minutesInput.value === '') minutesInput.value = initialValue;
    let minutes = parseInt(minutesInput.value);
    if (!isNaN(minutes)) minutesInput.value = formatNumber(minutes);
  });

  secondsInput.addEventListener('blur', () => {
    if (secondsInput.value === '') secondsInput.value = initialValue;
    let seconds = parseInt(secondsInput.value);
    if (!isNaN(seconds)) secondsInput.value = formatNumber(seconds);
  });

  // Wheel Scroll
  hoursInput.addEventListener('wheel', (event) =>
    handleWheelScroll(event, maxHour)
  );
  minutesInput.addEventListener('wheel', (event) =>
    handleWheelScroll(event, maxMinute)
  );
  secondsInput.addEventListener('wheel', (event) =>
    handleWheelScroll(event, maxSecond)
  );

  // Single click to highlight numbers
  hoursInput.addEventListener('click', function () {
    hoursInput.setSelectionRange(0, hoursInput.value.length);
  });

  // Non numeric characters and maximum values for manual input
  hoursInput.addEventListener('input', function () {
    this.value = this.value.replace(/\D/g, ''); // Remove non-numeric characters

    if (isNaN(this.value) || this.value > maxHour) this.value = maxHour; // Set the value to the maximum allowed
    if (isNaN(this.value) || this.value < 0) this.value = 0; // Set the value to the maximum allowed
  });

  minutesInput.addEventListener('input', function () {
    this.value = this.value.replace(/\D/g, ''); // Remove non-numeric characters

    if (isNaN(this.value) || this.value > maxMinute) this.value = maxMinute; // Set the value to the maximum allowed
    if (isNaN(this.value) || this.value < 0) this.value = 0; // Set the value to the maximum allowed
  });

  secondsInput.addEventListener('input', function () {
    this.value = this.value.replace(/\D/g, ''); // Remove non-numeric characters

    if (isNaN(this.value) || this.value > maxSecond) this.value = maxSecond; // Set the value to the maximum allowed
    if (isNaN(this.value) || this.value < 0) this.value = 0; // Set the value to the maximum allowed
  });

  // Clear on double click
  hoursInput.addEventListener('dblclick', function () {
    this.value = '';
  });

  minutesInput.addEventListener('dblclick', function () {
    this.value = '';
  });

  secondsInput.addEventListener('dblclick', function () {
    this.value = '';
  });

  // Previous Button
  prevHoursBtn.addEventListener('click', () => {
    let hours = parseInt(hoursInput.value);
    if (hours > 0) {
      hours--;
    } else {
      hours = maxHour - 1;
    }
    hoursInput.value = formatNumber(hours);
  });

  prevMinutesBtn.addEventListener('click', () => {
    let minutes = parseInt(minutesInput.value);
    if (minutes > 0) {
      minutes--;
    } else {
      minutes = maxMinute - 1;
    }
    minutesInput.value = formatNumber(minutes);
  });

  prevSecondsBtn.addEventListener('click', () => {
    let seconds = parseInt(secondsInput.value);
    if (seconds > 0) {
      seconds--;
    } else {
      seconds = maxSecond - 1;
    }
    secondsInput.value = formatNumber(seconds);
  });

  // Next Button
  nextHoursBtn.addEventListener('click', () => {
    let hours = parseInt(hoursInput.value);
    if (isNaN(hours)) hours = 0;
    if (hours < maxHour - 1) {
      hours++;
    } else {
      hours = 0;
    }
    hoursInput.value = formatNumber(hours);
  });

  nextMinutesBtn.addEventListener('click', () => {
    let minutes = parseInt(minutesInput.value);
    if (isNaN(minutes)) minutes = 0;
    if (minutes < maxMinute - 1) {
      minutes++;
    } else {
      minutes = 0;
    }
    minutesInput.value = formatNumber(minutes);
  });

  nextSecondsBtn.addEventListener('click', () => {
    let seconds = parseInt(secondsInput.value);
    if (isNaN(seconds)) seconds = 0;
    if (seconds < maxSecond - 1) {
      seconds++;
    } else {
      seconds = 0;
    }
    secondsInput.value = formatNumber(seconds);
  });

  function formatNumber(number) {
    return number.toString().padStart(2, '0');
  }

  function handleWheelScroll(event, maxTime) {
    const inputField = event.target;
    const delta = Math.sign(event.deltaY);

    // Get the current value and parse it as an integer
    let value = parseInt(inputField.value);

    if (isNaN(value)) value = 0;

    // Increment or decrement the value based on the scroll direction
    if (delta < 0) {
      value = (value + 1) % maxTime; // Increment hours and wrap around to 0 when reaching 24
    } else {
      value = (value - 1 + maxTime) % maxTime; // Decrement hours and wrap around to 23 when reaching -1
    }

    inputField.value = formatNumber(value);
  }
});
