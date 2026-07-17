import Phaser from 'phaser';
import './styles.css';
import { MISSIONS, missionById, type MissionDefinition, type MissionKind } from './missions';
import { createGameTextures } from './art';

const W = 480;
const H = 854;
const NAVY = 0x071a38;
const RED = 0xb71922;
const GOLD = 0xf2bf49;
const CREAM = '#fff2d4';
const STORAGE = 'chickenhimout-progress-v1';

type Locale = 'en' | 'ru' | 'es' | 'pt' | 'fr' | 'de';
type Progress = { unlocked: number; clout: number; best: Record<number, number>; chickens: Record<number, number>; selectedTie: string; ownedTies: string[]; onboarded: boolean; muted: boolean; haptics: boolean; locale: Locale; golfBest: number; dailyKey: number; dailyStreak: number; dailyBest: number };
type RunResult = { mission: number; score: number; chickens: number; label: string; chaos: number; seed: number; daily?: boolean; onboarding?: boolean };
type HeroPose = 'idle' | 'pull' | 'airborne' | 'impact' | 'panic' | 'sneak' | 'run' | 'victory';

const LOCALES: Locale[] = ['en', 'ru', 'es', 'pt', 'fr', 'de'];
const COPY: Record<Locale, Record<string, string>> = {
  en: { tap: 'TAP TO START THE MESS', hall: 'HALL OF ACHIEVEMENTS', campaign: 'THE CAMPAIGN', continue: 'CONTINUE CAMPAIGN', start: 'START THE MESS', daily: 'DAILY\nDISASTER', golf: 'CHICKEN\nGOLF', locked: 'GOLF\nLOCKED', ties: 'TIES', settings: 'SETTINGS', choose: 'CHOOSE YOUR NEXT PROMISE', drag: 'DRAG • AIM • RELEASE', worse: 'MAKE IT WORSE…', bail: 'CHICKEN OUT!', sound: 'SOUND', haptics: 'HAPTICS', language: 'LANGUAGE', on: 'ON', off: 'OFF', back: 'BACK', reset: 'RESET PROGRESS', resetAsk: 'TAP AGAIN TO CONFIRM' },
  ru: { tap: 'НАЖМИ И НАЧНИ БАРДАК', hall: 'ЗАЛ ДОСТИЖЕНИЙ', campaign: 'КАМПАНИЯ', continue: 'ПРОДОЛЖИТЬ', start: 'НАЧАТЬ БАРДАК', daily: 'АВАРИЯ\nДНЯ', golf: 'ЦЫПЛЯЧИЙ\nГОЛЬФ', locked: 'ГОЛЬФ\nЗАКРЫТ', ties: 'ГАЛСТУКИ', settings: 'НАСТРОЙКИ', choose: 'ВЫБЕРИ НОВОЕ ОБЕЩАНИЕ', drag: 'ТЯНИ • ЦЕЛЬСЯ • ПУСКАЙ', worse: 'СДЕЛАЙ ЕЩЁ ХУЖЕ…', bail: 'СБЕЖАТЬ!', sound: 'ЗВУК', haptics: 'ВИБРАЦИЯ', language: 'ЯЗЫК', on: 'ВКЛ', off: 'ВЫКЛ', back: 'НАЗАД', reset: 'СБРОСИТЬ ПРОГРЕСС', resetAsk: 'НАЖМИ ЕЩЁ РАЗ' },
  es: { tap: 'TOCA Y EMPIEZA EL LÍO', hall: 'SALÓN DE LOGROS', campaign: 'LA CAMPAÑA', continue: 'CONTINUAR', start: 'EMPEZAR EL LÍO', daily: 'DESASTRE\nDIARIO', golf: 'CHICKEN\nGOLF', locked: 'GOLF\nBLOQUEADO', ties: 'CORBATAS', settings: 'AJUSTES', choose: 'ELIGE LA PRÓXIMA PROMESA', drag: 'TIRA • APUNTA • SUELTA', worse: 'HAZLO PEOR…', bail: '¡HUYE!', sound: 'SONIDO', haptics: 'VIBRACIÓN', language: 'IDIOMA', on: 'SÍ', off: 'NO', back: 'VOLVER', reset: 'BORRAR PROGRESO', resetAsk: 'TOCA OTRA VEZ' },
  pt: { tap: 'TOQUE E COMECE A BAGUNÇA', hall: 'SALÃO DE CONQUISTAS', campaign: 'A CAMPANHA', continue: 'CONTINUAR', start: 'COMEÇAR A BAGUNÇA', daily: 'DESASTRE\nDIÁRIO', golf: 'CHICKEN\nGOLF', locked: 'GOLFE\nBLOQUEADO', ties: 'GRAVATAS', settings: 'AJUSTES', choose: 'ESCOLHA A PRÓXIMA PROMESSA', drag: 'PUXE • MIRE • SOLTE', worse: 'PIORA TUDO…', bail: 'FUJA!', sound: 'SOM', haptics: 'VIBRAÇÃO', language: 'IDIOMA', on: 'SIM', off: 'NÃO', back: 'VOLTAR', reset: 'APAGAR PROGRESSO', resetAsk: 'TOQUE NOVAMENTE' },
  fr: { tap: 'TOUCHE ET LANCE LE CHAOS', hall: 'GALERIE DES EXPLOITS', campaign: 'LA CAMPAGNE', continue: 'CONTINUER', start: 'LANCER LE CHAOS', daily: 'DÉSASTRE\nDU JOUR', golf: 'CHICKEN\nGOLF', locked: 'GOLF\nVERROUILLÉ', ties: 'CRAVATES', settings: 'RÉGLAGES', choose: 'CHOISIS LA PROCHAINE PROMESSE', drag: 'TIRE • VISE • LÂCHE', worse: 'FAIS PIRE…', bail: 'FUIS !', sound: 'SON', haptics: 'VIBRATIONS', language: 'LANGUE', on: 'OUI', off: 'NON', back: 'RETOUR', reset: 'EFFACER LA PROGRESSION', resetAsk: 'TOUCHE ENCORE' },
  de: { tap: 'TIPPEN UND CHAOS STARTEN', hall: 'HALLE DER ERFOLGE', campaign: 'DIE KAMPAGNE', continue: 'WEITERSPIELEN', start: 'CHAOS STARTEN', daily: 'TAGES-\nDESASTER', golf: 'CHICKEN\nGOLF', locked: 'GOLF\nGESPERRT', ties: 'KRAWATTEN', settings: 'EINSTELLUNGEN', choose: 'WÄHLE DAS NÄCHSTE VERSPRECHEN', drag: 'ZIEH • ZIEL • LOS', worse: 'MACH ES SCHLIMMER…', bail: 'HAU AB!', sound: 'TON', haptics: 'VIBRATION', language: 'SPRACHE', on: 'AN', off: 'AUS', back: 'ZURÜCK', reset: 'FORTSCHRITT LÖSCHEN', resetAsk: 'NOCHMAL TIPPEN' }
};

function detectedLocale(): Locale {
  const code = (navigator.language || 'en').slice(0, 2).toLowerCase() as Locale;
  return LOCALES.includes(code) ? code : 'en';
}

function t(key: string) {
  const locale = loadProgress().locale;
  return COPY[locale]?.[key] || COPY.en[key] || key;
}

const TIES = [
  { id: 'classic', name: 'CLASSIC RED', color: 0xa9141f, shine: 0xff5a59, cost: 0 },
  { id: 'gold', name: 'ABSOLUTE GOLD', color: 0xd99a1b, shine: 0xffe083, cost: 120 },
  { id: 'navy', name: 'VERY SERIOUS', color: 0x173f73, shine: 0x69a8ef, cost: 180 },
  { id: 'bubblegum', name: 'ALTERNATIVE PINK', color: 0xc62d76, shine: 0xff8fc4, cost: 240 },
  { id: 'midnight', name: 'MIDNIGHT DEAL', color: 0x3c225e, shine: 0xa97ce3, cost: 320 },
  { id: 'chicken', name: 'GOLDEN CHICKEN', color: 0xe85d18, shine: 0xffd04b, cost: 450 }
];

function loadProgress(): Progress {
  try {
    return { unlocked: 1, clout: 0, best: {}, chickens: {}, selectedTie: 'classic', ownedTies: ['classic'], onboarded: false, muted: false, haptics: true, locale: detectedLocale(), golfBest: 0, dailyKey: 0, dailyStreak: 0, dailyBest: 0, ...JSON.parse(localStorage.getItem(STORAGE) || '{}') };
  } catch { return { unlocked: 1, clout: 0, best: {}, chickens: {}, selectedTie: 'classic', ownedTies: ['classic'], onboarded: false, muted: false, haptics: true, locale: detectedLocale(), golfBest: 0, dailyKey: 0, dailyStreak: 0, dailyBest: 0 }; }
}

function saveProgress(progress: Progress) { localStorage.setItem(STORAGE, JSON.stringify(progress)); }

function haptic(pattern: number | number[]) { try { if (loadProgress().haptics) navigator.vibrate?.(pattern); } catch { /* optional */ } }

class AudioManager {
  private ctx?: AudioContext;
  private musicTimer?: number;
  private beat = 0;
  unlock() {
    if (loadProgress().muted) return;
    try {
      const AudioCtx = window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx ||= new AudioCtx();
      if (this.ctx.state === 'suspended') void this.ctx.resume();
    } catch { /* optional enhancement */ }
  }
  tone(frequency: number, duration = 0.08, type: OscillatorType = 'sine', volume = 0.055) {
    if (loadProgress().muted) return;
    this.unlock();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator(); const gain = this.ctx.createGain();
    osc.type = type; osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);
    gain.gain.setValueAtTime(volume, this.ctx.currentTime); gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
    osc.connect(gain).connect(this.ctx.destination); osc.start(); osc.stop(this.ctx.currentTime + duration);
  }
  startMusic() {
    if (loadProgress().muted || this.musicTimer) return;
    this.unlock();
    const notes = [110, 147, 165, 147, 123, 147, 196, 165];
    this.musicTimer = window.setInterval(() => {
      if (loadProgress().muted) return;
      this.tone(notes[this.beat++ % notes.length], 0.18, 'triangle', 0.012);
      if (this.beat % 2 === 0) this.tone(55, 0.06, 'sine', 0.016);
    }, 430);
  }
  stopMusic() { if (this.musicTimer) window.clearInterval(this.musicTimer); this.musicTimer = undefined; }
}

const audio = new AudioManager();
const tone = (frequency: number, duration = 0.08, type: OscillatorType = 'sine') => audio.tone(frequency, duration, type);

function textStyle(size: number, color = CREAM, align: 'left' | 'center' | 'right' = 'center'): Phaser.Types.GameObjects.Text.TextStyle {
  return { fontFamily: 'Arial Rounded MT Bold, Inter, Arial, sans-serif', fontSize: `${size}px`, fontStyle: 'bold', color, align, stroke: '#07101f', strokeThickness: Math.max(2, Math.round(size / 10)), shadow: { offsetX: 0, offsetY: 3, color: '#000000', blur: 4, fill: true } };
}

function makeButton(scene: Phaser.Scene, x: number, y: number, w: number, h: number, label: string, onClick: () => void, color = RED) {
  const shadow = scene.add.rectangle(x, y + 5, w, h, 0x040a15, 0.55).setOrigin(0.5);
  const bg = scene.add.rectangle(x, y, w, h, color, 1).setOrigin(0.5).setStrokeStyle(4, GOLD);
  const shine = scene.add.rectangle(x, y - h * 0.28, w - 10, 3, 0xffffff, 0.25);
  const labelText = scene.add.text(x, y, label, textStyle(Math.min(24, h * 0.35))).setOrigin(0.5);
  bg.setInteractive({ useHandCursor: true }).on('pointerdown', () => {
    scene.tweens.add({ targets: [bg, labelText], scaleX: 0.96, scaleY: 0.96, duration: 70, yoyo: true, onComplete: onClick });
  });
  return scene.add.container(0, 0, [shadow, bg, shine, labelText]);
}

function strokeCurve(graphics: Phaser.GameObjects.Graphics, from: Phaser.Math.Vector2, control: Phaser.Math.Vector2, to: Phaser.Math.Vector2, segments = 24) {
  const curve = new Phaser.Curves.QuadraticBezier(from, control, to);
  graphics.strokePoints(curve.getPoints(segments), false, false);
}

