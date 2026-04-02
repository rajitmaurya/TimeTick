let is24Hour = true;
let snoozeTime = null;
function updateClock() {
  const now = new Date();

  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  let ampm = "";

  if (!is24Hour) {
    ampm = hours >= 12 ? " PM" : " AM";
    hours = hours % 12 || 12;
  }

  // Add leading zero
  hours = hours.toString().padStart(2, "0");
  minutes = minutes.toString().padStart(2, "0");
  seconds = seconds.toString().padStart(2, "0");

  document.getElementById("clock").innerText =
    `${hours}:${minutes}:${seconds}${ampm}`;
}

// update every second
setInterval(updateClock, 1000);

// format toggle
function toggleFormat() {
  is24Hour = !is24Hour;
  updateClock();
}

// initial call
updateClock();



let alarmTime = null;
let isAlarmSet = false;

function setAlarm() {
  const input = document.getElementById("alarmTime").value;
  
  if (!input) {
    alert("Please select time!");
    return;
  }

  alarmTime = input;
  isAlarmSet = true;
  alert("Alarm set for " + alarmTime);
}

function clearAlarm() {
  alarmTime = null;
  isAlarmSet = false;
  document.getElementById("alarmSound").pause();
  alert("Alarm cleared!");
}

function updateClock() {
  const now = new Date();

  let hours = now.getHours().toString().padStart(2, "0");
  let minutes = now.getMinutes().toString().padStart(2, "0");
  let seconds = now.getSeconds().toString().padStart(2, "0");

  document.getElementById("clock").innerText =
    `${hours}:${minutes}:${seconds}`;

  // Alarm check
  if (isAlarmSet && `${hours}:${minutes}` === alarmTime) {
    document.getElementById("alarmSound").play();
    isAlarmSet = false; // ek baar hi chale
  }
}

setInterval(updateClock, 1000);

function snoozeAlarm() {
  if (!alarmTime) return;

  const now = new Date();
  now.setMinutes(now.getMinutes() + 5);

  let hours = now.getHours().toString().padStart(2, "0");
  let minutes = now.getMinutes().toString().padStart(2, "0");

  snoozeTime = `${hours}:${minutes}`;

  document.getElementById("alarmSound").pause();
  alert("Snoozed for 5 minutes 😴");
}