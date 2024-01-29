const dino = document.querySelector(".dino");
const background = document.querySelector(".background");
const scoreSpan = document.querySelector(".background .score span");

let isJumping = false;
let isGameOver = false;
let position = 0;
let scorePoints = 0;

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
  }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 150) {
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          dino.style.bottom = position + "px";
        }
      }, 20);
    } else {
      position += 20;
      dino.style.bottom = position + "px";
    }
  }, 20);
}

function createCactus() {
  const cactus = document.createElement("div");
  let cactusPosition = 2400;
  let randomTime = Math.random() * 3000;

  if (isGameOver) return;

  cactus.classList.add("cactus");
  background.appendChild(cactus);
  cactus.style.left = cactusPosition + "px";

  let leftTimer = setInterval(() => {
    if (cactusPosition < -60) {
      clearInterval(leftTimer);
      background.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      clearInterval(leftTimer);
      gameOver();
    } else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + "px";
    }
  }, 20);

  setTimeout(createCactus, randomTime);
}

function gameOver() {
  isGameOver = true;
  // document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
}

function updateScore() {
  scorePoints++;
  let formattedScore = scorePoints.toString().padStart(5, "0");
  scoreSpan.innerHTML = formattedScore;
}

if (isGameOver);
setInterval(updateScore, 1);
createCactus();

gameLoop();

document.addEventListener("keydown", handleKeyUp);