class BootScene extends Phaser.Scene {
  constructor() { super('boot'); }
  preload() {
    this.load.image('hero-premium', './assets/hero-clean.png');
    const heroPoses: HeroPose[] = ['idle', 'pull', 'airborne', 'impact', 'panic', 'sneak', 'run', 'victory'];
    heroPoses.forEach((pose) => this.load.image(`hero-${pose}`, `./assets/production/hero/${pose}.png`));
    this.load.image('bg-wall', './assets/production/backgrounds/wall.webp');
  }
  create() {
    createGameTextures(this);
    const g = this.add.graphics();
    g.fillStyle(0xffffff).fillCircle(32, 32, 30);
    g.generateTexture('ball', 64, 64); g.clear();
    g.fillStyle(0xffd15c).fillCircle(32, 32, 30).lineStyle(4, 0x9d5b00).strokeCircle(32, 32, 29);
    g.generateTexture('coin', 64, 64); g.clear();
    const params = new URLSearchParams(location.search);
    const directMode = params.get('mode');
    const directMission = Number(params.get('mission'));
    const challengeScore = Number(params.get('challenge'));
    const challengeSeed = Number(params.get('seed'));
    if (Number.isSafeInteger(challengeSeed) && challengeSeed > 0) this.registry.set('runSeed', challengeSeed);
    if (directMode === 'golf') this.scene.start('golf');
    else if (directMode === 'daily') {
      const day = Math.floor(Date.now() / 86400000);
      this.registry.set('missionId', (day % MISSIONS.length) + 1); this.registry.set('runSeed', day); this.registry.set('daily', true); this.scene.start('game');
    }
    else if (directMode === 'wardrobe') this.scene.start('wardrobe');
    else if (directMode === 'settings') this.scene.start('settings');
    else if (directMission >= 1 && directMission <= MISSIONS.length) {
      this.registry.set('missionId', directMission);
      this.registry.set('daily', params.get('daily') === '1');
      if (Number.isFinite(challengeScore) && challengeScore > 0) this.registry.set('challengeScore', challengeScore);
      this.scene.start('game');
    } else this.scene.start('splash');
  }
}

class SplashScene extends Phaser.Scene {
  constructor() { super('splash'); }
  create() {
    const g = this.add.graphics();
    g.fillGradientStyle(0x173d6b, 0x173d6b, 0x020a18, 0x020a18).fillRect(0, 0, W, H);
    g.fillStyle(0xf6c35a, 0.12).fillTriangle(155, 0, 325, 0, 405, 630).fillTriangle(95, 0, 190, 0, 15, 590);
    for (let i = 0; i < 28; i++) g.fillStyle(i % 2 ? GOLD : 0xd82d34, 0.65).fillRect(Phaser.Math.Between(18, W - 18), Phaser.Math.Between(30, H - 80), 5, 11);

    const hero = this.add.image(W / 2, 532, 'hero-idle').setDisplaySize(168, 291).setAlpha(0);
    const cap = this.add.image(W / 2, -150, 'red-cap').setDisplaySize(390, 238).setDepth(5);
    const capCopy = this.add.text(W / 2, 214, 'MAKE HIM\nCHICKEN OUT\nAGAIN', { ...textStyle(27, '#fff2d4'), lineSpacing: -2 }).setOrigin(0.5).setDepth(6).setAlpha(0);
    const logoPlate = this.add.rectangle(W / 2, 632, 420, 90, 0x7f111a).setStrokeStyle(7, GOLD).setDepth(7).setScale(0.7).setAlpha(0);
    const logo = this.add.text(W / 2, 632, 'CHICKEN HIM OUT', textStyle(35, '#ffd052')).setOrigin(0.5).setDepth(8).setScale(0.7).setAlpha(0);
    const line = this.add.text(W / 2, 696, 'PROMISE BIG. LEAVE BIGGER.', textStyle(12, '#c9ddf1')).setOrigin(0.5).setAlpha(0);
    const prompt = this.add.text(W / 2, 784, t('tap'), textStyle(17, '#fff4d8')).setOrigin(0.5).setAlpha(0);

    this.tweens.add({ targets: cap, y: 270, duration: 620, ease: 'Bounce.easeOut' });
    this.tweens.add({ targets: capCopy, alpha: 1, delay: 410, duration: 220 });
    this.tweens.add({ targets: hero, alpha: 1, y: 518, delay: 480, duration: 420, ease: 'Back.easeOut' });
    this.tweens.add({ targets: [logoPlate, logo], alpha: 1, scale: 1, delay: 720, duration: 350, ease: 'Back.easeOut' });
    this.tweens.add({ targets: [line, prompt], alpha: 1, delay: 980, duration: 260 });
    this.tweens.add({ targets: prompt, scale: 1.045, duration: 650, delay: 1250, yoyo: true, repeat: -1 });

    this.input.once('pointerdown', () => {
      audio.unlock(); audio.startMusic();
      tone(330, 0.11, 'triangle'); haptic(20);
      const progress = loadProgress();
      const target = progress.onboarded ? 'menu' : 'game';
      if (!progress.onboarded) { this.registry.set('missionId', 1); this.registry.set('runSeed', 0); this.registry.set('daily', false); this.registry.set('onboarding', true); }
      this.cameras.main.fadeOut(260, 5, 14, 32, (_: unknown, p: number) => { if (p === 1) this.scene.start(target); });
    });
  }
}

class MenuScene extends Phaser.Scene {
  private progress = loadProgress();
  constructor() { super('menu'); }
  create() {
    this.progress = loadProgress();
    const bg = this.add.graphics();
    bg.fillGradientStyle(0x173c68, 0x173c68, 0x06152d, 0x06152d).fillRect(0, 0, W, H);
    bg.fillStyle(0x7c141c).fillRoundedRect(18, 18, W - 36, 94, 22).lineStyle(6, GOLD).strokeRoundedRect(18, 18, W - 36, 94, 22);
    this.add.text(W / 2, 48, 'CHICKEN', textStyle(34, '#ffd052')).setOrigin(0.5);
    this.add.text(W / 2, 82, 'HIM OUT', textStyle(32, '#fff5dc')).setOrigin(0.5);
    this.add.text(W / 2, 126, t('hall'), textStyle(12, '#f2c86b')).setOrigin(0.5);
    const gear = this.add.text(440, 132, '⚙', textStyle(22, '#f2c86b')).setOrigin(0.5).setInteractive({ useHandCursor: true });
    gear.on('pointerdown', () => this.scene.start('settings'));

    // Gold frames: the campaign remains visually dominant.
    const frameY = 190;
    this.add.rectangle(W / 2, frameY + 75, 426, 194, 0xead7ab).setStrokeStyle(8, GOLD);
    this.add.rectangle(W / 2, frameY + 75, 406, 174, 0x0b2446).setStrokeStyle(2, 0x9f6e22);
    this.add.text(W / 2, frameY + 19, t('campaign'), textStyle(22, '#ffd45c')).setOrigin(0.5);
    this.add.text(W / 2, frameY + 58, `${Math.min(this.progress.unlocked - 1, 15)} / 15 MISSIONS CLEARED`, textStyle(14)).setOrigin(0.5);
    const totalChickens = Object.values(this.progress.chickens).reduce((a, b) => a + b, 0);
    this.add.text(W / 2, frameY + 88, `CHICKENS ${totalChickens}/45     CLOUT ${this.progress.clout}`, textStyle(13, '#f8cc58')).setOrigin(0.5);
    makeButton(this, W / 2, frameY + 136, 300, 54, this.progress.unlocked === 1 ? t('start') : t('continue'), () => this.scene.start('campaign'));

    const desk = this.add.graphics();
    desk.fillStyle(0x4b260f).fillRoundedRect(0, 620, W, 234, 30).lineStyle(8, 0xb87828).strokeRoundedRect(-5, 620, W + 10, 240, 30);
    desk.fillStyle(0x6c3617).fillRoundedRect(35, 672, 410, 170, 18);
    this.add.image(W / 2, 542, 'hero-idle').setDisplaySize(168, 291).setDepth(2);

    const daily = makeButton(this, 104, 450, 164, 68, t('daily'), () => {
      const day = Math.floor(Date.now() / 86400000);
      this.registry.set('missionId', (day % MISSIONS.length) + 1); this.registry.set('runSeed', day); this.registry.set('daily', true); this.scene.start('game');
    }, 0x284f7b);
    daily.setDepth(4);
    if (this.progress.dailyStreak > 0) this.add.text(104, 495, `🔥 ${this.progress.dailyStreak} DAY STREAK`, textStyle(9, '#ffd35c')).setOrigin(0.5).setDepth(5);
    const golfUnlocked = this.progress.unlocked >= 4;
    const golf = makeButton(this, 376, 450, 164, 68, golfUnlocked ? t('golf') : t('locked'), () => { if (golfUnlocked) this.scene.start('golf'); }, golfUnlocked ? 0x2c704a : 0x4a4a4a);
    golf.setDepth(4);

    const ties = this.add.text(80, 744, t('ties'), textStyle(14, '#f2c86b')).setOrigin(0.5).setDepth(5).setInteractive({ useHandCursor: true });
    ties.on('pointerdown', () => this.scene.start('wardrobe'));
    const records = this.add.text(398, 744, 'RECORDS', textStyle(14, '#f2c86b')).setOrigin(0.5).setDepth(5).setInteractive({ useHandCursor: true });
    records.on('pointerdown', () => this.scene.start('records'));
    this.add.text(W / 2, 812, 'PROMISE BIG • DELIVER CHAOS • LEAVE', textStyle(11, '#e9bd61')).setOrigin(0.5).setDepth(5);
  }
}

class CampaignScene extends Phaser.Scene {
  constructor() { super('campaign'); }
  create() {
    const progress = loadProgress();
    this.cameras.main.setBackgroundColor('#071a38');
    this.add.text(W / 2, 36, 'CAMPAIGN', textStyle(30, '#ffd35c')).setOrigin(0.5);
    this.add.text(W / 2, 71, t('choose'), textStyle(12)).setOrigin(0.5);
    makeButton(this, 54, 38, 74, 40, '←', () => this.scene.start('menu'), 0x284f7b);

    const list = this.add.container(0, 0);
    let y = 110;
    let lastChapter = '';
    MISSIONS.forEach((m) => {
      if (m.chapter !== lastChapter) {
        list.add(this.add.text(26, y, m.chapter, textStyle(13, '#f2bf49', 'left')).setOrigin(0, 0.5));
        y += 32; lastChapter = m.chapter;
      }
      const unlocked = m.id <= progress.unlocked;
      const card = this.add.rectangle(W / 2, y + 38, 430, 68, unlocked ? 0x173960 : 0x172233, 1).setStrokeStyle(3, unlocked ? m.accent : 0x526070);
      const n = this.add.text(45, y + 38, unlocked ? String(m.id).padStart(2, '0') : '—', textStyle(18, unlocked ? '#ffd35c' : '#718096')).setOrigin(0.5);
      const title = this.add.text(78, y + 25, m.title, textStyle(15, unlocked ? '#fff1d3' : '#718096', 'left')).setOrigin(0, 0.5);
      const kicker = this.add.text(78, y + 49, unlocked ? m.kicker : 'CLASSIFIED PROMISE', textStyle(10, unlocked ? '#b9d6ee' : '#536171', 'left')).setOrigin(0, 0.5);
      const chicks = progress.chickens[m.id] || 0;
      const rank = this.add.text(415, y + 38, unlocked ? '★'.repeat(chicks) + '·'.repeat(3 - chicks) : '', textStyle(14, '#ffd35c', 'right')).setOrigin(1, 0.5);
      list.add([card, n, title, kicker, rank]);
      if (unlocked) card.setInteractive({ useHandCursor: true }).on('pointerdown', () => {
        this.registry.set('missionId', m.id); this.registry.set('runSeed', 0); this.registry.set('daily', false); this.scene.start('game');
      });
      y += 78;
    });
    this.cameras.main.setBounds(0, 0, W, y + 30);
    this.input.on('wheel', (_p: unknown, _go: unknown, _dx: number, dy: number) => this.cameras.main.scrollY = Phaser.Math.Clamp(this.cameras.main.scrollY + dy * 0.6, 0, Math.max(0, y - H + 30)));
    let dragY = 0; let startScroll = 0;
    this.input.on('pointerdown', (p: Phaser.Input.Pointer) => { dragY = p.y; startScroll = this.cameras.main.scrollY; });
    this.input.on('pointermove', (p: Phaser.Input.Pointer) => { if (p.isDown) this.cameras.main.scrollY = Phaser.Math.Clamp(startScroll + dragY - p.y, 0, Math.max(0, y - H + 30)); });
  }
}

