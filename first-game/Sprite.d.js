/** Modelo para criar personagem.
 * A maioria dos jogos usa um shapebox
 * Faremos o mesmo. Um retangulo simples vai definir
 * os limites do personagem
 */
class Sprite {
  constructor({ position, velocity, ctx, heightCanvas }) {
    this.position = position;
    this.velocity = velocity;
    this.height = 150;
    this.ctx = ctx;
    this.heightCanvas = heightCanvas;
  }

  /*
   * Funcao que vai redenrizar os personagens
   */
  draw() {
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(this.position.x, this.position.y, 50, this.height);

    /**
     * Como o canvas comeca do canto superior esquerdo, a altura do
     * obj e invertida. Entao quando calculamos altura mais a posicao
     * achamos onde ele bate no 'chao' da tela
     */
    const limitBottom = this.position.y + this.height + this.velocity.y;

    if (limitBottom >= this.heightCanvas) {
      this.velocity.y = 0;
    }
  }
  /*
   * Funcao que vai re-redenrizar os personagens
   */
  update() {
    this.draw();
    this.position.y += this.velocity.y;
  }
}

export default Sprite;
