# Mobile Performance Budget

**Status:** DRAFT — Gate 01

## 1. Performance Objective

ChickenHimOut должна выглядеть premium, но работать как дисциплинированная mobile-first игра. Производительность является ограничением дизайна с первого greybox, а не финальной оптимизацией.

## 2. Device Tiers

### Tier H — High

Recent flagship devices.

- target: 60 FPS;
- dynamic resolution 0.85–1.0;
- highest shadow and VFX tier;
- full reactive props within approved caps.

### Tier M — Main Target

Устройства среднего/верхнего среднего класса последних нескольких лет.

- target: stable 60 FPS where feasible;
- minimum accepted: locked 30 FPS fallback after thermal pressure;
- dynamic resolution 0.70–1.0;
- reduced shadow distance and particles.

### Tier L — Supported Floor

Older supported devices.

- target: stable 30 FPS;
- dynamic resolution 0.60–0.85;
- reduced NPC density, debris, shadows and post-processing;
- gameplay logic identical to higher tiers.

Exact device matrix is frozen after Gate 03 profiling.

## 3. Frame Budgets

### 60 FPS target

- total frame: 16.67 ms;
- main thread gameplay + scripting: 4.0 ms target, 5.5 ms hard warning;
- physics: 2.5 ms target, 4.0 ms hard warning;
- animation: 1.5 ms target;
- render thread: 3.0 ms target;
- GPU: 13.5 ms target, 16.0 ms warning;
- reserved margin: at least 2 ms under ordinary load.

### 30 FPS fallback

- total frame: 33.33 ms;
- no subsystem may simply double its workload;
- quality scaling must activate before sustained thermal throttling;
- input and logical simulation remain responsive.

## 4. Physics Budget

Per active mission scene baseline:

- mission-critical active rigidbodies: 20–35;
- total awake rigidbodies during peak chaos: 60 target, 90 hard cap;
- continuous collision bodies: 6 target, 12 cap;
- active gameplay joints/connections: 12 target, 20 cap;
- tie physical proxies: 4–8;
- debris rigidbodies: 20 target, 40 cap, aggressively pooled/slept;
- physics sensors: event-driven or sampled, no uncontrolled per-object polling;
- solver iterations adjusted by class, not globally maximized.

If a visual sequence needs more objects, lower tiers use state animation, GPU particles or non-colliding debris.

## 5. NPC Budget

- Tier A/B active reactive NPCs: 6–12;
- visible ambient NPCs: 12–24 using simplified update and animation LOD;
- full perception checks: 4–8 per frame distributed over time;
- distant crowd: instanced/clustered animation or baked loops;
- no NavMesh replanning storm during chaos;
- authored safe routes and local avoidance replace general crowd simulation.

## 6. Rendering Budget

Initial scene targets, validated on device:

- draw calls: 150–220 ordinary, 280 peak warning;
- set-pass calls minimized through shared materials and SRP Batcher;
- visible triangles: approximately 300k–600k depending on tier and scene;
- skinned meshes: hero + 6–12 significant NPCs;
- one primary shadow-casting directional light;
- additional real-time shadowed lights: 0–2, short range;
- transparent overdraw strictly monitored;
- particle systems: 20 active target, 35 peak cap;
- post-processing limited to approved stack per quality tier.

These are starting budgets, not excuses to fill every limit.

## 7. Texture and Memory Budget

### Runtime memory targets

- total app working set during mission: under 900 MB on Tier M target;
- hard warning: 1.2 GB;
- texture memory: 300–450 MB depending on tier;
- mesh/animation/audio and engine allocations monitored separately;
- no mission scene keeps unused hub assets resident;
- mission unload must return memory near baseline.

### Texture rules

- default 1K/2K according to screen importance;
- 4K only for exceptional shared hero/marketing assets and downscaled per platform;
- texture atlases where they reduce state changes without causing waste;
- platform compression and mipmaps mandatory;
- transparent textures reviewed for overdraw and memory;
- source textures stored separately from runtime imports.

## 8. Audio Budget

- compressed streaming for music and long ambience;
- decompressed short critical SFX;
- simultaneous voices capped by priority;
- low-priority debris sounds virtualized or dropped;
- spatial audio limited to gameplay-relevant sources;
- audio pools and mixer snapshots used for state changes.

## 9. Quality Scaling Order

When performance or thermal pressure worsens, scale in this order:

1. particle count and debris lifetime;
2. shadow distance/resolution;
3. ambient NPC update rate and density;
4. dynamic resolution;
5. secondary lights and reflections;
6. post-processing;
7. animation LOD;
8. selected reactive Tier B objects.

Never scale:

- mission-critical anchors;
- objective logic;
- tie readability;
- decision windows;
- collision needed for success/failure;
- core NPC cues required to understand the scene.

## 10. Thermal Strategy

- monitor thermal state through platform/Adaptive Performance where supported;
- avoid sustained maximum load during hub and result screens;
- use scene transitions as cooling opportunities;
- pre-emptively reduce quality after sustained load rather than waiting for frame collapse;
- preserve input latency and physics consistency over visual extras.

## 11. Loading Targets

- cold launch to interactive: target under 8 seconds on Tier M;
- hub to mission: target under 5 seconds after first content download;
- retry: under 3 seconds, preferably without full scene reload;
- result to hub: under 4 seconds;
- no visible synchronous asset spike during first player action.

## 12. Build Size Targets

Planning targets:

- initial store download: under 500 MB if achievable without harming first-session quality;
- optional mission content through Addressables/content packs;
- shared assets deduplicated;
- source files never included in player build;
- build report reviewed each sprint.

Final store constraints are revalidated before release.

## 13. Profiling Cadence

- Editor profiling is diagnostic only;
- physical Android device profiling begins in Gate 02;
- iOS profiling begins no later than Gate 03;
- performance capture after every major interaction change;
- nightly representative scene benchmark in Gate 04+;
- top allocations and spikes recorded in Risk Register;
- no Gate accepted using desktop FPS as evidence of mobile performance.

## 14. Performance Acceptance Gates

### Gate 02

Greybox maintains target frame with debug overlays disabled and no solver instability.

### Gate 03

Visual Target maintains at least 30 FPS on Supported Floor candidate and 60 FPS on Main Target candidate under representative thermal run.

### Gate 04

Full vertical slice meets frame, memory, loading and retry targets on device.

## 15. Automatic Warnings

Development build must show warnings for:

- awake rigidbody cap exceeded;
- active debris cap exceeded;
- physics step over budget;
- draw calls/triangles above profile threshold;
- memory growth after scene unload;
- excessive camera stack/post effects;
- repeated allocations in gameplay loop;
- Chaos Graph event storm;
- NPC significance count above tier.
