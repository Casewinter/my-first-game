import { gravity } from "../utils/physics.d";

/** Modelo para criar personagem.
 * A maioria dos jogos usa um shapebox
 * Faremos o mesmo. Um retangulo simples vai definir
 * os limites do personagem
 */
class Sprite {
  //passar tudo como um obj ajuda a nao ter que lembrar a ordem do argumentos
  constructor({ position, velocity, ctx, heightCanvas, color, offset }) {
    this.position = position;
    this.velocity = velocity;
    this.height = 150;
    this.width = 50;
    this.ctx = ctx;
    this.heightCanvas = heightCanvas;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset,
      width: 100,
      height: 50,
    };
    this.color = color;
    this.isAttacking = false;
    this.health = 100;
  }

  //Funcao que vai redenrizar os personagens
  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );

    this.ctx.fillStyle = "green";
    //Attack box
    if (this.isAttacking) {
      this.ctx.fillRect(
        this.attackBox.position.x,
        this.attackBox.position.y,
        this.attackBox.width,
        this.attackBox.height
      );
    }
    // console.log(this.keys);
  }

  //Funcao que vai re-redenrizar os personagens
  update() {
    this.draw();

    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y;

    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;

    /*
     Como o canvas comeca do canto superior esquerdo, a altura do
     obj eh invertida. Entao quando calculamos altura mais a posicao
     achamos onde ele bate no 'chao' da tela
     */

    if (this.position.y + this.height + this.velocity.y >= this.heightCanvas) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += gravity;
    }
  }
  attack() {
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }
}

export default Sprite;
