# Modern Stack Audit — Gate 01 Rework

**Status:** COMPLETED AUDIT — CHANGES REQUIRED  
**Date:** 2026-07-24  
**Owner:** Game Director / CTO

## 1. Reason

Gate 01 contained several competent but overly conventional baselines. The project requirement is not "safe default Unity game". It is a top-tier, contemporary mobile game with premium presentation, strong physical interaction and a living world.

The new rule is:

> Use the newest production-ready solution that gives a measurable product or production advantage. Experimental technology is allowed only as an isolated spike with a rollback path. Stability alone is not a reason to choose an older or weaker solution.

## 2. Findings and corrections

### A-001 — Editor version

**Previous:** Unity 6.3 LTS.  
**Correction:** Unity `6000.5.4f1`, the current 6.5 patch at the audit date.

The editor version is pinned. Patch upgrades require automated smoke tests and device profiling. Update-branch upgrades require an Impact Note.

### A-002 — Rendering architecture

**Previous:** generic URP with Forward+ or Forward to be chosen later.  
**Correction:**

- URP remains the correct mobile-first render pipeline;
- Render Graph is mandatory; Compatibility Mode is prohibited;
- Metal on iOS and Vulkan on Android are the primary graphics APIs;
- Forward+ is the primary High/Main tier path;
- Forward fallback exists only if device profiling proves a material benefit;
- GPU Resident Drawer is enabled for compatible MeshRenderer content;
- GPU Occlusion Culling is not enabled until the current Unity 6.5 known issue with GRD is fixed and verified;
- shader features are authored through Shader Graph and Render Graph-compatible custom passes;
- Dynamic Batching is not used as a strategic optimization.

### A-003 — Upscaling and image quality

**Previous:** generic dynamic resolution.  
**Correction:**

- STP is the primary High/Main tier upscaler and anti-aliasing path;
- render scale changes use discrete quality states because STP is not compatible with URP dynamic resolution;
- low-tier fallback is native lower render scale or FSR1 after device comparison;
- image quality is validated on real phone displays, not desktop screenshots.

### A-004 — Frame rate and physics cadence

**Previous:** 60 FPS where feasible, 30 FPS fallback; physics starts at 50 Hz.  
**Correction:**

- 60 FPS is the Main tier product target, not an aspiration;
- 120 FPS is an optional High-tier mode on capable devices;
- 30 FPS is only a supported-floor or thermal emergency mode;
- gameplay physics starts at 60 Hz;
- selective substeps are allowed for tie tension and fast mission-critical events;
- Unity 6.5.4 multi-threaded PhysX mode is benchmarked against single-threaded mode before lock.

### A-005 — Data-oriented execution

**Previous:** primarily conventional GameObject/MonoBehaviour architecture.  
**Correction:** hybrid architecture:

- GameObjects/PhysX remain the authoritative layer for hero, tie, mission-critical objects and authored interactions;
- Burst + Jobs are mandatory for tie math, anchor scoring, significance evaluation, batched sensors, replay processing and heavy Chaos Graph queries;
- Entities/ECS is available for ambient crowds, background traffic, repeated reactive props and other scalable non-authoritative systems when profiling justifies it;
- DOTS is not used as a badge or forced into critical authored gameplay.

### A-006 — Chaos Graph authoring

**Previous:** unspecified custom editor.  
**Correction:** Unity Graph Toolkit is the preferred editor foundation for Chaos Graph. Unity 6.5 adds public node/wire connection APIs and Blackboard list support relevant to a production graph authoring workflow.

A fallback custom UI Toolkit graph implementation remains available only if GTK blocks required validation, diffability or runtime export.

### A-007 — Input

**Previous:** touch vocabulary specified, package not locked.  
**Correction:**

- Unity Input System released package;
- EnhancedTouch for touch history, finger identity and gesture analysis;
- input recording/replay at the semantic action layer;
- no legacy Input Manager dependency.

### A-008 — Haptics

**Previous:** generic vibration curves.  
**Correction:** native-quality haptics adapter:

