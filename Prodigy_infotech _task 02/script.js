let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;

const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");
const needle = document.getElementById("needle");
const innerNeedle = document.getElementById("inner-needle");
const digitalTime = document.getElementById("digital-time");


const ticksContainer = document.getElementById("tick-marks");
for (let i = 0; i < 60; i++) {
  const tick = document.createElement("div");
  tick.className = "tick";
  tick.style.transform = `rotate(${i * 6}deg) translateX(-50%)`;
  ticksContainer.appendChild(tick);
}


const innerTicks = document.getElementById("inner-tick-marks");
for (let i = 0; i < 30; i++) {
  const tick = document.createElement("div");
  tick.className = "inner-tick";
  tick.style.transform = `rotate(${i * 12}deg) translateX(-50%)`;
  innerTicks.appendChild(tick);
}


function updateDisplay(time) {
  const ms = Math.floor((time % 1000) / 10); 
  const sec = Math.floor((time / 1000) % 60); 
  const min = Math.floor(time / 60000); 

  digitalTime.textContent =
    `${String(min).padStart(2, '0')}:` +
    `${String(sec).padStart(2, '0')}.` +
    `${String(ms).padStart(2, '0')}`;

  
  const totalSeconds = time / 1000;
  const degrees = (totalSeconds % 60) * 6;
  needle.style.transform = `rotate(${degrees}deg)`;

  
  const innerDegrees = min * 6; 
  innerNeedle.style.transform = `rotate(${innerDegrees}deg)`;
}


function toggleStopwatch() {
  if (!running) {
    running = true;
    startBtn.textContent = "⏸"; // Pause icon
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay(elapsedTime);
    }, 10);
  } else {
    running = false;
    startBtn.textContent = "▶"; // Play icon
    clearInterval(timerInterval);
  }
}


function resetStopwatch() {
  running = false;
  clearInterval(timerInterval);
  elapsedTime = 0;
  startBtn.textContent = "▶"; 
  updateDisplay(0);
}


startBtn.addEventListener("click", toggleStopwatch);
pauseBtn.addEventListener("click", toggleStopwatch); // Pause also toggles start/pause
resetBtn.addEventListener("click", resetStopwatch);


updateDisplay(0);
