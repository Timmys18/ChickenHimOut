# Mobile Performance Budget v2

**Status:** DRAFT — Gate 01 REWORK  
**Supersedes:** `docs/12_MOBILE_PERFORMANCE_BUDGET.md`

## 1. Product targets

- Main tier: stable 60 FPS.
- High tier: stable 60 FPS with optional 120 FPS mode.
- Supported floor: stable 30 FPS.
- 30 FPS is not the normal Main-tier fallback and must not hide thermal or architecture failures.

## 2. Simulation

- fixed simulation baseline: 60 Hz;
- selective substeps for tie and fast critical bodies;
- physics step target at 60 FPS: 2.5 ms average, 3.5 ms warning, 4.5 ms hard fail during ordinary gameplay;
- multi-threaded and single-threaded GameObject physics compared on real devices;
- peak chaos may exceed the warning briefly but must recover without a frame-time spiral.

## 3. Rendering modes

### High/Main

- URP Render Graph;
- Forward+ candidate;
- Metal/Vulkan;
- SRP Batcher;
- GPU Resident Drawer where compatible;
- STP candidate with discrete render-scale quality states;
- GPU Occlusion Culling disabled until the current GRD issue is fixed and verified.

### Supported floor

- Forward or Forward+ selected by device evidence;
- reduced render scale or FSR1 candidate;
- reduced secondary shadows, particles and crowd presentation;
- mission-critical readability unchanged.

## 4. CPU strategy

At 60 FPS:

- total frame: 16.67 ms;
- main-thread gameplay and orchestration: 3.5 ms target;
- physics: 2.5 ms target;
- animation: 1.5 ms target;
- render thread: 2.5–3.0 ms target;
- GPU: 13.5 ms target;
- ordinary-load margin: minimum 2 ms.

Burst/Jobs move suitable batched work off the main thread. Per-object Update polling is prohibited for scalable ambient systems.

## 5. Physics population

Initial prototype envelope:

- 20–35 mission-critical active rigidbodies;
- 60 awake target during peak chaos;
- 90 temporary hard warning;
- 4–8 tie proxies;
- 12–20 active structural/gameplay constraints;
- continuous collision only for critical fast bodies;
- pooled macro debris with sleep/disable policy;
- visual micro debris is non-authoritative VFX.

These are measured envelopes, not permanent creative caps.

## 6. Layered NPC population

### Fully reactive

- 8–16 high-value NPCs with perception, reaction state and authored safe routes.

### Lightweight midground

- 30–80 simplified agents on capable tiers, with distributed updates and animation LOD.

### Visual crowd

- potentially 100+ visible figures through GPU instancing, VAT, clustered animation or impostors where the mission composition benefits.

Counts are validated by Gate 03 profiling. The scene must feel populated without giving every background figure expensive AI.

## 7. Image quality

- STP evaluated on High/Main devices for temporal stability, tie clarity, thin geometry and fast motion;
- render scale changes occur as controlled quality states rather than uncontrolled continuous oscillation;
- anti-aliasing cannot blur tie edges or interaction anchors;
- transparent overdraw and screen-space effects are profiled during peak chaos;
- image quality acceptance uses recordings and direct observation on target phone displays.

## 8. Thermal adaptation

- Unity Adaptive Performance is integrated from the first device prototype;
- iOS Apple provider and Android provider support are evaluated;
- adaptation acts before sustained throttling;
- scaling order protects input latency, 60 Hz logic where possible, tie readability and decision timing;
- optional 120 FPS mode drops to 60 before visual quality is heavily reduced;
- Main tier drops visual extras before considering 30 FPS.

## 9. Hitches and prewarming

- no first-use shader or VFX hitch during a mission;
- shader variant governance and prewarm lists;
- VFX Graph compute prewarm where used;
- Addressables load warm-up before first actionable frame;
- audio banks and critical samples preloaded according to memory tier;
- pool growth during active chaos is prohibited after warm-up.

## 10. Memory and loading

Initial Main-tier targets:

- mission working set target below 850 MB;
- warning at 1.0 GB;
- hard fail investigation at 1.15 GB;
- mission unload returns close to measured hub baseline;
- retry under 2.5 seconds without full bootstrap reload;
- hub-to-mission under 5 seconds after content availability;
- cold launch target under 8 seconds.

Exact device limits are frozen only after the supported matrix is selected.

## 11. Gate evidence

Gate acceptance requires:

- Unity Profiler device capture;
- Profile Analyzer comparison;
- GPU frame capture where platform tooling permits;
- Render Graph Viewer evidence;
- thermal run, not a 30-second cold-device sample;
- memory-before/after scene unload comparison;
- frame-time percentile report, not average FPS only;
- input latency and tie-release consistency sample.

## 12. Automatic failures

CI/development builds flag:

- physics or Chaos Graph event storms;
- excess awake bodies;
- unexpected per-frame allocations;
- shader variant explosion;
- first-use VFX/shader compilation;
- memory not returning after unload;
- draw/SetPass regression;
- Main tier falling to 30 FPS before approved thermal thresholds;
- crowd systems consuming authoritative gameplay budget.
