import Phaser from 'phaser';

const GOLD = 0xf2b632;
const GOLD_DARK = 0xb66a16;
const NAVY = 0x092855;
const NAVY_LIGHT = 0x17457b;
const RED = 0xb71922;
const SKIN = 0xf2a66f;

export function createGameTextures(scene: Phaser.Scene) {
  createHero(scene);
  createParticles(scene);
  createCap(scene);
}

function createHero(scene: Phaser.Scene) {
  if (scene.textures.exists('hero-game')) return;
  const g = scene.add.graphics();

  // Shoes and short legs.
  g.fillStyle(0x07101d).fillRoundedRect(46, 356, 70, 34, 15).fillRoundedRect(125, 356, 70, 34, 15);
  g.fillStyle(0x112c50).fillRoundedRect(58, 299, 54, 76, 14).fillRoundedRect(128, 299, 54, 76, 14);
  g.lineStyle(5, 0x07162b).strokeRoundedRect(58, 299, 54, 76, 14).strokeRoundedRect(128, 299, 54, 76, 14);

  // Suit body, belly and arms.
  g.fillStyle(NAVY).fillRoundedRect(35, 173, 170, 164, 42);
  g.lineStyle(6, 0x05162f).strokeRoundedRect(35, 173, 170, 164, 42);
  g.fillStyle(NAVY_LIGHT, 0.65).fillRoundedRect(45, 184, 62, 135, 28).fillRoundedRect(134, 184, 61, 135, 28);
  g.fillStyle(NAVY).fillRoundedRect(14, 189, 45, 130, 23).fillRoundedRect(181, 189, 45, 130, 23);
  g.fillStyle(SKIN).fillCircle(34, 313, 21).fillCircle(206, 313, 21);
  g.lineStyle(3, 0xb66f48).strokeCircle(34, 313, 21).strokeCircle(206, 313, 21);

  // Shirt and oversized stock tie.
  g.fillStyle(0xfff4de).fillTriangle(76, 178, 120, 222, 103, 254).fillTriangle(164, 178, 120, 222, 137, 254);
  g.fillStyle(RED).fillTriangle(107, 207, 133, 207, 138, 232).fillTriangle(120, 222, 91, 323, 149, 323);
  g.lineStyle(4, 0x761019).strokeTriangle(107, 207, 133, 207, 138, 232).strokeTriangle(120, 222, 91, 323, 149, 323);
  g.fillStyle(0xf04747, 0.55).fillTriangle(116, 232, 111, 306, 126, 306);

  // Round adult face.
  g.fillStyle(SKIN).fillEllipse(120, 132, 178, 172);
  g.lineStyle(5, 0xc77b48).strokeEllipse(120, 132, 178, 172);
  g.fillStyle(0xe5945f).fillCircle(39, 141, 20).fillCircle(201, 141, 20);

  // Smooth, massive, low hair shape. No individual strand texture.
  g.fillStyle(GOLD_DARK).fillEllipse(120, 83, 220, 142);
  g.fillStyle(GOLD).fillEllipse(117, 66, 226, 132);
  g.fillCircle(34, 118, 45).fillCircle(205, 116, 43);
  g.fillTriangle(10, 111, 45, 129, 10, 161).fillTriangle(229, 108, 194, 132, 233, 160);
  g.fillStyle(0xffd35a, 0.48).fillEllipse(105, 39, 150, 34);
  g.lineStyle(5, GOLD_DARK, 0.7).beginPath().moveTo(16, 104).lineTo(225, 104).strokePath();

  // Straight, softly rounded human nose and tiny pursed lips.
  g.fillStyle(0xdd8755).fillRoundedRect(112, 110, 17, 43, 8);
  g.fillStyle(SKIN).fillCircle(120, 151, 14);
  g.lineStyle(3, 0xb86946).beginPath().moveTo(111, 151).lineTo(107, 154).moveTo(129, 151).lineTo(133, 154).strokePath();
  g.fillStyle(0xb52b32).fillEllipse(114, 174, 18, 14).fillEllipse(126, 174, 18, 14);
  g.fillStyle(0x65131c).fillCircle(120, 175, 6);
  g.fillStyle(0xff7d78, 0.7).fillEllipse(120, 169, 15, 4);

  // Lapels and button.
  g.lineStyle(5, 0x041831).beginPath().moveTo(66, 181).lineTo(103, 252).lineTo(78, 239).moveTo(174, 181).lineTo(137, 252).lineTo(163, 239).strokePath();
  g.fillStyle(0xe0ab37).fillCircle(120, 273, 6);

  g.generateTexture('hero-game', 240, 400);
  g.destroy();
}

function createParticles(scene: Phaser.Scene) {
  if (scene.textures.exists('spark')) return;
  const g = scene.add.graphics();
  g.fillStyle(0xffffff).fillCircle(8, 8, 7); g.generateTexture('spark', 16, 16); g.clear();
  g.fillStyle(0xffd34f).fillTriangle(8, 0, 11, 6, 16, 8).fillTriangle(16, 8, 11, 10, 8, 16).fillTriangle(8, 16, 5, 10, 0, 8).fillTriangle(0, 8, 5, 6, 8, 0);
  g.generateTexture('star-spark', 16, 16); g.clear();
  g.fillStyle(0xffe29a).fillEllipse(10, 6, 18, 9).fillTriangle(2, 6, 0, 18, 12, 8); g.generateTexture('feather', 20, 20);
  g.destroy();
}

function createCap(scene: Phaser.Scene) {
  if (scene.textures.exists('red-cap')) return;
  const g = scene.add.graphics();
  g.fillStyle(0x7f0d17).fillEllipse(180, 157, 320, 84);
  g.fillStyle(RED).fillRoundedRect(28, 18, 304, 176, 75);
  g.lineStyle(8, 0x7b0b14).strokeRoundedRect(28, 18, 304, 176, 75);
  g.fillStyle(0xd42a31).fillEllipse(180, 174, 348, 72);
  g.lineStyle(6, 0x7b0b14).strokeEllipse(180, 174, 348, 72);
  g.lineStyle(3, 0xf25959, 0.55).beginPath().moveTo(180, 22).lineTo(180, 137).moveTo(105, 30).lineTo(122, 140).moveTo(255, 30).lineTo(238, 140).strokePath();
  g.fillStyle(0xa8141d).fillCircle(180, 19, 13);
  g.generateTexture('red-cap', 360, 220);
  g.destroy();
}
