# Technical Architecture Baseline v2

**Status:** DRAFT — Gate 01 REWORK  
**Decision owner:** Game Director / CTO  
**Audit source:** `docs/18_MODERN_STACK_AUDIT.md`

## 1. Editor and package policy

- Unity `6000.5.4f1` pinned as the initial editor.
- URP from the pinned editor/package set.
- Released package versions only in the production baseline.
- Preview/experimental packages are isolated in technical spikes and may not become dependencies without an Impact Note and rollback test.
- Patch upgrades require CI, project-open, compile, automated tests, Android build, iOS build when available, and device smoke tests.

## 2. Platform baseline

- mobile-first iOS and Android;
- landscape;
- IL2CPP for release builds;
- Metal on iOS;
- Vulkan as the primary Android API;
- OpenGL ES is not part of the desired target baseline and may be added only for a justified device segment after profiling.

## 3. Rendering

### Required

- URP;
- Render Graph enabled;
- Compatibility Mode disabled;
- Forward+ for High/Main quality tiers after device proof;
- SRP Batcher;
- GPU Resident Drawer for compatible static and repeated MeshRenderer content;
- Shader Graph for stylized material families;
- Render Graph-compatible custom passes only;
- mip streaming, LOD and material/shader variant governance from the first visual scene.

### Conditional

- GPU Occlusion Culling remains disabled while the pinned editor contains the known GRD interaction issue; it is enabled only after an editor patch and device verification.
- STP is High/Main upscaling and anti-aliasing candidate.
- Low-tier fallback compares lower native render scale and FSR1.
- VFX Graph is used selectively on compatible tiers, with prewarming and Particle System fallback.

## 4. Performance modes

### High

- 60 FPS default;
- optional 120 FPS mode on capable devices;
- highest crowd, shadows, VFX and render scale profile.

### Main

- stable 60 FPS product target;
- quality adaptation begins before thermal collapse;
- no routine downgrade to 30 FPS.

### Supported floor

- stable 30 FPS;
- identical objective and decision logic;
- simplified crowd presentation, debris, secondary shadows and post effects.

## 5. Physics

- GameObject PhysX for authoritative hero, tie proxies, mission-critical bodies and structural constraints;
- 60 Hz baseline fixed simulation;
- selective substeps for tie tension and fast mission-critical bodies;
- bounded forces and authored state transitions remain mandatory;
- multi-threaded vs single-threaded GameObject physics benchmarked in Gate 02;
- runtime fracture is not unrestricted;
- hybrid destruction combines authored structure, physical constraint failure, pooled macro debris and visual micro debris.

## 6. Execution architecture

### Authoritative GameObject layer

- hero;
- tie interaction;
- mission-critical physics;
- tactical positions;
- objectives;
- high-value NPC reactions;
- camera and direction.

### Burst/Jobs layer

Mandatory candidates:

- anchor scoring;
- tie geometry/tension sampling;
- significance and threat ranking;
- batched world sensors;
- Chaos Graph query batches;
- replay compression and validation;
- crowd update scheduling.

### Entities/ECS layer

Optional, benchmark-driven:

- ambient crowds;
- background traffic;
- repeated lightweight reactive props;
- non-authoritative distant systems;
- high-count visual presentation.

Critical mission logic does not depend on experimental DOTS workflows.

## 7. Chaos Graph

- event-driven runtime;
- explicit node contracts;
- typed blackboard;
- deterministic critical state transitions;
- physical sensors as inputs, never uncontrolled polling;
- Unity Graph Toolkit as the preferred editor foundation;
- compile authored graph assets into a compact runtime representation;
- editor validation for dead nodes, cycles, missing references, event storms, unreachable outcomes and invalid performance tiers;
- graph diff summary generated for pull requests.

## 8. Input and haptics

- released Unity Input System;
- EnhancedTouch;
- semantic action layer above raw touch;
- recorded semantic traces for replay and testing;
- one-finger campaign completion remains mandatory;
- native haptics adapter:
  - Core Haptics on supported iOS;
  - Android predefined/composed VibrationEffect;
  - capability-based fallback;