class WardrobeScene extends Phaser.Scene {
  constructor() { super('wardrobe'); }
  create() {
    const progress = loadProgress();
    const g = this.add.graphics();
    g.fillGradientStyle(0x173c68, 0x173c68, 0x06152d, 0x06152d).fillRect(0, 0, W, H);
    this.add.text(W / 2, 42, 'THE TIE CABINET', textStyle(27, '#ffd35c')).setOrigin(0.5);
    this.add.text(W / 2, 78, `CLOUT ${progress.clout}`, textStyle(13)).setOrigin(0.5);
    makeButton(this, 48, 42, 66, 38, '←', () => this.scene.start('menu'), 0x284f7b);
    this.add.image(W / 2, 275, 'hero-idle').setDisplaySize(176, 305);
    this.add.text(W / 2, 453, 'THE TIE CHANGES YOUR ELASTIC TRAIL', textStyle(11, '#b8d5ed')).setOrigin(0.5);
    TIES.forEach((tie, index) => {
      const col = index % 2, row = Math.floor(index / 2); const x = 128 + col * 224, y = 520 + row * 92;
      const owned = progress.ownedTies.includes(tie.id); const selected = progress.selectedTie === tie.id;
      const card = this.add.rectangle(x, y, 200, 74, selected ? 0x254f78 : 0x102c4f).setStrokeStyle(selected ? 5 : 3, selected ? 0xffffff : tie.shine).setInteractive({ useHandCursor: true });
      this.add.rectangle(x - 70, y, 24, 52, tie.color).setStrokeStyle(3, tie.shine);
      this.add.text(x - 45, y - 14, tie.name, textStyle(11, '#fff2d4', 'left')).setOrigin(0, 0.5);
      this.add.text(x - 45, y + 14, selected ? 'EQUIPPED' : owned ? 'SELECT' : `${tie.cost} CLOUT`, textStyle(10, selected ? '#70e49b' : '#ffd35c', 'left')).setOrigin(0, 0.5);
      card.on('pointerdown', () => {
        const p = loadProgress();
        if (!p.ownedTies.includes(tie.id)) {
          if (p.clout < tie.cost) { tone(120, 0.16, 'sawtooth'); haptic(80); return; }
          p.clout -= tie.cost; p.ownedTies.push(tie.id);
        }
        p.selectedTie = tie.id; saveProgress(p); tone(620, 0.12, 'triangle'); haptic(25); this.scene.restart();
      });
    });
  }
}

class SettingsScene extends Phaser.Scene {
  private resetArmed = false;
  constructor() { super('settings'); }
  create() {
    const progress = loadProgress();
    const g = this.add.graphics();
    g.fillGradientStyle(0x173c68, 0x173c68, 0x06152d, 0x06152d).fillRect(0, 0, W, H);
    g.fillStyle(0xf2bf49, 0.1); for (let y = 118; y < H; y += 72) g.fillRect(0, y, W, 2);
    this.add.text(W / 2, 56, t('settings'), textStyle(30, '#ffd35c')).setOrigin(0.5);
    makeButton(this, 55, 54, 76, 40, '←', () => this.scene.start('menu'), 0x284f7b);
    this.add.image(W / 2, 220, 'hero-idle').setDisplaySize(138, 239);

    const row = (y: number, label: string, value: string, action: () => void, color = 0x28527e) => {
      this.add.text(48, y, label, textStyle(16, '#fff2d4', 'left')).setOrigin(0, 0.5);
      makeButton(this, 370, y, 150, 48, value, action, color);
    };
    row(374, t('sound'), progress.muted ? t('off') : t('on'), () => {
      const p = loadProgress(); p.muted = !p.muted; saveProgress(p);
      if (p.muted) audio.stopMusic(); else { audio.unlock(); audio.startMusic(); tone(520, 0.1, 'triangle'); }
      this.scene.restart();
    }, progress.muted ? 0x5a3b46 : 0x2e704b);
    row(448, t('haptics'), progress.haptics ? t('on') : t('off'), () => {
      const p = loadProgress(); p.haptics = !p.haptics; saveProgress(p); haptic(30); this.scene.restart();
    }, progress.haptics ? 0x2e704b : 0x5a3b46);
    row(522, t('language'), progress.locale.toUpperCase(), () => {
      const p = loadProgress(); const next = (LOCALES.indexOf(p.locale) + 1) % LOCALES.length;
      p.locale = LOCALES[next]; saveProgress(p); tone(440, 0.08, 'triangle'); this.scene.restart();
    });

    const reset = makeButton(this, W / 2, 650, 330, 54, t('reset'), () => {
      if (!this.resetArmed) {
        this.resetArmed = true;
        const warning = this.add.text(W / 2, 700, t('resetAsk'), textStyle(13, '#ff8b8b')).setOrigin(0.5);
        this.time.delayedCall(2800, () => { this.resetArmed = false; warning.destroy(); });
        tone(130, 0.14, 'sawtooth'); return;
      }
      const fresh: Progress = { unlocked: 1, clout: 0, best: {}, chickens: {}, selectedTie: 'classic', ownedTies: ['classic'], onboarded: false, muted: progress.muted, haptics: progress.haptics, locale: progress.locale, golfBest: 0, dailyKey: 0, dailyStreak: 0, dailyBest: 0 };
      saveProgress(fresh); this.scene.start('splash');
    }, 0x7d2630);
    reset.setDepth(3);
    this.add.text(W / 2, 787, 'CHICKENHIMOUT  •  RC', textStyle(11, '#8fb1d1')).setOrigin(0.5);
  }
}

class RecordsScene extends Phaser.Scene {
  constructor() { super('records'); }
  create() {
    const progress = loadProgress();
    this.cameras.main.setBackgroundColor('#071a38');
    this.add.text(W / 2, 44, 'THE RECORD', textStyle(30, '#ffd35c')).setOrigin(0.5).setScrollFactor(0).setDepth(20);
    this.add.text(W / 2, 78, 'EVERY FAILURE, BEAUTIFULLY DOCUMENTED', textStyle(11, '#b9d6ee')).setOrigin(0.5).setScrollFactor(0).setDepth(20);
    makeButton(this, 52, 43, 72, 38, '←', () => this.scene.start('menu'), 0x284f7b).setScrollFactor(0).setDepth(21);
    const totalChickens = Object.values(progress.chickens).reduce((a, b) => a + b, 0);
    const badges = [
      { label: 'FIRST ESCAPE', earned: progress.unlocked > 1 },
      { label: 'PERFECT MESS', earned: Object.values(progress.chickens).some((v) => v === 3) },
      { label: '500 CLOUT', earned: progress.clout >= 500 },
      { label: 'GOLF FIXER', earned: progress.golfBest >= 5 }
    ];
    badges.forEach((badge, i) => {
      const x = 75 + i * 110;
      this.add.circle(x, 133, 38, badge.earned ? GOLD : 0x26364c).setStrokeStyle(4, badge.earned ? 0xffe49a : 0x526070);
      this.add.text(x, 129, badge.earned ? '★' : '?', textStyle(28, badge.earned ? '#fff2d4' : '#718096')).setOrigin(0.5);
      this.add.text(x, 180, badge.label, { ...textStyle(9, badge.earned ? '#ffd35c' : '#718096'), wordWrap: { width: 92 } }).setOrigin(0.5);
    });
    this.add.text(W / 2, 220, `${totalChickens}/45 CHICKENS  •  ${progress.clout} CLOUT  •  GOLF ${progress.golfBest}`, textStyle(12, '#ffd35c')).setOrigin(0.5);
    let y = 268;
    MISSIONS.forEach((mission) => {
      const chickens = progress.chickens[mission.id] || 0; const score = progress.best[mission.id] || 0;
      const card = this.add.rectangle(W / 2, y, 430, 62, chickens ? 0x163b61 : 0x111e32).setStrokeStyle(3, chickens ? mission.accent : 0x34445b);
      this.add.text(35, y, String(mission.id).padStart(2, '0'), textStyle(16, chickens ? '#ffd35c' : '#627086')).setOrigin(0, 0.5);
      this.add.text(76, y - 10, mission.title, textStyle(13, chickens ? '#fff2d4' : '#627086', 'left')).setOrigin(0, 0.5);
      this.add.text(76, y + 13, score ? `BEST ${score.toLocaleString()}` : 'NO OFFICIAL FAILURE YET', textStyle(9, chickens ? '#b9d6ee' : '#536171', 'left')).setOrigin(0, 0.5);
      this.add.text(438, y, '★'.repeat(chickens) + '·'.repeat(3 - chickens), textStyle(14, '#ffd35c', 'right')).setOrigin(1, 0.5);
      if (chickens) card.setInteractive({ useHandCursor: true }).on('pointerdown', () => { this.registry.set('missionId', mission.id); this.registry.set('runSeed', 0); this.registry.set('daily', false); this.scene.start('game'); });
      y += 72;
    });
    this.cameras.main.setBounds(0, 0, W, y + 25);
    let dragY = 0; let startScroll = 0;
    this.input.on('pointerdown', (p: Phaser.Input.Pointer) => { dragY = p.y; startScroll = this.cameras.main.scrollY; });
    this.input.on('pointermove', (p: Phaser.Input.Pointer) => { if (p.isDown) this.cameras.main.scrollY = Phaser.Math.Clamp(startScroll + dragY - p.y, 0, y - H + 25); });
    this.input.on('wheel', (_p: unknown, _go: unknown, _dx: number, dy: number) => this.cameras.main.scrollY = Phaser.Math.Clamp(this.cameras.main.scrollY + dy * 0.6, 0, y - H + 25));
  }
}

type PhysicsObject = Phaser.GameObjects.Rectangle | Phaser.GameObjects.Ellipse | Phaser.GameObjects.Image;

class GameScene extends Phaser.Scene {
  private mission!: MissionDefinition;
  private daily = false;
  private hero!: Phaser.Physics.Matter.Image;
  private objects: PhysicsObject[] = [];
  private nodes = new Set<string>();
  private chaos = 0;
  private promise = 0;
  private accountability = 0;
  private launchedAt = 0;
  private dragging = false;
  private launched = false;
  private bailed = false;
  private finished = false;
  private anchor = new Phaser.Math.Vector2(72, 730);
  private aim = new Phaser.Math.Vector2(72, 650);
  private tie!: Phaser.GameObjects.Graphics;
  private trajectory!: Phaser.GameObjects.Graphics;
  private chaosText!: Phaser.GameObjects.Text;
  private phaseText!: Phaser.GameObjects.Text;
  private objectiveText!: Phaser.GameObjects.Text;
  private dangerText!: Phaser.GameObjects.Text;
  private promiseBar!: Phaser.GameObjects.Rectangle;
  private accountBar!: Phaser.GameObjects.Rectangle;
  private bailButton!: Phaser.GameObjects.Container;
  private instruction!: Phaser.GameObjects.Text;
  private timer?: Phaser.Time.TimerEvent;
  private tieStyle = TIES[0];
  private onboarding = false;
  private sparks!: Phaser.GameObjects.Particles.ParticleEmitter;
  private feathers!: Phaser.GameObjects.Particles.ParticleEmitter;
  private combo = 0;
  private lastHitAt = 0;
  private briefingOpen = false;
  private currentPose: HeroPose = 'idle';
  private runSeed = 0;

