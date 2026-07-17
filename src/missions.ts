export type MissionKind =
  | 'wall' | 'tariff' | 'coin' | 'island' | 'ocean'
  | 'storm' | 'seasons' | 'crowd' | 'letters' | 'cards'
  | 'factory' | 'dinner' | 'ballroom' | 'plug' | 'finale';

export interface MissionDefinition {
  id: number;
  chapter: string;
  title: string;
  kicker: string;
  briefing: string;
  kind: MissionKind;
  sky: number;
  ground: number;
  accent: number;
  targetLabel: string;
  target: number;
  time: number;
}

export const MISSIONS: MissionDefinition[] = [
  { id: 1, chapter: 'BIG PROMISES', title: 'THE GREATEST WALL', kicker: 'Build it. Bill someone else.', briefing: 'Smash 3 gold bricks, start the collapse, then get out before time runs out.', kind: 'wall', sky: 0x2c77ba, ground: 0xb66a33, accent: 0xf4c04d, targetLabel: 'BRICKS', target: 3, time: 11 },
  { id: 2, chapter: 'BIG PROMISES', title: 'TARIFF TOWER', kicker: 'Every box deserves a number.', briefing: 'Stamp 3 gold boxes, topple the tariff tower, then get out.', kind: 'tariff', sky: 0x17648b, ground: 0x2c3444, accent: 0xf2b347, targetLabel: 'BOXES', target: 3, time: 12 },
  { id: 3, chapter: 'BIG PROMISES', title: 'TO THE MOON!', kicker: 'It only goes up. Probably.', briefing: 'Hit 4 gold coins, pump the bubble, then cash out before it bursts.', kind: 'coin', sky: 0x101b46, ground: 0x34205a, accent: 0xffca3a, targetLabel: 'COINS', target: 4, time: 12 },
  { id: 4, chapter: 'DEALS & MAPS', title: 'ISLAND FOR SALE', kicker: 'Everything has a price tag.', briefing: 'Tag 3 gold ice blocks, crack the deal, then get out.', kind: 'island', sky: 0x73cce8, ground: 0x3f8fa5, accent: 0xf4c95d, targetLabel: 'TAGS', target: 3, time: 12 },
  { id: 5, chapter: 'DEALS & MAPS', title: 'RENAME THE OCEAN', kicker: 'A sticker fixes geography.', briefing: 'Hit 4 gold labels, cover the globe, then get out.', kind: 'ocean', sky: 0x4a9bd0, ground: 0x173d62, accent: 0xf7c948, targetLabel: 'LABELS', target: 4, time: 13 },
  { id: 6, chapter: 'DEALS & MAPS', title: 'SHARPIE STORM', kicker: 'The weather follows the line.', briefing: 'Hit 3 gold markers, redirect the storm, then get out.', kind: 'storm', sky: 0x526b8f, ground: 0x253148, accent: 0xe63f42, targetLabel: 'MARKS', target: 3, time: 11 },
  { id: 7, chapter: 'THE SHOW', title: 'THE WRONG FOUR SEASONS', kicker: 'Luxury is a state of mind.', briefing: 'Hit 4 gold signs, wake the mowers, then get out.', kind: 'seasons', sky: 0x78b0dc, ground: 0x4d713c, accent: 0xe7b447, targetLabel: 'SIGNS', target: 4, time: 12 },
  { id: 8, chapter: 'THE SHOW', title: 'THE BIGGEST CROWD EVER', kicker: 'Empty seats are alternative people.', briefing: 'Hit 4 gold cameras, inflate the crowd, then get out.', kind: 'crowd', sky: 0x317cc0, ground: 0x7a6654, accent: 0xf0bd42, targetLabel: 'CAMERAS', target: 4, time: 12 },
  { id: 9, chapter: 'THE SHOW', title: 'MIDNIGHT COVFEFE', kicker: 'Post first. Spell later.', briefing: 'Hit 5 gold letters, flood the feed, then delete your way out.', kind: 'letters', sky: 0x111836, ground: 0x292341, accent: 0x58b8ff, targetLabel: 'LETTERS', target: 5, time: 11 },
  { id: 10, chapter: 'GREATEST PRODUCTS', title: 'SUPERHERO CARDS', kicker: 'Mint a more heroic reality.', briefing: 'Hit 4 gold cards, overload the mint, then get out.', kind: 'cards', sky: 0x4a215f, ground: 0x271735, accent: 0xffc53d, targetLabel: 'CARDS', target: 4, time: 12 },
  { id: 11, chapter: 'GREATEST PRODUCTS', title: 'GOLDEN DROP', kicker: 'If it shines, raise the price.', briefing: 'Hit 5 gold products, jam the factory, then get out.', kind: 'factory', sky: 0x1e3656, ground: 0x34363c, accent: 0xf6be3e, targetLabel: 'PRODUCTS', target: 5, time: 12 },
  { id: 12, chapter: 'GREATEST PRODUCTS', title: 'STATE DINNER', kicker: 'Fine dining. Extra ketchup.', briefing: 'Hit 4 gold platters, wreck the banquet, then get out.', kind: 'dinner', sky: 0x402743, ground: 0x6d3029, accent: 0xf0bd52, targetLabel: 'PLATTERS', target: 4, time: 12 },
  { id: 13, chapter: 'MONUMENTAL LEGACY', title: 'BALLROOM BLITZ', kicker: 'One more chandelier.', briefing: 'Hit 5 gold fixtures, start the dance, then get out.', kind: 'ballroom', sky: 0x244773, ground: 0x6f5a42, accent: 0xf7cf5b, targetLabel: 'FIXTURES', target: 5, time: 13 },
  { id: 14, chapter: 'MONUMENTAL LEGACY', title: 'BAN / UNBAN', kicker: 'Pull the plug. Put it back.', briefing: 'Hit 4 gold switches, overload the feed, then get out.', kind: 'plug', sky: 0x152448, ground: 0x313b55, accent: 0xff516c, targetLabel: 'SWITCHES', target: 4, time: 11 },
  { id: 15, chapter: 'MONUMENTAL LEGACY', title: 'THE GOLDEN ESCALATOR', kicker: 'Every promise. All at once.', briefing: 'Hit 7 gold promises, overload everything, then make the final exit.', kind: 'finale', sky: 0x142a4e, ground: 0x4b2634, accent: 0xffc338, targetLabel: 'PROMISES', target: 7, time: 15 }
];

export const missionById = (id: number) => MISSIONS[Math.max(0, Math.min(MISSIONS.length - 1, id - 1))];
