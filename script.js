let is24Hour = true;
let alarms = [];
let soundOn = true;

// CLOCK
function updateClock() {
  const now = new Date();

  let h = now.getHours();
  let m = now.getMinutes();
  let s = now.getSeconds();

  let ampm = "";

  if (!is24Hour) {
    ampm = h >= 12 ? " PM" : " AM";
    h = h % 12 || 12;
  }

  h = String(h).padStart(2, "0");
  m = String(m).padStart(2, "0");
  s = String(s).padStart(2, "0");

  document.getElementById("clock").innerText =
    `${h}:${m}:${s}${ampm}`;

  checkAlarms(`${h}:${m}`);
}

setInterval(updateClock, 1000);

// FORMAT TOGGLE
function toggleFormat() {
  is24Hour = !is24Hour;
}

// SOUND TOGGLE
function toggleSound() {
  soundOn = !soundOn;
  alert(soundOn ? "Sound ON 🔊" : "Sound OFF ");
}

// ADD ALARM
function addAlarm() {
  const time = document.getElementById("alarmTime").value;
  if (!time) return alert("Select time");

  alarms.push(time);
  renderAlarms();
}

// DISPLAY ALARMS
function renderAlarms() {
  const list = document.getElementById("alarmList");
  list.innerHTML = "";

  alarms.forEach((alarm, index) => {
    list.innerHTML += `
      <li>
        ${alarm}
        <button onclick="deleteAlarm(${index})"> Edit </button>
        <button onclick="snooze(${index})"></button>
      </li>
    `;
  });
}

// DELETE
function deleteAlarm(index) {
  alarms.splice(index, 1);
  renderAlarms();
}

// CHECK ALARMS
function checkAlarms(currentTime) {
  alarms.forEach((alarm, index) => {
    if (alarm === currentTime) {
      triggerAlarm(index);
    }
  });
}

// TRIGGER
function triggerAlarm(index) {
  if (soundOn) {
    document.getElementById("alarmSound").play();
  }

  showNotification("Alarm!", "Wake up!");

  // remove after ringing
  alarms.splice(index, 1);
  renderAlarms();
}

// SNOOZE
function snooze(index) {
  const now = new Date();
  now.setMinutes(now.getMinutes() + 5);

  let h = String(now.getHours()).padStart(2, "0");
  let m = String(now.getMinutes()).padStart(2, "0");

  alarms[index] = `${h}:${m}`;
  renderAlarms();

  alert("Snoozed 5 min ");
}

// NOTIFICATION
function showNotification(title, body) {
  if (Notification.permission === "granted") {
    new Notification(title, { body });
  }
}

// REQUEST PERMISSION
if ("Notification" in window) {
  Notification.requestPermission();
}