  constructor() { super('game'); }
  create() {
    this.resetState();
    this.matter.world.setGravity(0, 1.05);
    this.mission = missionById(Number(this.registry.get('missionId') || 1));
    this.onboarding = Boolean(this.registry.get('onboarding'));
    this.registry.set('onboarding', false);
    this.tieStyle = TIES.find((t) => t.id === loadProgress().selectedTie) || TIES[0];
    this.daily = Boolean(this.registry.get('daily'));
    this.registry.set('daily', false);
    const requestedSeed = Number(this.registry.get('runSeed') || 0);
    this.runSeed = Number.isSafeInteger(requestedSeed) && requestedSeed > 0 ? requestedSeed : Math.floor(Date.now() % 2147483647);
    this.registry.set('runSeed', this.runSeed);
    Phaser.Math.RND.sow([String(this.runSeed)]);
    this.matter.world.setBounds(0, 88, W, H - 88, 64, true, true, true, true);
    this.makeBackdrop();
    this.makeHud();
    this.buildMission(this.mission.kind);
    this.createHero();
    this.tie = this.add.graphics().setDepth(30);
    this.trajectory = this.add.graphics().setDepth(29);
    this.sparks = this.add.particles(0, 0, 'star-spark', { speed: { min: 90, max: 240 }, angle: { min: 205, max: 335 }, lifespan: 520, gravityY: 380, quantity: 0, scale: { start: 0.85, end: 0 }, alpha: { start: 1, end: 0 } }).setDepth(42);
    this.feathers = this.add.particles(0, 0, 'feather', { speed: { min: 70, max: 190 }, angle: { min: 190, max: 350 }, lifespan: 900, gravityY: 180, rotate: { min: -180, max: 180 }, quantity: 0, scale: { start: 0.85, end: 0.25 }, alpha: { start: 1, end: 0 } }).setDepth(43);
    this.makeBriefing();
    this.bindInput();
    this.matter.world.on('collisionstart', this.onCollision, this);
  }

  private resetState() {
    this.objects = []; this.nodes.clear(); this.chaos = 0; this.promise = 0; this.accountability = 0; this.combo = 0; this.lastHitAt = 0;
    this.launchedAt = 0; this.dragging = false; this.launched = false; this.bailed = false; this.finished = false;
    this.briefingOpen = false; this.currentPose = 'idle';
  }

  private makeBackdrop() {
    if (this.mission.kind === 'wall') {
      this.add.image(W / 2, H / 2, 'bg-wall').setDisplaySize(W, H).setDepth(-20);
      this.add.rectangle(W / 2, H / 2, W, H, 0x071a38, 0.08).setDepth(-19);
      this.add.rectangle(W / 2, 49, W, 98, 0x071a38, 0.72).setDepth(-18);
      this.add.rectangle(W / 2, 146, 438, 84, 0x071a38, 0.62).setStrokeStyle(2, 0xf2bf49, 0.42).setDepth(3);
      this.add.text(W / 2, 118, this.daily ? 'DAILY DISASTER' : this.mission.chapter, textStyle(11, '#ffd35c')).setOrigin(0.5).setDepth(5);
      this.add.text(W / 2, 145, this.mission.title, textStyle(22)).setOrigin(0.5).setDepth(5);
      this.add.text(W / 2, 171, this.mission.kicker.toUpperCase(), textStyle(10, '#d8e9f5')).setOrigin(0.5).setDepth(5);
      return;
    }
    const g = this.add.graphics();
    g.fillGradientStyle(this.mission.sky, this.mission.sky, Phaser.Display.Color.IntegerToColor(this.mission.sky).darken(45).color, Phaser.Display.Color.IntegerToColor(this.mission.sky).darken(45).color).fillRect(0, 0, W, H);
    g.fillStyle(0xffffff, 0.13).fillCircle(70, 190, 55).fillCircle(112, 180, 42).fillCircle(380, 210, 70);
    this.addMissionDecor(g, this.mission.kind);
    g.fillStyle(this.mission.ground).fillRect(0, 680, W, 174);
    g.fillStyle(0x000000, 0.18).fillRect(0, 680, W, 16);
    this.add.text(W / 2, 118, this.daily ? 'DAILY DISASTER' : this.mission.chapter, textStyle(11, '#ffd35c')).setOrigin(0.5).setDepth(5);
    this.add.text(W / 2, 145, this.mission.title, textStyle(22)).setOrigin(0.5).setDepth(5);
    this.add.text(W / 2, 171, this.mission.kicker.toUpperCase(), textStyle(10, '#d8e9f5')).setOrigin(0.5).setDepth(5);
  }

  private addMissionDecor(g: Phaser.GameObjects.Graphics, kind: MissionKind) {
    const faint = 0.16;
    if (kind === 'wall') {
      g.fillStyle(0x0b3157, 0.32);
      for (let x = 0; x < W; x += 54) g.fillRect(x, 505 + (x % 108 ? 35 : 0), 48, 175);
      g.lineStyle(3, 0xffffff, 0.12); for (let x = 24; x < W; x += 54) g.lineBetween(x, 520, x, 680);
    } else if (kind === 'tariff' || kind === 'factory') {
      g.lineStyle(9, 0x091d2d, 0.34).lineBetween(70, 250, 70, 650).lineBetween(70, 250, 290, 250).lineBetween(290, 250, 350, 330);
      g.fillStyle(0xf3c454, 0.22).fillTriangle(350, 330, 333, 305, 365, 305);
      if (kind === 'factory') { for (let x = 35; x < 450; x += 82) g.fillStyle(0x152432, 0.36).fillRect(x, 430, 58, 250); }
    } else if (kind === 'coin') {
      g.fillStyle(0xffffff, 0.75); for (let i = 0; i < 36; i++) g.fillCircle(Phaser.Math.Between(8, W - 8), Phaser.Math.Between(188, 640), Phaser.Math.Between(1, 2));
      g.lineStyle(5, 0x68e080, 0.34).beginPath().moveTo(45, 570).lineTo(122, 525).lineTo(188, 545).lineTo(270, 430).lineTo(360, 455).lineTo(455, 290).strokePath();
      g.fillStyle(0xffffff, 0.12).fillCircle(402, 260, 72);
    } else if (kind === 'island') {
      g.fillStyle(0xffffff, 0.38).fillTriangle(0, 500, 90, 335, 186, 500).fillTriangle(90, 500, 225, 300, 360, 500).fillTriangle(280, 500, 410, 350, 480, 490);
      g.lineStyle(3, 0xffffff, 0.22); for (let y = 525; y < 675; y += 28) g.lineBetween(0, y, W, y + 5);
    } else if (kind === 'ocean') {
      g.lineStyle(2, 0xd8f3ff, faint); for (let y = 230; y < 670; y += 45) g.lineBetween(0, y, W, y);
      for (let x = 10; x < W; x += 55) g.lineBetween(x, 200, x + 40, 680);
      g.fillStyle(0xffffff, 0.14).fillTriangle(40, 510, 120, 365, 200, 510).fillTriangle(340, 520, 405, 390, 470, 520);
    } else if (kind === 'storm') {
      g.fillStyle(0x17263c, 0.5).fillCircle(80, 285, 78).fillCircle(160, 270, 98).fillCircle(262, 300, 75);
      g.fillStyle(0xf7cf54, 0.5).fillTriangle(125, 335, 178, 335, 144, 410).fillTriangle(260, 350, 305, 350, 275, 420);
      g.lineStyle(2, 0x91bad8, 0.23); for (let x = 20; x < W; x += 35) g.lineBetween(x, 330, x - 30, 440);
    } else if (kind === 'seasons') {
      g.fillStyle(0x8d3c34, 0.24).fillRect(0, 270, W, 410);
      g.lineStyle(3, 0xffe7c0, 0.16); for (let y = 280; y < 680; y += 38) for (let x = y % 76 ? -35 : 0; x < W; x += 76) g.strokeRect(x, y, 72, 34);
      g.fillStyle(0x1c4028, 0.45).fillCircle(55, 590, 85).fillCircle(420, 610, 110);
    } else if (kind === 'crowd') {
      g.fillStyle(0x081d35, 0.45); for (let y = 290; y < 670; y += 72) g.fillRect(0, y, W, 48);
      g.fillStyle(0xffffff, 0.62); for (let x = 35; x < W; x += 68) g.fillCircle(x, 220, 8);
      g.lineStyle(4, 0xffffff, 0.2).lineBetween(0, 245, W, 245);
    } else if (kind === 'letters' || kind === 'plug') {
      g.fillStyle(0x061325, 0.52); for (let x = 0; x < W; x += 62) g.fillRect(x, 330 + (x % 124 ? 55 : 0), 54, 350);
      for (let x = 15; x < W; x += 38) for (let y = 380; y < 640; y += 55) g.fillStyle((x + y) % 3 ? 0x4db7ff : 0xff4464, 0.24).fillRect(x, y, 10, 18);
    } else if (kind === 'cards') {
      g.lineStyle(4, 0xffc53d, 0.2); for (let i = -4; i < 9; i++) g.lineBetween(W / 2, 380, i * 100, 680);
      g.lineStyle(2, 0x9b68dd, 0.28); for (let y = 300; y < 680; y += 55) g.strokeRoundedRect(40, y, 400, 35, 10);
    } else if (kind === 'dinner') {
      g.fillStyle(0x6b1422, 0.46).fillTriangle(0, 170, 180, 170, 0, 610).fillTriangle(W, 170, W - 180, 170, W, 610);
      g.lineStyle(7, GOLD, 0.25).lineBetween(0, 180, 185, 180).lineBetween(W, 180, W - 185, 180);
      g.fillStyle(0xfff0bf, 0.2).fillEllipse(W / 2, 610, 520, 150);
    } else if (kind === 'ballroom') {
      for (const x of [42, 132, 348, 438]) { g.fillStyle(0xf5dfad, 0.2).fillRoundedRect(x - 20, 260, 40, 420, 12); g.fillStyle(GOLD, 0.2).fillRect(x - 28, 280, 56, 18); }
      g.lineStyle(4, GOLD, 0.28).lineBetween(W / 2, 180, W / 2, 250);
      g.fillStyle(GOLD, 0.3).fillCircle(W / 2, 275, 38);
    } else if (kind === 'finale') {
      g.fillStyle(GOLD, 0.18); for (let i = 0; i < 8; i++) g.fillRect(180 + i * 26, 260 + i * 48, 180, 18);
      g.fillStyle(0xffffff, 0.4); for (let i = 0; i < 20; i++) g.fillCircle(Phaser.Math.Between(15, W - 15), Phaser.Math.Between(190, 620), Phaser.Math.Between(2, 5));
    }
  }

  private makeHud() {
    this.add.rectangle(W / 2, 44, W, 88, NAVY, 0.96).setDepth(50);
    this.phaseText = this.add.text(W / 2, 21, '1  HIT THE PROMISES', textStyle(15, '#ffd35c')).setOrigin(0.5).setDepth(52);
    this.objectiveText = this.add.text(18, 53, `${this.mission.targetLabel}  0/${this.onboarding ? 1 : this.mission.target}`, textStyle(11, '#ffffff', 'left')).setOrigin(0, 0.5).setDepth(52);
    this.chaosText = this.add.text(W / 2, 53, 'MESS  0', textStyle(11, '#ffffff')).setOrigin(0.5).setDepth(52);
    this.dangerText = this.add.text(401, 53, `OUT IN  ${this.mission.time.toFixed(1)}s`, textStyle(11, '#70e49b', 'right')).setOrigin(1, 0.5).setDepth(52);
    this.add.rectangle(18, 75, 420, 8, 0x1e304d).setOrigin(0, 0.5).setDepth(51).setStrokeStyle(2, 0x795f25);
    this.promiseBar = this.add.rectangle(20, 75, 1, 4, GOLD).setOrigin(0, 0.5).setDepth(52);
    this.accountBar = this.add.rectangle(20, 83, 1, 3, 0x52c879).setOrigin(0, 0.5).setDepth(52);
    makeButton(this, 455, 45, 38, 32, '×', () => this.scene.start('menu'), 0x284f7b).setDepth(60);
  }

  private createHero() {
    this.hero = this.matter.add.image(this.anchor.x, this.anchor.y - 62, 'hero-idle', undefined, { label: 'hero', restitution: 0.65, friction: 0.01, frictionAir: 0.012 });
    this.hero.setDisplaySize(83, 144).setFixedRotation().setDepth(25);
    this.hero.setRectangle(52, 120, { label: 'hero', restitution: 0.65, frictionAir: 0.012 });
    this.hero.setStatic(true);
    this.aim.set(this.hero.x, this.hero.y);
  }

  private setHeroPose(pose: HeroPose, flipX = false) {
    if (!this.hero?.active || this.currentPose === pose && this.hero.flipX === flipX) return;
    const heights: Record<HeroPose, number> = { idle: 144, pull: 142, airborne: 122, impact: 84, panic: 150, sneak: 142, run: 118, victory: 148 };
    this.currentPose = pose;
    this.hero.setTexture(`hero-${pose}`).setDisplaySize(this.textures.get(`hero-${pose}`).getSourceImage().width * heights[pose] / this.textures.get(`hero-${pose}`).getSourceImage().height, heights[pose]).setFlipX(flipX);
  }

