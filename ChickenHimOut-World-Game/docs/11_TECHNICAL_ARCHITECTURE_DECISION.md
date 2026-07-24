# Technical Architecture Decision

**Status:** DRAFT — Gate 01  
**Decision owner:** Game Director / CTO

## 1. Recommended Engine

**Unity 6.3 LTS + Universal Render Pipeline (URP)**

### Why

- mobile-first production and iteration speed;
- mature iOS/Android tooling;
- C# is suitable for rapid AI-assisted implementation and maintainable custom editor tools;
- PhysX Rigidbody/Joints provide the required base for controlled 3D physics;
- URP is designed for scalable graphics from mobile to higher-end platforms;
- strong ecosystem for animation, profiling, addressable content, ads/IAP and analytics integration;
- editor extensibility is suitable for a custom Chaos Graph authoring tool;
- 6.3 LTS has a stable support horizon appropriate for locking production.

### Rejected baseline: Unreal Engine 5.8

Unreal supports mobile development and high-end rendering, but for this project it introduces higher editor/runtime overhead, slower iteration for a compact mobile-first production and a greater risk of building around desktop-grade rendering features that must later be removed.

Unreal remains a fallback only if the Visual Target proves unattainable in Unity URP within the performance budget.

### Rejected baseline: Godot

Godot is not selected because the project depends on commercial mobile pipeline maturity, advanced profiling, broad third-party integrations, scalable animation tooling and predictable production staffing.

## 2. Engine Version Policy

- production baseline: Unity 6.3 LTS;
- patch upgrades are allowed after CI and device smoke tests;
- major/editor update releases are not adopted mid-Gate without Impact Note;
- package versions are pinned in `Packages/manifest.json` and lock file;
- project upgrade is performed on a dedicated branch with rollback tag.

## 3. Rendering

### Pipeline

URP, Forward+ or mobile-appropriate forward path selected after device profiling.

### Lighting

- one main directional light;
- baked or mixed indirect lighting for static environment;
- selective dynamic shadows for hero and mission-critical objects;
- reflection probes and local light probes;
- limited real-time point/spot lights;
- custom stylized shaders with low variant count;
- dynamic resolution and quality tiers.

### Visual Strategy

Premium quality comes from art direction, materials, composition, animation and controlled light—not from enabling every expensive rendering feature.

## 4. Physics

### Base

Unity PhysX Rigidbody physics.

### Principle

Critical gameplay uses authored state transitions plus bounded forces. Raw physics is used for continuity and variation, not as the sole source of mission logic.

### Fixed Update

Initial target: 50 Hz physics simulation. Prototype must compare 50 Hz and 60 Hz against feel and CPU budget.

### Collision

- simple primitive/compound colliders for active objects;
- mesh colliders only for static environment or tightly controlled cases;
- collision layers isolate hero, anchors, mission bodies, debris, NPCs and ambience;
- continuous collision detection only on fast, critical bodies;
- physics materials standardized by material family.

### Destruction

Pre-authored break states and detachable modules are preferred over unrestricted runtime fracture.

## 5. Tie System

Custom hybrid system:

- logical connection model;
- analytical/clamped tension;
- limited physical proxy points;
- spline renderer;
- authored attach/release beats;
- Chaos Graph integration.

The tie is not implemented as a long chain of unconstrained rigidbodies.

## 6. Game Architecture

Modular feature-oriented structure:

- `Core` — lifecycle, time, logging, service interfaces;
- `Input` — touch gestures, anchor acquisition, accessibility;
- `Character` — hero state and contextual movement;
- `Tie` — connections, tension, rendering, feedback;
- `World` — entities, materials, destruction, significance;
- `ChaosGraph` — runtime, blackboard, sensors, actions, editor;
- `Mission` — phases, objectives, scoring, result;
- `Director` — camera, audio, VFX, haptics priorities;
- `Hub` — golf club, progression, customization;
- `Persistence` — versioned local save and cloud adapter;
- `Analytics` — typed event schema and provider adapter;
- `Monetization` — IAP/ads behind interfaces;
- `Social` — async challenges and replay trace;
- `Tools` — validation, profiling, content reports.

## 7. Data Model

Use ScriptableObjects for authored definitions:

- mission definition;
- entity definition;
- anchor definition;
- material behaviour;
- scoring rules;
- Chaos Graph asset;
- camera zone;
- NPC role;
- quality profile.

Runtime state is separated from authored assets. ScriptableObjects are immutable during play.

## 8. Content Loading

Unity Addressables baseline:

