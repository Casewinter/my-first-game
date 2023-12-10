import "./style.css";
import Sprite from "./components/Sprite.d.js";

import { rectangularCollision } from "./utils/physics.d.js";

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const height = 576;
canvas.width = 1024;
canvas.height = 576;

ctx.fillRect(0, 0, canvas.width, canvas.height);

//Teclas de movimentacao
const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
};

//Criando os personagens

//player
const player = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 2,
    y: 0,
  },
  ctx,
  heightCanvas: height,
  control: "player",
  color: "red",
  offset: {
    x: 0,
    y: 0,
  },
});

//inimigo
const enemy = new Sprite({
  position: {
    x: 400,
    y: 10,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  ctx,
  heightCanvas: height,
  color: "blue",
  offset: {
    x: -50,
    y: 0,
  },
});

//Nome disso é closure. Só usei porque é legal
function timer(n) {
  let time = n;
  function decreaseTimer() {
    if (time > 0) {
      setTimeout(decreaseTimer, 1000);
      time--;
      document.getElementById("timer").innerText = time;
    }
  }
  return decreaseTimer;
}
const start = timer(10);

start();

/** Funcao que gera os frames do jogo
 * Ela também controle os limtes da tela
 */
function animate() {
  /* Recursao
   * A funcao chama a si mesma
   * e garante que vai continuar a renderizar novos quadros
   */
  window.requestAnimationFrame(animate);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();

  // player movement

  if (keys.a.pressed && player.lastKey === "a") {
    player.velocity.x = -5;
  } else if (keys.d.pressed && player.lastKey === "d") {
    player.velocity.x = 5;
  } else {
    player.velocity.x = 0;
  }

  // Enemy movement
  if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
    enemy.velocity.x = -5;
  } else if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
    enemy.velocity.x = 5;
  } else {
    enemy.velocity.x = 0;
  }

  //Colisao e dano
  if (
    rectangularCollision({
      rectangle1: player,
      rectangle2: enemy,
    }) &&
    player.isAttacking
  ) {
    player.isAttacking = false;
    enemy.health -= 10;
    document.getElementById("enemyHealth").style.width = `${enemy.health}%`;
  }

  if (
    rectangularCollision({
      rectangle1: enemy,
      rectangle2: player,
    }) &&
    enemy.isAttacking
  ) {
    enemy.isAttacking = false;
    player.health -= 10;
    document.getElementById("playerHealth").style.width = `${player.health}%`;
  }
}

animate();

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = true;
      player.lastKey = "d";
      break;
    case "a":
      keys.a.pressed = true;
      player.lastKey = "a";
      break;
    case "w":
      player.velocity.y = -20;
      break;
    case " ":
      player.attack();
      break;
  }

  switch (event.key) {
    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      enemy.lastKey = "ArrowRight";
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      enemy.lastKey = "ArrowLeft";
      break;
    case "ArrowUp":
      enemy.velocity.y = -20;
      break;
    case "ArrowDown":
      enemy.attack();
      break;
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
  }

  // enemy keys
  switch (event.key) {
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
  }
});
