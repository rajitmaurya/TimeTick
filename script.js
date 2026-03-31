let is24Hour = true;

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