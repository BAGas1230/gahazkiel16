const cards = document.querySelectorAll(".card");
let current = 1;

/* STACK EFFECT */
function updateCards() {
  cards.forEach((card, i) => {
    let offset = i - current;

    card.style.zIndex = 10 - Math.abs(offset);

    if (offset === 0) {
      card.style.transform = "translate(-50%, -50%) scale(1)";
      card.style.opacity = "1";
    } else {
      card.style.transform = `translate(${offset * 120}px, -50%) scale(0.8)`;
      card.style.opacity = "0.6";
    }
  });
}
updateCards();

/* SWIPE */
const stack = document.getElementById("stack");

let startX = 0;
let isDragging = false;
let isSwiping = false;

/* START */
function start(e) {
  isDragging = true;
  isSwiping = false;
  startX = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
}

/* MOVE */
function move(e) {
  if (!isDragging) return;

  let currentX = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
  let diff = currentX - startX;

  if (Math.abs(diff) > 10) {
    isSwiping = true;
  }
}

/* END */
function end(e) {
  if (!isDragging) return;
  isDragging = false;

  let endX = e.type.includes("mouse") ? e.clientX : e.changedTouches[0].clientX;
  let diff = startX - endX;

  if (isSwiping) {
    // SWIPE
    if (diff > 50 && current < cards.length - 1) current++;
    else if (diff < -50 && current > 0) current--;

    updateCards();
  } else {
    // TAP / CLICK
    openPlayer();
  }
}

/* EVENT LISTENER */
stack.addEventListener("mousedown", start);
stack.addEventListener("mousemove", move);
stack.addEventListener("mouseup", end);

stack.addEventListener("touchstart", start);
stack.addEventListener("touchmove", move);
stack.addEventListener("touchend", end);

/* PLAYER */
const landing = document.getElementById('landing');
const playerPage = document.getElementById('playerPage');
const audio = document.getElementById('audio');
const playBtn = document.getElementById('playBtn');
const miniPlayer = document.getElementById('miniPlayer');
const miniPlayBtn = document.getElementById('miniPlayBtn');

const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');

let isPlaying = false;

/* OPEN PLAYER */
function openPlayer() {
  landing.classList.add('hidden');
  playerPage.classList.remove('hidden');
  miniPlayer.classList.add('hidden');
}

/* BACK */
function goBack() {
  playerPage.classList.add('hidden');
  landing.classList.remove('hidden');
  if (isPlaying) miniPlayer.classList.remove('hidden');
}

/* CLICK CARD */


/* PLAY */
function togglePlay() {
  if (isPlaying) {
    audio.pause();
    playBtn.textContent = '▶';
    miniPlayBtn.textContent = '▶';
  } else {
    audio.play();
    playBtn.textContent = '⏸';
    miniPlayBtn.textContent = '⏸';
    miniPlayer.classList.remove('hidden');
  }
  isPlaying = !isPlaying;
}

playBtn.onclick = togglePlay;
miniPlayBtn.onclick = togglePlay;

/* TIME */
function formatTime(t) {
  if (isNaN(t)) return "0:00";
  let m = Math.floor(t / 60);
  let s = Math.floor(t % 60);
  return m + ":" + (s < 10 ? "0" : "") + s;
}

audio.addEventListener("timeupdate", () => {
  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);
});