const board = document.getElementById("game-board");
const startBtn = document.getElementById("startBtn");
const difficultySelect = document.getElementById("difficulty");
const statusEl = document.getElementById("status");

const emojis = ["🐶", "🍕", "🚗", "🌈", "🐱", "🍎", "🎵", "⚽"];
let cards = [];
let flippedCards = [];
let matched = 0;
let mode = "easy";

startBtn.addEventListener("click", startGame);

function startGame() {
  board.innerHTML = "";
  statusEl.textContent = "";
  matched = 0;
  flippedCards = [];

  const fullset = [...emojis, ...emojis];
  const shuffled = fullset.sort(() => Math.random() - 0.5);

  shuffled.forEach((emoji, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.emoji = emoji;
    card.dataset.index = index;
    card.textContent = "";
    card.addEventListener("click", handleFlip);
    board.appendChild(card);
  });
}

function handleFlip(e) {
  const card = e.currentTarget;

  if (
    card.classList.contains("flipped") ||
    card.classList.contains("matched") ||
    flippedCards >= 2
  ) {
    return;
  }

  card.classList.add("flipped");
  card.textContent = card.dataset.emoji;
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    const [first, second] = flippedCards;
    if (first.dataset.emoji === second.dataset.emoji) {
      first.classList.add("matched");
      second.classList.add("matched");
      flippedCards = [];
      matched++;
      if (matched === emojis.length) {
        setTimeout(() => endGame("You won!!!"), 300);
      }
    } else {
      setTimeout(() => {
        first.classList.remove("flipped");
        second.classList.remove("flipped");
        first.textContent = "";
        second.textContent = "";
        flippedCards = [];
      }, 800);
    }
  }
}

function endGame(message) {
  document
    .querySelectorAll(".card")
    .forEach((card) => card.removeEventListener("click", handleFlip));
  statusEl.textContent = message;
}