- haptics authored as named events and intensity envelopes.

## 9. Camera

- Cinemachine 3.1.x;
- authored rails/zones and tactical compositions;
- custom Chaos Director arbitrates camera requests;
- camera behavior is deterministic by event priority, cooldown and current input state;
- no manual orbit in campaign;
- replay camera can use a separate cinematic policy without changing gameplay capture.

## 10. Animation

- Animator/clip runtime remains supported;
- Playables-based high-level orchestration;
- Animation Rigging for hand, body and object contact alignment;
- procedural secondary motion for tie, hair and clothing under strict bounds;
- animation event usage must be allocation-free where the current API permits;
- monolithic Animator Controller graphs are prohibited;
- crowd animation uses LOD and may use GPU/VAT or ECS presentation after proof.

## 11. UI

- UI Toolkit and UI Builder for hub, menus, results, settings, accessibility, debug panels and editor tools;
- UXML/USS component library and design tokens;
- runtime UI performance tests on device;
- specialized world-space interaction cues remain scene-native;
- uGUI only for a documented UI Toolkit gap.

## 12. Audio

### Preferred candidate

FMOD Studio 2.03 for:

- adaptive music stems;
- parameter-driven tension and chaos layers;
- mixer snapshots;
- material and mass variation;
- live update on device;
- profiling and voice management.

### Gate 02 spike

FMOD must pass:

- Unity 6.5 editor/import compatibility;
- Android and iOS build;
- suspend/resume and audio interruption tests;
- memory/CPU/voice budget;
- bank loading with Addressables/content versioning;
- source-control workflow.

If it fails, a dedicated provider-independent Unity audio layer is used; direct ad-hoc AudioSource calls remain prohibited.

## 13. Content, localization and live configuration

- Addressables 2.7.x released line;
- content groups by shared core, hub and mission;
- remote catalog capability designed from the start;
- Unity Localization released package from the first UI implementation;
- content, localization and scoring configuration versions recorded in saves and replays;
- live configuration adapter for balance and event values, never for executable mission logic.

## 14. Persistence and social

- atomic, versioned local save with checksum, backup and migrations;
- cloud-save adapter designed immediately, integrated by vertical slice;
- async challenge/replay uses semantic actions, random seed, Chaos Graph transitions, correction keyframes and content version;
- bit-identical PhysX determinism across devices is not assumed;
- server-side validation strategy required before public leaderboards.

## 15. CI, quality and observability

- GitHub remains source of truth;
- Git LFS for approved binaries;
- automated offsite repository mirror;
- accepted Gate tags and immutable build artifacts;
- Unity Project Auditor in CI;
- serialization/code analyzer warnings treated as build failures where relevant;
- edit-mode, play-mode, performance and save migration tests;
- Android build on every integration PR;
- iOS CI when macOS signing pipeline is available;
- crash, ANR and performance telemetry from first external device build;
- Render Graph Viewer, Frame Debugger, Profile Analyzer and physical-device captures form part of Gate evidence.

## 16. Current technical spikes required before Gate 02 lock

1. Unity 6.5.4 project-open and build sanity.
2. Forward+ + GPU Resident Drawer on target Android/iOS candidates.
3. STP image-quality/performance comparison.
4. 60 Hz physics and selective substep tie test.
5. multi-threaded vs single-threaded PhysX comparison.
6. Burst/Jobs anchor and sensor benchmark.
7. Graph Toolkit Chaos Graph proof.
8. UI Toolkit touch/hub prototype.
9. native haptics proof on iOS and Android.
10. FMOD 2.03 compatibility/performance proof.
11. layered crowd proof with fully reactive and lightweight population tiers.

## 17. Definition of top-tier technical choice

A choice is accepted only when it is current, materially improves the player experience or production capability, runs within real device budgets, has a rollback path and is supported by evidence. "Common", "stable" or "easy" are not sufficient reasons by themselves.