- mission scenes and mission-specific assets grouped by label;
- hub and shared character assets in core groups;
- remote content support designed but not required for prototype;
- content catalog version recorded in save/replay;
- build validation detects accidental cross-mission dependencies.

## 9. Scene Structure

- persistent bootstrap scene;
- additive hub scene;
- additive mission scene;
- separate lighting scenario where useful;
- mission-specific pools initialized from manifest;
- unloading validated for memory leaks.

## 10. Camera

Cinemachine or equivalent Unity camera framework with custom Director priority layer.

- authored camera rails and zones;
- no manual orbit camera;
- camera requests emitted by Chaos Graph and threat sensors;
- deterministic priority and cooldown rules;
- mobile safe areas included from first implementation.

## 11. Animation

- Animator for hero authored locomotion and reactions;
- Animation Rigging for procedural hands/body alignment;
- limited ragdoll or partial physical reaction only in controlled beats;
- Timeline only for non-critical introductions/results;
- mission-critical logic never depends solely on Timeline timing;
- NPC animation state driven by role/state system.

## 12. Save Architecture

Offline-first, versioned local save:

- atomic write to temporary file then replace;
- checksum and backup slot;
- schema version and migrations;
- no raw Unity object serialization;
- player progress, unlocks, settings, mission records and Prize Probability stored separately from transient scene state;
- cloud save provider behind adapter and added after local integrity tests.

## 13. Analytics

Provider-independent typed event layer.

Initial events:

- session_start/end;
- mission_start/retry/complete/fail/quit;
- anchor_selected;
- tie_attach/release/snap;
- decision_window;
- chaos_chain;
- escape_start/complete/fail;
- scoring_breakdown;
- prize_probability_change;
- performance_sample;
- tutorial_step;
- rewarded_ad_offer/accept/result;
- purchase events.

No provider SDK is allowed to leak directly into gameplay code.

## 14. Async Social and Replay

- input/action trace;
- content version;
- random seed;
- Chaos Graph transition log;
- correction keyframes for visual replay;
- score event log;
- shareable challenge token.

Bit-identical PhysX determinism across devices is not assumed.

## 15. Build and CI/CD

### Source Control

GitHub private repository. Git LFS for large binary assets.

### Branching

- `main` — accepted project state;
- `gate/*` — Gate packages;
- `feature/*` — implementation;
- `fix/*` — bug fixes;
- tags at every accepted Gate and release candidate.

### CI

- compile and edit-mode tests on every pull request;
- content validation;
- forbidden dependency checks;
- Android development build;
- automated smoke test where possible;
- nightly device/performance build;
- iOS build/signing on macOS runner when Apple pipeline begins;
- build artifacts retained outside local machine.

## 16. Asset Storage and Backup

- Git LFS for textures, meshes, audio and source art approved for repository storage;
- source DCC files separated from runtime exports;
- no generated cache folders committed;
- weekly repository mirror or bundle backup to separate storage;
- accepted builds stored as immutable CI artifacts and release assets;
- dependency lock files committed;
- recovery procedure tested before Gate 04.

## 17. Testing

- edit-mode unit tests for graph logic, scoring, save migrations and anchor rules;
- play-mode tests for mission phase transitions;
- deterministic test harness for bounded interactions;
- scene validation tests;
- performance capture scenes;
- device smoke matrix;
- automated save corruption and migration tests.

## 18. Accessibility Baseline

- scalable UI and safe-area support;
- color is never the only signal;
- haptics and screen shake toggles;
- stronger anchor assistance mode;
- adjustable text size;
- subtitles for any voiced content;
- left/right-handed comfort validated even without joystick;
- reduced motion option for camera and slow motion.

## 19. Decision Triggers

Reconsider Unity baseline only if one of these occurs during Gate 02–03:

- tie feel cannot be stabilized within the required CPU budget;
- URP cannot meet approved Visual Target on target devices;
- critical platform tooling blocks iOS/Android release;
- editor extensibility cannot support the Chaos Graph workflow;
- licensing changes materially alter business feasibility.

## 20. Official References

- Unity 6 release support: https://unity.com/releases/unity-6/support
- Unity 6 releases: https://unity.com/releases/unity-6
- Unity pricing updates: https://unity.com/products/pricing-updates
- Unity Pro thresholds: https://unity.com/products/unity-pro
- Unity URP manual: https://docs.unity3d.com/6000.0/Documentation/Manual/universal-render-pipeline.html
- Unity Adaptive Performance: https://docs.unity3d.com/6000.0/Documentation/Manual/com.unity.adaptiveperformance.html
- Unreal mobile development alternative: https://dev.epicgames.com/documentation/en-us/unreal-engine/getting-started-with-mobile-development-in-unreal-engine
