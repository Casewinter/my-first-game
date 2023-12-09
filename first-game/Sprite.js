/**
 * A maoria dos jogos usa um shapebox
 * Faremos o mesmo. Um retangulo simples vai definir
 * os limites do personagem
 */

/**
 * @typedef {Object} Position
 * @property {number} x - Posicao no eixo x.
 * @property {number} y - Posicao no eixo y.
 */

/** Modelo para criar personagem.
 * @param {Position} position.
 * @returns {Position}
 */
class Sprite {
  constructor(position) {
    this.position = position;
  }

  /**
   * Definir a funcao que vai redenrizar os personagen
   */
  draw() {}
}