  private makeBriefing() {
    if (this.onboarding) {
      const panel = this.add.rectangle(W / 2, 224, 398, 76, 0x071a38, 0.94).setStrokeStyle(4, GOLD).setDepth(70);
      const title = this.add.text(W / 2, 208, 'PULL HIM INTO TROUBLE', textStyle(16, '#ffd35c')).setOrigin(0.5).setDepth(71);
      const sub = this.add.text(W / 2, 238, 'Drag toward the gold promise seals. Then release.', textStyle(10, '#e5f0fa')).setOrigin(0.5).setDepth(71);
      const guide = this.add.graphics().setDepth(69);
      guide.lineStyle(5, 0xffffff, 0.65).lineBetween(92, 625, 285, 410);
      guide.fillStyle(0xffffff, 0.75).fillCircle(92, 625, 13).fillTriangle(276, 396, 301, 405, 287, 426);
      this.tweens.add({ targets: guide, alpha: 0.25, duration: 550, yoyo: true, repeat: -1 });
      this.input.once('pointerdown', () => this.tweens.add({ targets: [panel, title, sub, guide], alpha: 0, duration: 180, onComplete: () => [panel, title, sub, guide].forEach((o) => o.destroy()) }));
      this.instruction = this.add.text(W / 2, 628, t('drag'), textStyle(14, '#ffd35c')).setOrigin(0.5).setDepth(45);
      this.bailButton = makeButton(this, W / 2, 795, 300, 58, t('bail'), () => this.bail()).setDepth(55).setVisible(false);
      return;
    }
    this.briefingOpen = true;
    const shade = this.add.rectangle(W / 2, H / 2, W, H, 0x020914, 0.76).setDepth(80).setInteractive();
    const panel = this.add.rectangle(W / 2, H / 2, 412, 300, 0x0d284d, 1).setStrokeStyle(6, GOLD).setDepth(81);
    const num = this.add.text(W / 2, H / 2 - 105, String(this.mission.id).padStart(2, '0'), textStyle(42, '#ffd35c')).setOrigin(0.5).setDepth(82);
    const title = this.add.text(W / 2, H / 2 - 54, this.mission.title, textStyle(21)).setOrigin(0.5).setDepth(82);
    const body = this.add.text(W / 2, H / 2 + 8, this.mission.briefing.toUpperCase(), { ...textStyle(15), wordWrap: { width: 350 }, lineSpacing: 8 }).setOrigin(0.5).setDepth(82);
    const challenge = Number(this.registry.get('challengeScore') || 0);
    const hintCopy = challenge > 0 ? `BEAT ${challenge.toLocaleString()} • DRAG TO START` : 'DRAG HIM INTO TROUBLE';
    const hint = this.add.text(W / 2, H / 2 + 98, hintCopy, textStyle(14, '#ffd35c')).setOrigin(0.5).setDepth(82);
    this.tweens.add({ targets: hint, alpha: 0.4, duration: 600, yoyo: true, repeat: -1 });
    shade.once('pointerdown', () => {
      this.briefingOpen = false;
      [shade, panel, num, title, body, hint].forEach((o) => o.destroy());
      this.instruction.setText(t('drag'));
    });
    this.instruction = this.add.text(W / 2, 628, t('drag'), textStyle(14, '#ffd35c')).setOrigin(0.5).setDepth(45);
    this.bailButton = makeButton(this, W / 2, 795, 300, 58, t('bail'), () => this.bail()).setDepth(55).setVisible(false);
  }

  private bindInput() {
    this.input.on('pointerdown', (p: Phaser.Input.Pointer) => {
      if (this.briefingOpen || this.finished || this.bailed || this.launched) return;
      if (p.y < 105) return;
      this.dragging = true;
      this.setHeroPose('pull');
      this.hero.setStatic(true);
      this.hero.setCollidesWith(0);
      this.hero.setPosition(Phaser.Math.Clamp(p.x, 42, W - 42), Phaser.Math.Clamp(p.y, 220, 660));
    });
    this.input.on('pointermove', (p: Phaser.Input.Pointer) => {
      if (!this.dragging || this.launched) return;
      this.hero.setPosition(Phaser.Math.Clamp(p.x, 42, W - 42), Phaser.Math.Clamp(p.y, 210, 660));
      this.aim.set(this.hero.x, this.hero.y);
    });
    this.input.on('pointerup', () => {
      if (!this.dragging || this.launched) return;
      this.dragging = false; this.launched = true; this.launchedAt = this.time.now;
      this.setHeroPose('airborne');
      tone(180, 0.12, 'sawtooth'); haptic(25);
      this.hero.setCollidesWith(0xffffffff);
      this.hero.setStatic(false);
      const dx = this.hero.x - this.anchor.x;
      const dy = this.hero.y - (this.anchor.y - 60);
      this.hero.setVelocity(Phaser.Math.Clamp(dx * 0.045, -17, 17), Phaser.Math.Clamp(dy * 0.035 - 3.5, -16, 10));
      this.instruction.setText(this.onboarding ? 'HIT THE GOLD PROMISE SEALS!' : t('worse')).setTint(0xffffff);
      this.time.delayedCall(this.onboarding ? 900 : 650, () => {
        this.bailButton.setVisible(true);
        if (!this.finished && !this.bailed) this.phaseText.setText('3  GET OUT!').setTint(0xffd35c);
        if (this.onboarding) {
          this.instruction.setText('NOW CHICKEN OUT!').setTint(0xffd35c);
          this.tweens.add({ targets: this.bailButton, scaleX: 1.045, scaleY: 1.045, duration: 360, yoyo: true, repeat: 3 });
        }
      });
      this.timer = this.time.addEvent({ delay: 100, loop: true, callback: () => this.tickRisk() });
    });
  }

  private tickRisk() {
    if (!this.launched || this.bailed || this.finished) return;
    const elapsed = (this.time.now - this.launchedAt) / 1000;
    this.accountability = Phaser.Math.Clamp(elapsed / this.mission.time, 0, 1.08);
    const effectiveTarget = this.onboarding ? 1 : this.mission.target;
    this.promise = Phaser.Math.Clamp(this.nodes.size / effectiveTarget, 0, 1.25);
    this.updateHud();
    if (this.onboarding && this.accountability > 0.12 && this.accountability < 0.82) {
      this.instruction.setText('NOW CHICKEN OUT!').setTint(0xffd35c);
    } else if (this.accountability > 0.72 && this.accountability < 0.93) {
      this.instruction.setText('PERFECT EXIT WINDOW!').setTint(0xffd35c);
      this.cameras.main.shake(70, 0.002);
    } else if (this.accountability >= 0.93) {
      this.instruction.setText('ACCOUNTABILITY INCOMING!').setTint(0xff5c61);
      this.setHeroPose('panic');
    }
    if (this.accountability >= 1.05) this.caught();
  }

  private updateHud() {
    const target = this.onboarding ? 1 : this.mission.target;
    const seconds = Math.max(0, this.mission.time - (this.time.now - this.launchedAt) / 1000);
    this.chaosText.setText(`MESS  ${Math.round(this.chaos).toLocaleString()}`);
    this.objectiveText.setText(`${this.mission.targetLabel}  ${this.nodes.size}/${target}`);
    this.dangerText.setText(this.launched ? `OUT IN  ${seconds.toFixed(1)}s` : `OUT IN  ${this.mission.time.toFixed(1)}s`);
    this.promiseBar.width = Math.min(416, 416 * this.promise);
    this.accountBar.width = Math.min(416, 416 * this.accountability);
    this.accountBar.fillColor = this.accountability < 0.7 ? 0x52c879 : this.accountability < 0.93 ? GOLD : 0xe24449;
    this.dangerText.setTint(this.accountability < 0.7 ? 0x70e49b : this.accountability < 0.93 ? 0xffd35c : 0xff6b70);
  }

  private onCollision(event: Phaser.Physics.Matter.Events.CollisionStartEvent) {
    if (!this.launched || this.bailed || this.finished) return;
    event.pairs.forEach((pair) => {
      const heroBody = this.hero.body as MatterJS.BodyType | null;
      const isHero = (body: MatterJS.BodyType) => body === heroBody || body.parent === heroBody || body.label === 'hero' || body.parent?.label === 'hero';
      const other = isHero(pair.bodyA) ? pair.bodyB : isHero(pair.bodyB) ? pair.bodyA : null;
      const label = other ? (other.parent?.label && other.parent.label !== 'Body' ? other.parent.label : other.label || '') : '';
      if (!label || label === 'ground' || label === 'wall') return;
      this.setHeroPose('impact');
      this.time.delayedCall(170, () => { if (!this.bailed && !this.finished && this.accountability < 0.93) this.setHeroPose('airborne'); });
      const speed = Math.max(1, (this.hero.body as MatterJS.BodyType | null)?.speed || 1);
      this.chaos += Math.round(80 + speed * 28);
      const now = this.time.now;
      this.combo = now - this.lastHitAt < 520 ? Math.min(9, this.combo + 1) : 1;
      this.lastHitAt = now;
      this.chaos += this.combo * 22;
      this.sparks.explode(Math.min(14, 5 + this.combo), this.hero.x, this.hero.y);
      if (this.combo >= 2) this.floatText(this.hero.x, this.hero.y - 45, `CHAOS ×${this.combo}`);
      const promiseLabel = label.startsWith('promise:') ? label : this.onboarding && this.nodes.size === 0 ? 'promise:onboarding:first-hit' : '';
      if (promiseLabel) {
        if (!this.nodes.has(promiseLabel)) {
          this.nodes.add(promiseLabel); this.chaos += 450;
          this.phaseText.setText(this.nodes.size >= (this.onboarding ? 1 : this.mission.target) ? '3  GET OUT!' : '2  MAKE IT WORSE').setTint(0xffd35c);
          tone(620 + this.nodes.size * 55, 0.07, 'triangle'); haptic(18);
          const target = this.onboarding ? 1 : this.mission.target;
          this.floatText(this.hero.x, this.hero.y - 70, `PROMISE ${this.nodes.size}/${target}`);
          this.cameras.main.flash(80, 255, 210, 70, false);
          this.triggerMissionReaction();
        }
      }
      this.updateHud();
    });
  }

  private floatText(x: number, y: number, value: string) {
    const t = this.add.text(x, y, value, textStyle(13, '#ffd35c')).setOrigin(0.5).setDepth(70);
    this.tweens.add({ targets: t, y: y - 60, alpha: 0, duration: 800, onComplete: () => t.destroy() });
  }

  private triggerMissionReaction() {
    const reactions: Record<MissionKind, string[]> = {
      wall: ['STRUCTURAL OPTIMISM!', 'BILL SENT ELSEWHERE!'],
      tariff: ['NUMBERS INCREASED!', 'BOXES RETALIATE!'],
      coin: ['HYPE PUMPED!', 'TOTALLY SUSTAINABLE!'],
      island: ['ICE-COLD OFFER!', 'DEAL IS CRACKING!'],
      ocean: ['GEOGRAPHY UPDATED!', 'STICKER DIPLOMACY!'],
      storm: ['FORECAST IMPROVED!', 'CONE REDIRECTED!'],
      seasons: ['WRONG VENUE, PERFECT!', 'MOWERS ACTIVATED!'],
      crowd: ['SEATS RECOUNTED!', 'CAMERAS SEE MORE!'],
      letters: ['SEND FIRST!', 'NOTIFICATIONS MULTIPLY!'],
      cards: ['RARITY INVENTED!', 'MINT OVERLOADED!'],
      factory: ['PRICE NOW GOLDEN!', 'MERCH MULTIPLIED!'],
      dinner: ['PLATTER DESTABILIZED!', 'KETCHUP PROTOCOL!'],
      ballroom: ['ONE MORE CHANDELIER!', 'COLUMNS OPTIONAL!'],
      plug: ['BANNED!', 'UNBANNED!'],
      finale: ['EVERY PROMISE AT ONCE!', 'LEGACY OVERLOADED!']
    };
    const line = reactions[this.mission.kind][(this.nodes.size - 1) % reactions[this.mission.kind].length];
    this.floatText(W / 2, 255, line);
    this.cameras.main.shake(110, 0.004 + this.nodes.size * 0.0005);
    this.objects.forEach((obj, index) => {
      const body = obj.body as MatterJS.BodyType | null;
      if (!body || body.isStatic) return;
      let x = Phaser.Math.FloatBetween(-0.006, 0.006); let y = Phaser.Math.FloatBetween(-0.012, -0.003);
      if (this.mission.kind === 'coin') y -= 0.026;
      if (this.mission.kind === 'storm') { x = index % 2 ? 0.018 : -0.018; y -= 0.008; }
      if (this.mission.kind === 'dinner' || this.mission.kind === 'factory') y -= 0.018;
      if (this.mission.kind === 'plug') x = index % 2 ? 0.024 : -0.024;
      if (this.mission.kind === 'finale') { x *= 3; y -= 0.022; }
      this.matter.body.applyForce(body, body.position, { x, y });
    });
  }

