# Visual and Audio Target Brief

**Status:** DRAFT — Gate 01

## 1. Visual Product Goal

ChickenHimOut должна выглядеть как дорогая международная stylized 3D animation game, а не как AI-иллюстрация с интерактивными наклейками.

Целевое впечатление:

- цельный физический мир;
- выразительный силуэт;
- крупные читаемые формы;
- материальность и вес;
- насыщенная, но дисциплинированная палитра;
- кинематографичная композиция без потери mobile readability;
- комедия через движение и причинность.

## 2. Style Position

### Desired

- premium stylized realism;
- slightly toy-like clarity;
- simplified surfaces with believable material response;
- controlled exaggeration of scale, deformation and body animation;
- strong silhouettes;
- coherent world lighting;
- selective detail concentrated near interaction zones.

### Avoid

- generic AI concept-art texture;
- photoreal human likeness;
- flat toon outline on top of realistic background;
- over-detailed mobile scene;
- plastic materials with identical roughness;
- constant bloom, neon and particles;
- cheap hypercasual blocks;
- exaggerated cartoon physics without weight.

## 3. Character Integration

The hero must:

- receive the same scene lighting and shadow system;
- have contact shadow and grounded foot interaction;
- be occluded correctly by scene objects;
- react physically to tie tension;
- show secondary motion in tie, hair and clothing;
- have authored anticipation, strain, false confidence and recovery poses;
- remain readable at gameplay camera distance.

The face is not the primary identity carrier. Silhouette, hair mass, body posture, suit and red tie are more important.

## 4. Character Visual Constraints

- adult, not youthful;
- slight belly;
- rumpled dark suit;
- broad, long red tie;
- large smooth yellow hair mass, not individually realistic hair strands;
- limited visible facial area;
- lips may form a compact self-satisfied expression but must not become a pig snout;
- straight, relatively narrow nose;
- no direct real-person scan or exact portrait likeness;
- proportions stylized enough to be independent, recognizable enough to carry satire.

## 5. Environment Architecture

Each mission is built from:

### Functional Geometry

Objects participating in gameplay, collision, destruction and system state.

### Reactive Geometry

Props that move, break, swing, open, spill or respond.

### Structural Shell

Architecture and terrain that establish scale and depth.

### Distant World

Optimized 3D layers, impostors and atmosphere. Never one flat background image as the sole environment.

## 6. Lighting

- one strong readable key direction per mission;
- hero and critical entities remain separated from background;
- contact and cast shadows required;
- local fill through probes and baked/mixed lighting;
- state changes may affect practical lights and ambience;
- no unmotivated studio spotlight following hero;
- color grading supports material identity and gameplay contrast;
- peak chaos remains readable in shadow and highlight.

## 7. Material Language

Material families must be distinct through roughness, response and sound:

- concrete: matte, dusty, chipped edges;
- painted steel: broad highlights, scratches at stress points;
- glass: controlled transparency, visible thickness, readable break states;
- fabric: soft response, folds and secondary motion;
- ice: subsurface-like depth without expensive full simulation;
- plastic: restrained specular response;
- paper: flexible, light, affected by wind;
- rubber: deformation and grip cues.

## 8. Destruction Art Direction

Destruction should feel authored and satisfying:

- deformation or stress cue before failure;
- material-correct sound and fragments;
- large readable pieces, not noisy particle soup;
- dust and debris support the event, not hide it;
- hero and objective remain visible;
- post-destruction scene has a strong final composition.

## 9. VFX Hierarchy

Priority:

1. tie tension and attach feedback;
2. mission-critical stress/failure;
3. hazard direction;
4. system state change;
5. score/style accent;
6. cosmetic debris.

Every VFX must answer a gameplay or emotional question.

## 10. UI Visual Direction

- UI is clearly UI, not fake world geometry pasted over the scene;
- minimal text;
- large touch-safe targets;
- compact score presentation;
- Prize Probability is a simple, memorable instrument;
- mission objective uses icon + short phrase;
- UI animation echoes physical tension, snap and swing;
- no clutter during active drag.

## 11. Golf Club Hub Visual Direction

- premium private club with satirical excess;
- real 3D walkable/viewable space, but navigation remains contextual;
- map/table for mission selection;
- Prize Probability display integrated into the room;
- trophy and consequence objects from missions;
- customization area;
- training range visible through windows or connected terrace;
- hub changes after missions without becoming a separate narrative maze.

## 12. Camera and Composition

- side-three-quarter 2.5D gameplay framing;
- foreground/midground/background separation;
- anchors readable by shape;
- no important object hidden behind hero or UI;
- motion leads the eye through the cause chain;
- establishing frame communicates premise in 3 seconds;
- result frame is shareable without extra explanation.

## 13. Audio Product Goal

Audio must make the world feel physical and expensive while supporting comedy and decision timing.

The player should hear:

- material weight;
- tension building;
- mechanism state;
- danger direction;
- moment of successful attach/release;
- premature celebration;
- collapse escalation;
- escape payoff.

## 14. Music Direction

- international cinematic comedy, not parody of a specific patriotic song;
- bold brass/percussion may support self-importance;
- nimble pizzicato, mallets or rhythmic motifs support mechanical problem-solving;
- music built from adaptive stems;
- intensity follows Chaos Graph phases;
- brief false-victory motif before consequences;
- result variation for clean, spectacular and absurd outcomes;
- golf-club theme is calmer, luxurious and faintly ridiculous.

## 15. Sound System

### Tie

Dedicated layered set:

- fabric movement;
- whip;
- attach click;
- tension fibres;
- overload creak;
- snap;
- swing wind;
- landing/recovery.

### World

- machinery loops respond to states;
- material impacts are mass-scaled;
- system alerts have distinct identity;
- NPC crowd layers react globally and locally;
- important sounds receive priority ducking;
- low-value debris sounds are culled.

### Hero

Mostly non-verbal:

- effort;
- smug approval;
- surprise;
- panic;
- recovery;
- false triumph.

No long dialogue is required for core readability.

## 16. Visual Target Scene

Gate 03 Visual Target should include:

- hero under final lighting;
- one wall panel and crane fragment;
- functional tie attach and tension;
- 2–3 material families;
- one state-based break;
- 3 reactive props;
- 2 NPC reaction states;
- tactical and tension camera modes;
- final VFX and audio pass;
- device performance capture.

## 17. Acceptance Tests

- screenshot without UI reads as one coherent world;
- hero never appears as a pasted sprite;
- materials remain distinguishable on a phone screen;
- interaction anchor is readable without permanent outline;
- tie remains visible against every approved background;
- peak chaos retains objective silhouette;
- audio alone communicates rising tension and failure;
- result frame is visually strong enough for social sharing;
- scene meets mobile performance budget.