- Core Haptics patterns on supported iOS devices;
- Android predefined and composed VibrationEffect patterns with capability fallback;
- haptics authored as named gameplay events and profiled on devices;
- simple vibration is only the fallback.

### A-009 — Camera

**Previous:** "Cinemachine or equivalent".  
**Correction:** Cinemachine 3.1.x is the explicit camera foundation, extended by the custom Chaos Director priority layer.

### A-010 — UI

**Previous:** UI visual direction only; implementation unspecified.  
**Correction:**

- UI Toolkit + UI Builder for golf hub, menus, mission results, settings, accessibility and internal tools;
- world-space interaction cues are native scene elements or a minimal specialized overlay;
- uGUI is permitted only for a proven feature gap, not as the default.

### A-011 — Animation

**Previous:** Animator as the general orchestration layer.  
**Correction:**

- Animator remains the clip runtime, not the high-level game-state brain;
- Playables-based orchestration handles layered reactions and context;
- Animation Rigging handles hand, body and tie contact alignment;
- procedural secondary motion is bounded and authored;
- large Animator Controller state-machine webs are prohibited;
- ambient crowds use animation LOD, GPU/VAT techniques or ECS presentation after profiling.

### A-012 — Audio

**Previous:** strong design brief but no production middleware decision.  
**Correction:** built-in Unity audio is not the assumed final stack.

- FMOD Studio 2.03 is the preferred adaptive-audio candidate for stems, snapshots, live update and profiling;
- a Gate 02 compatibility/performance spike must validate FMOD against Unity 6.5, iOS and Android before lock;
- if the integration is not production-safe on the pinned editor, the fallback is a dedicated Unity audio architecture, not ad-hoc AudioSources.

### A-013 — Destruction

**Previous:** mostly pre-authored break states.  
**Correction:** hybrid destruction:

- authored structural fracture and deterministic mission states;
- runtime joint/constraint failure and selective deformation;
- pooled physical macro debris;
- GPU/VFX debris for visual volume;
- no unrestricted runtime fracture that destroys mobile performance or game readability.

### A-014 — Living crowds

**Previous:** conservative visible NPC caps.  
**Correction:** layered population:

- a small set of fully reactive gameplay NPCs;
- larger lightweight midground groups;
- high-count visual crowds using instancing, animation LOD, VAT or impostors;
- quality tiers change crowd presentation, not mission logic.

Exact counts are established by Gate 03 device profiling, not frozen prematurely.

### A-015 — Content and localization

**Correction:**

- Addressables 2.7.x released package is the content baseline;
- remote catalog/content delivery is architecture-ready from the first production mission;
- Unity Localization released package is integrated from the first UI implementation even with minimal text;
- mission content and localization versions are recorded in replay and save data.

### A-016 — Tooling and CI

**Correction:**

- Unity Project Auditor and serialization code analyzer are mandatory in CI;
- Render Graph Viewer, Frame Debugger, Profile Analyzer and device captures are part of Gate evidence;
- VFX Graph compute shaders are prewarmed where VFX Graph is used;
- accepted Gate builds are immutable artifacts;
- repository mirror/backup is automated, not a manual weekly task;
- crash and performance telemetry begins with the first external device build.

## 3. Decisions that remain correct

The following are not conservative mistakes and remain:

- URP instead of HDRP for mobile-first production;
- hybrid tie rather than a raw rigidbody-chain rope;
- controlled physics plus authored state transitions;
- no permanent joystick;
- contextual tactical positions;
- no mandatory real-time multiplayer at launch;
- pre-authored structural failure combined with selective physical variation;
- visual quality achieved through art direction and disciplined rendering, not by enabling every expensive feature.

## 4. New acceptance rule

No architecture item is approved merely because it is common, stable or easier. Every major choice must state:

1. the current production-ready option;
2. the measurable advantage for ChickenHimOut;
3. the risk and rollback;
4. the device or workflow test that proves the choice;
5. why a newer or more ambitious alternative is not better.

## 5. Gate impact

Gate 01 returns from REVIEW to REWORK. The previous Technical Architecture Decision is superseded. Gate 01 cannot be accepted until the revised baseline, performance budget and prototype plan incorporate this audit.