  private bail() {
    if (!this.launched || this.bailed || this.finished) return;
    this.bailed = true; this.timer?.remove(); this.bailButton.setVisible(false);
    tone(260, 0.2, 'square'); this.time.delayedCall(100, () => tone(520, 0.18, 'triangle')); haptic([30, 25, 80]);
    this.instruction.setText('HE’S OUT!').setTint(0xffd35c);
    this.phaseText.setText('ESCAPE!').setTint(0x70e49b);
    this.feathers.explode(18, this.hero.x, this.hero.y);
    this.matter.world.engine.timing.timeScale = 0.32;
    this.cameras.main.zoomTo(1.08, 120, 'Sine.easeOut');
    this.time.delayedCall(180, () => { this.matter.world.engine.timing.timeScale = 1; this.cameras.main.zoomTo(1, 260, 'Sine.easeInOut'); });
    this.hero.setStatic(true);
    this.setHeroPose('run', true);
    this.objects.forEach((obj, index) => {
      const body = (obj.body as MatterJS.BodyType | null);
      if (body && !body.isStatic) this.matter.body.applyForce(body, body.position, { x: Phaser.Math.FloatBetween(-0.025, 0.025), y: Phaser.Math.FloatBetween(-0.035, -0.008) });
      this.time.delayedCall(index * 18, () => { if (obj.active) obj.setAngle(obj.angle + Phaser.Math.Between(-8, 8)); });
    });
    this.chaos += this.objects.length * 35;
    this.tweens.add({ targets: this.hero, x: -70, y: this.anchor.y - 62, angle: 0, duration: 620, ease: 'Cubic.easeIn', onComplete: () => this.finishRun() });
  }

  private caught() {
    if (this.finished || this.bailed) return;
    this.finished = true; this.timer?.remove(); this.bailButton.setVisible(false);
    this.cameras.main.shake(450, 0.02);
    this.setHeroPose('panic');
    this.instruction.setText('CAUGHT BY CONSEQUENCES').setTint(0xff5c61);
    this.time.delayedCall(900, () => this.showResult({ mission: this.mission.id, score: Math.round(this.chaos * 0.15), chickens: 0, label: 'CAUGHT', chaos: Math.round(this.chaos), seed: this.runSeed, daily: this.daily, onboarding: this.onboarding }));
  }

  private finishRun() {
    if (this.finished) return;
    this.finished = true;
    const effectiveTarget = this.onboarding ? 1 : this.mission.target;
    const promiseRatio = this.nodes.size / effectiveTarget;
    const exitQuality = Math.max(0.15, 1 - Math.abs(0.84 - this.accountability) * 2.1);
    const score = Math.round((this.chaos + this.nodes.size * 650) * (0.65 + promiseRatio) * (0.7 + exitQuality));
    let chickens = 1; let label = 'SMALL CHICKEN';
    if (promiseRatio >= 0.72 && this.accountability >= 0.58) { chickens = 2; label = 'BIG CHICKEN OUT'; }
    if (promiseRatio >= 1 && this.accountability >= 0.72 && this.accountability <= 0.94) { chickens = 3; label = 'PERFECT CHICKEN OUT'; }
    if (promiseRatio < 0.35) { chickens = 0; label = 'TOO SOON'; }
    if (this.onboarding && promiseRatio >= 1) {
      chickens = this.accountability >= 0.28 ? 3 : 2;
      label = chickens === 3 ? 'PERFECT FIRST ESCAPE' : 'GREAT ESCAPE';
    }
    this.time.delayedCall(580, () => this.showResult({ mission: this.mission.id, score, chickens, label, chaos: Math.round(this.chaos), seed: this.runSeed, daily: this.daily, onboarding: this.onboarding }));
  }

  private showResult(result: RunResult) {
    if (!result.daily && result.chickens > 0) {
      const p = loadProgress();
      p.best[result.mission] = Math.max(p.best[result.mission] || 0, result.score);
      p.chickens[result.mission] = Math.max(p.chickens[result.mission] || 0, result.chickens);
      p.clout += Math.max(10, result.chickens * 25);
      if (result.mission === p.unlocked && result.chickens > 0) p.unlocked = Math.min(16, p.unlocked + 1);
      if (result.onboarding && result.chickens > 0) p.onboarded = true;
      saveProgress(p);
    }
    if (result.daily && result.chickens > 0) {
      const p = loadProgress(); const today = Math.floor(Date.now() / 86400000);
      if (p.dailyKey !== today) p.dailyStreak = p.dailyKey === today - 1 ? p.dailyStreak + 1 : 1;
      p.dailyKey = today; p.dailyBest = Math.max(p.dailyBest, result.score); p.clout += 20 + result.chickens * 10; saveProgress(p);
    }
    this.registry.set('result', result);
    this.scene.start('result');
  }

  update() {
    if (!this.hero || !this.tie) return;
    this.tie.clear().lineStyle(13, this.tieStyle.color, 1);
    const cx = (this.anchor.x + this.hero.x) / 2 + Math.sin(this.time.now / 160) * (this.launched ? 9 : 2);
    const cy = Math.max(this.anchor.y, (this.anchor.y + this.hero.y) / 2 + 70);
    strokeCurve(this.tie, new Phaser.Math.Vector2(this.anchor.x, this.anchor.y), new Phaser.Math.Vector2(cx, cy), new Phaser.Math.Vector2(this.hero.x, this.hero.y + 30));
    this.tie.lineStyle(3, this.tieStyle.shine, 0.7);
    strokeCurve(this.tie, new Phaser.Math.Vector2(this.anchor.x + 2, this.anchor.y), new Phaser.Math.Vector2(cx + 3, cy), new Phaser.Math.Vector2(this.hero.x + 2, this.hero.y + 30));
    this.trajectory.clear();
    if (this.dragging) {
      const dx = this.hero.x - this.anchor.x; const dy = this.hero.y - (this.anchor.y - 60);
      this.trajectory.fillStyle(0xffffff, 0.68);
      for (let i = 1; i <= 8; i++) {
        const t = i / 8; const x = this.hero.x + dx * t * 0.65; const y = this.hero.y + dy * t * 0.45 + 90 * t * t;
        this.trajectory.fillCircle(x, y, 5 - t * 2);
      }
    }
    if (this.launched && !this.bailed && this.hero.y > 790) this.hero.setVelocityY(-8);
  }

  private boxTexture(w: number, h: number, color: number) {
    const key = `box-${Math.round(w)}-${Math.round(h)}-${color.toString(16)}`;
    if (this.textures.exists(key)) return key;
    const g = this.add.graphics();
    const light = Phaser.Display.Color.IntegerToColor(color).lighten(20).color;
    const dark = Phaser.Display.Color.IntegerToColor(color).darken(34).color;
    const radius = Math.min(9, h * 0.18);
    g.fillStyle(0x020713, 0.45).fillRoundedRect(6, 8, w, h, radius);
    g.fillStyle(color, 1).fillRoundedRect(3, 2, w, h, radius);
    g.fillStyle(light, 0.28).fillRoundedRect(6, 5, w - 6, Math.max(7, h * 0.34), Math.max(3, radius - 2));
    g.fillStyle(dark, 0.32).fillRect(5, h - 6, w - 4, 6);
    g.lineStyle(3, dark, 0.95).strokeRoundedRect(3, 2, w, h, radius);
    g.lineStyle(2, 0xffffff, 0.26).lineBetween(9, 8, w - 3, 8);
    g.fillStyle(0xffffff, 0.3).fillCircle(10, h - 6, 2).fillCircle(w - 4, h - 6, 2);
    g.generateTexture(key, Math.ceil(w + 10), Math.ceil(h + 12)); g.destroy();
    return key;
  }

  private circleTexture(r: number, color: number) {
    const key = `circle-${Math.round(r)}-${color.toString(16)}`;
    if (this.textures.exists(key)) return key;
    const g = this.add.graphics(); const size = r * 2 + 12;
    const light = Phaser.Display.Color.IntegerToColor(color).lighten(24).color;
    const dark = Phaser.Display.Color.IntegerToColor(color).darken(38).color;
    g.fillStyle(0x020713, 0.4).fillCircle(r + 7, r + 9, r);
    g.fillStyle(color, 1).fillCircle(r + 6, r + 5, r);
    g.fillStyle(light, 0.3).fillEllipse(r + 1, r - r * 0.2, r * 1.1, r * 0.6);
    g.fillStyle(dark, 0.22).fillEllipse(r + 6, r + r * 0.62, r * 1.55, r * 0.45);
    g.lineStyle(4, dark).strokeCircle(r + 6, r + 5, r - 1);
    g.lineStyle(3, 0xffffff, 0.32).beginPath().arc(r + 2, r + 2, r * 0.67, 3.5, 5.4).strokePath();
    g.generateTexture(key, Math.ceil(size), Math.ceil(size)); g.destroy();
    return key;
  }

