import "./style.css";
import Sprite from "./Sprite.d";
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const height = 576;
canvas.width = 1024;
canvas.height = 576;

ctx.fillRect(0, 0, canvas.width, canvas.height);

//Criando os personagens

//player
const player = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  ctx,
  heightCanvas: height,
});

//inimigo
const enemy = new Sprite({
  position: {
    x: 400,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 10,
  },
  ctx,
  heightCanvas: height,
});

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
}

animate();
