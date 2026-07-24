# Gate 02 — Mechanical Prototype Plan Before Build v2

**Status:** PROPOSED — blocked until Gate 01 REWORK is accepted

## 1. Goal

Prove both the core mechanic and the revised modern technical baseline before production art.

## 2. Player-visible proof

A greybox Wall mission in which the player:

- reads a living system;
- selects tactical positions;
- hooks, pulls, links and releases;
- causes a system response;
- makes at least two post-Commit decisions;
- escapes actively;
- can replay through a different route.

## 3. Technical proof package

### Editor and build

- Unity `6000.5.4f1`;
- URP with Render Graph enabled;
- Android IL2CPP device build;
- iOS device build as soon as signing hardware/pipeline is available;
- Metal/Vulkan baseline;
- package lock and reproducible project-open/build test.

### Rendering spikes

- Forward+ vs Forward on representative devices;
- GPU Resident Drawer proof;
- STP vs fallback image-quality/performance comparison;
- no GPU Occlusion Culling until the current GRD issue is resolved and verified;
- Render Graph Viewer and frame capture evidence.

### Input and feel

- released Input System + EnhancedTouch;
- semantic gesture recording;
- native iOS/Android haptics proof;
- Cinemachine 3.1.x camera modes;
- 60 Hz physics baseline with selective substep experiment.

### Execution and tooling

- Burst/Jobs anchor scoring and sensor benchmark;
- Graph Toolkit Chaos Graph editor proof;
- compact runtime graph export;
- Project Auditor and serialization analyzer in CI;
- multi-threaded vs single-threaded PhysX test.

### Experience stack spikes

- UI Toolkit mission/debug/result panel proof;
- Playables + Animation Rigging contact proof;
- FMOD 2.03 Android/iOS compatibility and performance proof;
- layered crowd proof: fully reactive + lightweight + visual crowd.

## 4. Deliberately excluded

- final character and environment art;
- full golf-club hub;
- launch economy and SDK integrations;
- mass mission production;
- unrestricted runtime fracture;
- real-time multiplayer;
- final crowd scale.

## 5. Acceptance metrics

### Mechanic

- 8/10 new players perform first Hook after one non-verbal demonstration;
- anchor mis-selection below 10%;
- functionally equivalent gesture result in 9/10 repeated runs;
- first Commit cannot complete the mission;
- at least two post-Commit decisions;
- at least two successful sequences;
- at least 30% voluntary retry rate in the test sample.

### Performance

- Main target device holds stable 60 FPS in greybox;
- physics runs at 60 Hz without solver instability;
- no first-use shader/VFX/audio hitch during actionable play;
- retry below 2.5 seconds;
- no growing memory across 20 retries;
- frame-time percentile report and thermal sample supplied.

### Modern-stack evidence

- every selected package/feature has a measured advantage, a risk and a rollback;
- no preview package becomes a baseline dependency without a separate approval;
- Graph Toolkit, FMOD, STP, GRD, Burst/Jobs and layered crowds each receive explicit proceed/reject decisions;
- device evidence, not Editor performance, supports the Gate result.

## 6. Stop conditions

Redesign or remove a technology if:

- it adds complexity without visible player or production value;
- it prevents stable 60 FPS on Main target;
- it creates nondeterministic tie behavior;
- it introduces an unsupported package dependency;
- it weakens authoring speed or project recoverability;
- it makes the scene less readable despite higher technical sophistication.

## 7. Gate boundary

Approval authorizes greybox and technical spikes only. It does not authorize production art, vertical-slice polish or content scaling.