  private addPromisePulse(obj: Phaser.GameObjects.Image, label: string, size: number) {
    if (!label.startsWith('promise:')) return;
    const halo = this.add.image(obj.x, obj.y, 'star-spark').setDisplaySize(size, size).setAlpha(0.28).setDepth(8);
    this.tweens.add({ targets: halo, alpha: 0.72, scaleX: 1.18, scaleY: 1.18, duration: 620, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
    this.events.on('update', () => { if (obj.active && halo.active) halo.setPosition(obj.x, obj.y).setAngle(obj.angle); });
  }

  private addBox(x: number, y: number, w: number, h: number, color: number, label: string, text = '', angle = 0, isStatic = false) {
    const rect = this.add.image(x, y, this.boxTexture(w, h, color)).setAngle(angle).setDepth(10);
    this.matter.add.gameObject(rect, { label, restitution: 0.45, friction: 0.3, isStatic, shape: { type: 'rectangle', width: w, height: h } });
    if (rect.body) (rect.body as MatterJS.BodyType).label = label;
    this.addPromisePulse(rect, label, Math.min(w, h) * 1.3);
    if (text) {
      const t = this.add.text(x, y, text, textStyle(Math.min(18, h * 0.42), '#fff4d6')).setOrigin(0.5).setDepth(12);
      const body = rect.body as MatterJS.BodyType;
      this.events.on('update', () => { if (rect.active && body) { t.setPosition(rect.x, rect.y).setAngle(rect.angle); } });
    }
    this.objects.push(rect); return rect;
  }

  private addCircle(x: number, y: number, r: number, color: number, label: string, text = '') {
    const ellipse = this.add.image(x, y, this.circleTexture(r, color)).setDepth(10);
    this.matter.add.gameObject(ellipse, { shape: { type: 'circle', radius: r }, label, restitution: 0.8, friction: 0.05 });
    if (ellipse.body) (ellipse.body as MatterJS.BodyType).label = label;
    this.addPromisePulse(ellipse, label, r * 1.5);
    if (text) {
      const t = this.add.text(x, y, text, textStyle(Math.min(17, r * 0.7), '#fff4d6')).setOrigin(0.5).setDepth(12);
      this.events.on('update', () => { if (ellipse.active) t.setPosition(ellipse.x, ellipse.y).setAngle(ellipse.angle); });
    }
    this.objects.push(ellipse); return ellipse;
  }

  private buildMission(kind: MissionKind) {
    this.matter.add.rectangle(W / 2, 687, W, 26, { isStatic: true, label: 'ground' });
    const A = this.mission.accent;
    const colors = [A, 0xd78b32, 0xc84c45, 0x2b68a1, 0xe7d2a1];
    const node = (i: number) => `promise:${this.mission.id}:${i}`;
    if (kind === 'wall' || kind === 'ballroom') {
      for (let row = 0; row < 7; row++) for (let col = 0; col < (kind === 'wall' ? 4 : 3); col++) {
        const offset = row % 2 ? 28 : 0; const x = 220 + col * 58 + offset; const y = 650 - row * 48;
        this.addBox(x, y, 54, 42, colors[(row + col) % colors.length], (row + col) % 4 === 0 ? node(row + col) : `brick:${row}:${col}`, (row + col) % 4 === 0 ? '★' : '');
      }
      if (kind === 'ballroom') { this.addCircle(330, 235, 38, GOLD, node(20), '✦'); this.addBox(330, 310, 180, 18, GOLD, 'beam', 'ONE MORE CHANDELIER'); }
    } else if (kind === 'tariff' || kind === 'factory') {
      for (let i = 0; i < 10; i++) {
        const x = 220 + (i % 3) * 82 + (i % 2) * 15; const y = 635 - Math.floor(i / 3) * 78;
        this.addBox(x, y, 74, 60, colors[i % colors.length], i < 5 ? node(i) : `cargo:${i}`, kind === 'tariff' ? `+${[10, 25, 50, 75, 125][i % 5]}%` : ['CAP', 'GOLD', 'SHOE', 'TIE'][i % 4]);
      }
      this.addBox(300, 670, 250, 18, 0x232a34, 'conveyor', '▶ ▶ ▶', 0, true);
    } else if (kind === 'coin') {
      for (let i = 0; i < 8; i++) this.addCircle(210 + (i % 3) * 78, 640 - Math.floor(i / 3) * 72, 31 + (i % 2) * 5, GOLD, i < 5 ? node(i) : `coin:${i}`, i < 5 ? '$' : '↑');
      this.addBox(320, 315, 110, 48, 0xb31b28, node(12), 'MOON');
    } else if (kind === 'island') {
      for (let i = 0; i < 12; i++) this.addBox(175 + (i % 4) * 70, 630 - Math.floor(i / 4) * 55, 68, 52, i % 3 === 0 ? 0xc8f3ff : 0x77cae5, i < 5 ? node(i) : `ice:${i}`, i < 4 ? '$' : '', Phaser.Math.Between(-5, 5));
      this.addBox(315, 390, 175, 48, 0xcf3643, node(20), 'NOT FOR SALE', -5);
    } else if (kind === 'ocean') {
      this.addCircle(315, 465, 150, 0x237bc1, 'globe', '');
      ['NEW', 'GREAT', 'OCEAN', 'NAME'].forEach((s, i) => this.addBox(210 + (i % 2) * 130, 390 + Math.floor(i / 2) * 110, 120, 48, GOLD, node(i), s, i % 2 ? 8 : -8));
    } else if (kind === 'storm') {
      this.addBox(300, 490, 260, 220, 0xe8e2cf, 'map', 'FORECAST', -4, true);
      for (let i = 0; i < 6; i++) this.addCircle(205 + i * 42, 565 - i * 45, 20 + i * 3, i < 4 ? 0x506f8e : 0x25384e, i < 4 ? node(i) : `storm:${i}`, '↻');
      this.addBox(330, 280, 180, 22, 0x151515, node(10), 'MARKER', 18);
    } else if (kind === 'seasons') {
      ['FOUR', 'SEASONS', 'HOTEL?', 'LANDSCAPING'].forEach((s, i) => this.addBox(220 + (i % 2) * 125, 330 + Math.floor(i / 2) * 120, 116, 58, i < 2 ? 0x8d1e24 : 0x397249, node(i), s, i % 2 ? 8 : -8));
      for (let i = 0; i < 4; i++) this.addCircle(205 + i * 70, 610, 32, 0x30363f, `mower:${i}`, '✹');
    } else if (kind === 'crowd') {
      for (let row = 0; row < 4; row++) for (let col = 0; col < 5; col++) {
        const i = row * 5 + col; this.addCircle(175 + col * 58, 620 - row * 72, 23, colors[i % colors.length], i % 4 === 0 ? node(i) : `crowd:${i}`, i % 4 === 0 ? 'CAM' : '');
      }
    } else if (kind === 'letters') {
      'COVFEFE'.split('').forEach((letter, i) => this.addBox(155 + (i % 4) * 76, 620 - Math.floor(i / 4) * 80, 66, 66, i % 2 ? 0x2e84c6 : 0x31516d, node(i), letter, Phaser.Math.Between(-8, 8)));
      for (let i = 0; i < 4; i++) this.addCircle(210 + i * 65, 390, 24, 0xe33a47, `notification:${i}`, '!');
    } else if (kind === 'cards') {
      ['HERO', 'SPACE', 'COWBOY', '#1', 'KING', 'GOLD'].forEach((s, i) => this.addBox(190 + (i % 3) * 92, 610 - Math.floor(i / 3) * 145, 78, 118, colors[i % colors.length], node(i), s, Phaser.Math.Between(-9, 9)));
    } else if (kind === 'dinner') {
      for (let i = 0; i < 12; i++) {
        const row = Math.floor(i / 4); this.addBox(180 + (i % 4) * 72, 640 - row * 78, 68, 42, i % 2 ? 0xc33b2f : 0xe9a43c, i % 3 === 0 ? node(i) : `food:${i}`, i % 2 ? 'BURGER' : 'FRIES', Phaser.Math.Between(-5, 5));
      }
      this.addBox(300, 430, 260, 16, 0xd8d2c2, node(20), 'SILVER PLATTER');
    } else if (kind === 'plug') {
      for (let i = 0; i < 8; i++) this.addBox(185 + (i % 3) * 92, 620 - Math.floor(i / 3) * 100, 72, 88, i % 2 ? 0x242a44 : 0xd22c54, i < 5 ? node(i) : `phone:${i}`, i % 2 ? '▶' : '♥', Phaser.Math.Between(-8, 8));
      this.addBox(340, 285, 130, 55, 0x20212a, node(20), 'UNPLUG', 4);
    } else if (kind === 'finale') {
      for (let i = 0; i < 14; i++) {
        const x = 170 + (i % 4) * 75; const y = 640 - Math.floor(i / 4) * 78;
        i % 3 === 0 ? this.addCircle(x, y, 28, GOLD, node(i), ['$','%','★','↑'][i % 4]) : this.addBox(x, y, 66, 55, colors[i % colors.length], i < 9 ? node(i) : `final:${i}`, ['WALL','DEAL','CARD','CAP'][i % 4], Phaser.Math.Between(-7, 7));
      }
      for (let i = 0; i < 5; i++) this.addBox(300, 300 + i * 48, 210 - i * 24, 22, GOLD, `step:${i}`, '', -14, true);
    }
  }
}

class ResultScene extends Phaser.Scene {
  constructor() { super('result'); }
  create() {
    const result = this.registry.get('result') as RunResult;
    const mission = missionById(result.mission);
    const g = this.add.graphics();
    g.fillGradientStyle(0x173b68, 0x173b68, 0x040d1d, 0x040d1d).fillRect(0, 0, W, H);
    for (let i = 0; i < 45; i++) g.fillStyle(i % 3 === 0 ? GOLD : RED, 0.8).fillRect(Phaser.Math.Between(0, W), Phaser.Math.Between(0, 280), 7, 15);
    this.add.text(W / 2, 78, result.label, textStyle(27, result.chickens === 3 ? '#ffd35c' : '#fff1d3')).setOrigin(0.5);
    this.add.text(W / 2, 119, mission.title, textStyle(13, '#b9d6ee')).setOrigin(0.5);
    const resultPose = result.chickens > 0 ? 'hero-victory' : 'hero-panic';
    const resultWidth = result.chickens > 0 ? 231 : 217;
    this.add.image(W / 2, 300, resultPose).setDisplaySize(resultWidth, 294).setAngle(-5);
    this.add.text(W / 2, 459, result.chickens ? '★'.repeat(result.chickens) + '·'.repeat(3 - result.chickens) : '···', textStyle(42, '#ffd35c')).setOrigin(0.5);
    this.add.text(W / 2, 524, result.score.toLocaleString(), textStyle(48, '#ffffff')).setOrigin(0.5);
    this.add.text(W / 2, 565, `CHICKEN SCORE   •   CHAOS ${result.chaos.toLocaleString()}`, textStyle(11, '#f0c75b')).setOrigin(0.5);
    const challenge = Number(this.registry.get('challengeScore') || 0);
    if (challenge > 0) {
      const won = result.score > challenge;
      this.add.text(W / 2, 597, won ? `CHALLENGE BEATEN BY ${(result.score - challenge).toLocaleString()}` : `${(challenge - result.score).toLocaleString()} SHORT OF THE CHALLENGE`, textStyle(11, won ? '#70e49b' : '#ff8b8b')).setOrigin(0.5);
    }
    if (result.daily) this.add.text(W / 2, 597, result.chickens > 0 ? `DAILY STREAK ${loadProgress().dailyStreak}  •  +${20 + result.chickens * 10} CLOUT` : 'THE DAILY DISASTER REMAINS UNFINISHED', textStyle(11, result.chickens > 0 ? '#70e49b' : '#ff8b8b')).setOrigin(0.5);
    makeButton(this, W / 2, 645, 330, 58, 'TRY TO FAIL BETTER', () => { this.registry.set('missionId', result.mission); this.registry.set('daily', result.daily || false); this.scene.start('game'); });
    const continueLabel = result.onboarding && result.chickens > 0 ? 'ENTER THE HALL' : result.daily ? 'HALL' : 'NEXT PROMISE';
    makeButton(this, 151, 718, 206, 52, continueLabel, () => {
      if (result.onboarding && result.chickens > 0) { this.registry.set('challengeScore', 0); this.scene.start('menu'); return; }
      if (result.daily) this.scene.start('menu');
      else { this.registry.set('missionId', Math.min(15, result.mission + 1)); this.registry.set('runSeed', 0); this.scene.start(result.mission < 15 && result.chickens > 0 ? 'game' : 'campaign'); }
    }, 0x28527e);
    makeButton(this, 363, 718, 104, 52, 'DARE', () => this.share(result), 0x2e704b);
    this.add.text(W / 2, 794, 'MAKE A FRIEND FAIL WORSE', textStyle(11, '#8fb1d1')).setOrigin(0.5);
  }
  private async share(result: RunResult) {
    const m = missionById(result.mission);
    const challengeUrl = `${location.origin}${location.pathname}?mission=${result.mission}&challenge=${result.score}&seed=${result.seed}`;
    const text = `${result.label}: ${result.score.toLocaleString()} in ${m.title}. Can you fail better than me? #ChickenHimOut`;
    try {
      const blob = await this.createShareCard(result);
      const file = new File([blob], `chickenhimout-${result.score}.png`, { type: 'image/png' });
      if (navigator.share && navigator.canShare?.({ files: [file] })) await navigator.share({ title: 'ChickenHimOut', text, url: challengeUrl, files: [file] });
      else if (navigator.share) await navigator.share({ title: 'ChickenHimOut', text, url: challengeUrl });
      else {
        await navigator.clipboard.writeText(`${text}\n${challengeUrl}`);
        const download = document.createElement('a'); const objectUrl = URL.createObjectURL(blob);
        download.href = objectUrl; download.download = file.name; download.click(); window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
        this.toast('CARD SAVED • CHALLENGE COPIED');
      }
    } catch { /* user cancelled */ }
  }

  private createShareCard(result: RunResult) {
    return new Promise<Blob>((resolve, reject) => {
      const canvas = document.createElement('canvas'); canvas.width = 1080; canvas.height = 1350;
      const ctx = canvas.getContext('2d'); if (!ctx) { reject(new Error('Canvas unavailable')); return; }
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height); gradient.addColorStop(0, '#173d6b'); gradient.addColorStop(1, '#030b1a');
      ctx.fillStyle = gradient; ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#f2bf49'; ctx.lineWidth = 24; ctx.strokeRect(30, 30, 1020, 1290);
      for (let i = 0; i < 55; i++) { ctx.fillStyle = i % 3 === 0 ? '#f2bf49' : '#b71922'; ctx.fillRect(55 + (i * 173) % 970, 65 + (i * 89) % 440, 12, 28); }
      ctx.textAlign = 'center'; ctx.fillStyle = '#ffd052'; ctx.font = '900 72px Arial Rounded MT Bold, Arial'; ctx.fillText('CHICKEN HIM OUT', 540, 125);
      ctx.fillStyle = '#fff2d4'; ctx.font = '900 50px Arial Rounded MT Bold, Arial'; ctx.fillText(result.label, 540, 220);
      ctx.fillStyle = '#b9d6ee'; ctx.font = '900 30px Arial Rounded MT Bold, Arial'; ctx.fillText(missionById(result.mission).title, 540, 270);
      const heroKey = result.chickens > 0 ? 'hero-victory' : 'hero-panic';
      const hero = this.textures.get(heroKey).getSourceImage() as CanvasImageSource;
      const source = this.textures.get(heroKey).getSourceImage() as HTMLImageElement;
      const maxW = 560, maxH = 555, scale = Math.min(maxW / source.width, maxH / source.height);
      const dw = source.width * scale, dh = source.height * scale; ctx.drawImage(hero, 540 - dw / 2, 300, dw, dh);
      ctx.fillStyle = '#ffd052'; ctx.font = '900 76px Arial Rounded MT Bold, Arial'; ctx.fillText('★'.repeat(result.chickens) + '·'.repeat(3 - result.chickens), 540, 930);
      ctx.fillStyle = '#ffffff'; ctx.font = '900 116px Arial Rounded MT Bold, Arial'; ctx.fillText(result.score.toLocaleString(), 540, 1065);
      ctx.fillStyle = '#f2bf49'; ctx.font = '900 28px Arial Rounded MT Bold, Arial'; ctx.fillText('CHICKEN SCORE', 540, 1110);
      ctx.fillStyle = '#b71922'; ctx.fillRect(125, 1160, 830, 112); ctx.strokeStyle = '#f2bf49'; ctx.lineWidth = 9; ctx.strokeRect(125, 1160, 830, 112);
      ctx.fillStyle = '#fff2d4'; ctx.font = '900 38px Arial Rounded MT Bold, Arial'; ctx.fillText(`CAN YOU FAIL BETTER THAN ${result.score.toLocaleString()}?`, 540, 1229);
      ctx.fillStyle = '#8fb1d1'; ctx.font = '800 23px Arial Rounded MT Bold, Arial'; ctx.fillText('SAME MISSION • SAME MESS • #CHICKENHIMOUT', 540, 1300);
      canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error('Card export failed')), 'image/png');
    });
  }

  private toast(message: string) {
    const toast = this.add.text(W / 2, 772, message, textStyle(12, '#ffd35c')).setOrigin(0.5).setDepth(90);
    this.tweens.add({ targets: toast, alpha: 0, y: 755, duration: 1300, delay: 900, onComplete: () => toast.destroy() });
  }
}

