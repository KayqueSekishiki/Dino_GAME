const dino = document.querySelector(".dino");
const background = document.querySelector(".background");
const scoreSpan = document.querySelector(".background .score span");
const button = document.getElementsByTagName("button");

let isJumping = false;
let isGameOver = false;
let position = 0;
let scorePoints = 0;

function handleKeyUp(event) {
  if (isGameOver) console.log(button[0].onclick());
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
  document.body.innerHTML = `
    <div class="game-over">
      <h1>Fim de jogo</h1>
      <p>
        Você acumulou <span>${scorePoints}</span> pontos!
      </p>
      <button onclick="window.location.reload()">Reiniciar</button>
    </div>`;
}

function updateScore() {
  if (isGameOver) return;
  scorePoints++;
  let formattedScore = scorePoints.toString().padStart(5, "0");
  scoreSpan.innerHTML = formattedScore;
}

setInterval(updateScore, 1);
createCactus();

document.addEventListener("keydown", handleKeyUp);