class GolfScene extends Phaser.Scene {
  private ball!: Phaser.Physics.Matter.Image;
  private hole!: Phaser.GameObjects.Ellipse;
  private aim = new Phaser.Math.Vector2(85, 700);
  private dragging = false;
  private moving = false;
  private strokes = 0;
  private holeStrokes = 0;
  private holes = 0;
  private assistUsed = false;
  private scoreText!: Phaser.GameObjects.Text;
  private statusText!: Phaser.GameObjects.Text;
  private help!: Phaser.GameObjects.Container;
  private tie!: Phaser.GameObjects.Graphics;
  private tieStyle = TIES[0];
  private obstacles: Phaser.GameObjects.Image[] = [];
  constructor() { super('golf'); }
  create() {
    this.tieStyle = TIES.find((t) => t.id === loadProgress().selectedTie) || TIES[0];
    this.matter.world.setGravity(0, 0);
    this.matter.world.setBounds(0, 90, W, H - 90, 42);
    const g = this.add.graphics();
    g.fillGradientStyle(0x71bfe0, 0x71bfe0, 0xd4eff5, 0xd4eff5).fillRect(0, 0, W, H);
    g.fillStyle(0x2f8c4c).fillRect(0, 220, W, H - 220);
    g.fillStyle(0x3da25b, 0.5); for (let i = 0; i < 12; i++) g.fillCircle(Phaser.Math.Between(0, W), Phaser.Math.Between(250, H), Phaser.Math.Between(35, 100));
    this.add.rectangle(W / 2, 45, W, 90, NAVY, 0.95);
    this.add.text(W / 2, 25, 'CHICKEN GOLF', textStyle(24, '#ffd35c')).setOrigin(0.5);
    const best = loadProgress().golfBest;
    this.scoreText = this.add.text(W / 2, 63, `HOLES 0   •   STROKES 0${best ? `   •   BEST ${best}` : ''}`, textStyle(11)).setOrigin(0.5);
    makeButton(this, 45, 45, 64, 38, '←', () => this.scene.start('menu'), 0x284f7b);
    this.add.image(57, 693, 'hero-pull').setDisplaySize(116, 132);
    this.tie = this.add.graphics().setDepth(20);
    this.statusText = this.add.text(W / 2, 112, 'DRAG THE BALL • RELEASE THE TIE', textStyle(13, '#fff6d6')).setOrigin(0.5).setDepth(25);
    this.newHole();
    this.help = makeButton(this, W / 2, 810, 250, 50, 'CALL AN ASSISTANT', () => this.assist(), 0x6b4b8a).setVisible(false);
    this.input.on('pointerdown', (p: Phaser.Input.Pointer) => { if (!this.moving && Phaser.Math.Distance.Between(p.x, p.y, this.ball.x, this.ball.y) < 75) this.dragging = true; });
    this.input.on('pointermove', (p: Phaser.Input.Pointer) => { if (this.dragging) this.aim.set(Phaser.Math.Clamp(p.x, 30, W - 30), Phaser.Math.Clamp(p.y, 180, H - 70)); });
    this.input.on('pointerup', () => this.shoot());
  }
  private newHole() {
    this.ball?.destroy(); this.hole?.destroy(); this.obstacles.forEach((o) => o.destroy()); this.obstacles = [];
    this.aim.set(95, 690); this.moving = false; this.holeStrokes = 0; this.assistUsed = false; this.help?.setVisible(false);
    this.ball = this.matter.add.image(95, 690, 'ball', undefined, { shape: 'circle', restitution: 0.74, friction: 0.02, frictionAir: 0.026, label: 'golfball' }).setDisplaySize(31, 31);
    const hx = Phaser.Math.Between(245, 420), hy = Phaser.Math.Between(170, 410);
    this.hole = this.add.ellipse(hx, hy, 44, 18, 0x14251c).setStrokeStyle(4, 0xe8f0df);
    this.add.rectangle(hx + 3, hy - 55, 4, 110, 0xece8d7);
    this.add.triangle(hx + 24, hy - 97, 0, 0, 0, 38, 42, 20, RED);
    for (let i = 0; i < 4; i++) {
      const x = Phaser.Math.Between(150, 390), y = Phaser.Math.Between(260, 620);
      const w = Phaser.Math.Between(55, 110); const color = i % 2 ? 0xe7c664 : 0xf2ead0;
      const key = `golf-ob-${w}-${color}`;
      if (!this.textures.exists(key)) {
        const tx = this.add.graphics(); tx.fillStyle(0x173b23, 0.35).fillRoundedRect(4, 7, w, 22, 6).fillStyle(color).fillRoundedRect(2, 2, w, 22, 6).lineStyle(3, 0x285a33).strokeRoundedRect(2, 2, w, 22, 6); tx.generateTexture(key, w + 8, 33); tx.destroy();
      }
      const obstacle = this.add.image(x, y, key).setAngle(Phaser.Math.Between(-45, 45));
      this.matter.add.gameObject(obstacle, { isStatic: true, label: 'golf-obstacle', restitution: 0.9, shape: { type: 'rectangle', width: w, height: 22 } });
      this.obstacles.push(obstacle);
    }
    this.statusText?.setText(`HOLE ${this.holes + 1} • PAR 2`);
  }
  private shoot() {
    if (!this.dragging || this.moving) return;
    this.dragging = false; this.moving = true; this.strokes++; this.holeStrokes++;
    tone(210, 0.09, 'triangle'); haptic(20);
    const dx = this.aim.x - this.ball.x, dy = this.aim.y - this.ball.y;
    this.ball.setVelocity(Phaser.Math.Clamp(dx * 0.038, -16, 16), Phaser.Math.Clamp(dy * 0.038, -16, 16));
    this.scoreText.setText(`HOLES ${this.holes}   •   STROKES ${this.strokes}   •   BEST ${Math.max(this.holes, loadProgress().golfBest)}`);
    this.time.delayedCall(1700, () => { this.moving = false; if (this.holeStrokes >= 2 && !this.assistUsed) this.help.setVisible(true); });
  }
  private assist() {
    this.help.setVisible(false); this.assistUsed = true;
    tone(90, 0.12, 'sawtooth'); haptic([15, 35, 15]);
    const assistant = this.add.image(Math.max(25, this.ball.x - 80), this.ball.y, 'hero-sneak').setDisplaySize(57, 81).setDepth(30).setFlipX(this.hole.x < this.ball.x);
    const hush = this.add.text(W / 2, 142, 'NOTHING TO SEE HERE', textStyle(14, '#fff6d6')).setOrigin(0.5).setDepth(31);
    this.tweens.add({ targets: assistant, x: this.ball.x - 8, duration: 380, onComplete: () => {
      this.ball.setVelocity((this.hole.x - this.ball.x) * 0.055, (this.hole.y - this.ball.y) * 0.055);
      this.tweens.add({ targets: assistant, x: -40, duration: 460, delay: 180, onComplete: () => assistant.destroy() });
      this.tweens.add({ targets: hush, alpha: 0, duration: 500, delay: 650, onComplete: () => hush.destroy() });
    } });
  }
  update() {
    if (!this.ball || !this.hole) return;
    this.tie.clear().lineStyle(9, this.tieStyle.color, 1);
    strokeCurve(this.tie, new Phaser.Math.Vector2(80, 675), new Phaser.Math.Vector2(100, 760), new Phaser.Math.Vector2(this.ball.x, this.ball.y));
    if (this.dragging) {
      this.tie.lineStyle(3, 0xffffff, 0.75).lineBetween(this.ball.x, this.ball.y, this.aim.x, this.aim.y);
      this.tie.fillStyle(0xffffff, 0.65); for (let i = 1; i < 6; i++) this.tie.fillCircle(this.ball.x + (this.aim.x - this.ball.x) * i / 6, this.ball.y + (this.aim.y - this.ball.y) * i / 6, 3);
    }
    if (Phaser.Math.Distance.Between(this.ball.x, this.ball.y, this.hole.x, this.hole.y) < 28 && ((this.ball.body as MatterJS.BodyType | null)?.speed || 0) < 5) {
      this.moving = true; this.ball.setVisible(false); this.holes++;
      const p = loadProgress(); p.golfBest = Math.max(p.golfBest, this.holes); p.clout += this.assistUsed ? 2 : Math.max(3, 8 - this.holeStrokes * 2); saveProgress(p);
      this.scoreText.setText(`HOLES ${this.holes}   •   STROKES ${this.strokes}   •   BEST ${p.golfBest}`);
      const call = this.assistUsed ? 'TOTALLY LEGIT!' : this.holeStrokes === 1 ? 'CHICKEN IN ONE!' : this.holeStrokes === 2 ? 'PERFECTLY NORMAL!' : 'EVENTUALLY!';
      const msg = this.add.text(W / 2, H / 2, call, textStyle(28, '#ffd35c')).setOrigin(0.5).setDepth(40);
      this.add.particles(this.hole.x, this.hole.y, 'star-spark', { speed: { min: 80, max: 220 }, lifespan: 650, quantity: 14, scale: { start: 0.8, end: 0 }, emitting: false }).explode(18);
      this.time.delayedCall(850, () => { msg.destroy(); this.newHole(); });
    }
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'game',
  width: W,
  height: H,
  backgroundColor: '#071a38',
  physics: { default: 'matter', matter: { gravity: { x: 0, y: 1.05 }, debug: false, enableSleeping: true } },
  scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH, width: W, height: H },
  render: { antialias: true, pixelArt: false, roundPixels: false },
  scene: [BootScene, SplashScene, MenuScene, CampaignScene, WardrobeScene, SettingsScene, RecordsScene, GameScene, ResultScene, GolfScene]
};

new Phaser.Game(config);

if ('serviceWorker' in navigator && import.meta.env.PROD) window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => undefined));
