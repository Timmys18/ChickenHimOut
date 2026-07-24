# Living World Specification

**Status:** DRAFT — Gate 01

## 1. Goal

Живой мир — это не декоративная анимация и не бесконтрольная симуляция. Это сцена, которая:

- работает до появления игрока;
- реагирует на его вмешательство;
- перестраивает свои процессы;
- создаёт новые игровые условия;
- сохраняет понятную причинность;
- остаётся производительной на мобильных устройствах.

## 2. Four Reaction Layers

### Physical Layer

- mass and inertia;
- friction and surface response;
- joints and supports;
- controlled deformation;
- collisions;
- break states;
- debris;
- secondary motion.

### System Layer

- power;
- transport flow;
- mechanisms;
- doors and gates;
- signal routing;
- cranes and conveyors;
- timers;
- automatic safety responses.

### Social Layer

NPC видят события, меняют состояние и действуют в пределах роли:

- continue routine;
- notice;
- inspect;
- warn;
- avoid;
- panic;
- record;
- applaud prematurely;
- block;
- assist;
- escape.

### Direction Layer

- camera focus;
- music intensity;
- sound emphasis;
- slow motion;
- haptics;
- hero reaction;
- visual hierarchy.

## 3. Simulation Tiers

### Tier A — Mission Critical

Полная симуляция и Chaos Graph integration.

Examples:

- wall panel;
- crane;
- counterweight;
- payment truck;
- main gate;
- hero;
- escape vehicle.

### Tier B — Reactive

Упрощённая физика или state-based reaction:

- loose tools;
- flags;
- cables;
- signs;
- press equipment;
- nearby NPC props.

### Tier C — Ambient

Looped or event-switched behaviour:

- distant workers;
- background traffic;
- machinery silhouettes;
- screens;
- birds;
- dust;
- wind-driven elements.

### Tier D — Distant World

Optimized geometry, baked or clustered animation, parallax and atmosphere. Не является одной плоской картинкой.

## 4. Significance Manager

Runtime system assigns simulation level based on:

- mission relevance;
- camera distance;
- current phase;
- visibility;
- recent interaction;
- potential threat;
- Director focus.

Objects may promote from Tier C/B to Tier A temporarily when they enter a meaningful chain.

## 5. Idle World Test

Если игрок ничего не делает 20 секунд:

- минимум 3 независимых ambient processes продолжаются;
- минимум 1 process creates a timing window;
- NPC routines remain coherent;
- no critical objective completes or fails automatically without readable countdown;
- world does not visibly loop in sync.

## 6. NPC Architecture

NPC do not require general-purpose AI.

Each NPC uses:

- role;
- routine path or station;
- awareness cone/zone;
- current state;
- reaction priority;
- safe destination;
- limited interaction set;
- animation library;
- voice/noise palette.

NPC state changes are driven by world signals and local perception.

## 7. NPC Readability

NPC reactions help the player understand the world:

- look direction points to a critical event;
- group movement reveals danger direction;
- worker gestures indicate stress in a mechanism;
- press NPCs turn cameras toward a major event;
- security NPCs reveal blocked routes;
- applause can comically confirm a false success.

NPC must not create dense visual noise around touch anchors.

## 8. Destruction Model

Not every object uses runtime fracture.

### State-Based Destruction

Preferred for mission-critical structures:

`Intact → Stressed → Damaged → Failing → Broken`

Each state may swap geometry, joints, colliders, VFX and sounds.

### Modular Breakage

Pre-authored detachable parts with real rigidbodies.

### Procedural Debris

Used sparingly for glass, dust and small fragments. Pooled, capped and non-critical.

### Cosmetic Destruction

Shaders, decals, dents and particles without gameplay collision.

## 9. Material Behaviour

Core material families:

- steel;
- painted metal;
- concrete;
- glass;
- fabric;
- rubber;
- ice;
- paper;
- plastic;
- water/foam.

Each family defines:

- sound set;
- impact VFX;
- friction range;
- damage visual;
- break behaviour;
- haptic weight.

## 10. World Persistence

Mission results may affect the golf-club hub through lightweight persistent consequences:

- trophy or recovered prop;
- damaged decoration;
- news screen;
- environmental object placed on course;
- updated mission plaque;
- cosmetic unlock.

Campaign missions themselves do not need full persistent simulation after exit.

## 11. Audio Life

Each scene has:

- ambient bed;
- machinery loops with spatial placement;
- NPC murmur layers;
- state transition cues;
- material impacts;
- tie sounds;
- director accents;
- dynamic music stems.

Audio processes must react to system state: a stopped conveyor becomes silent, a stressed cable changes pitch, a power failure changes ambience.

## 12. Visual Life

- asynchronous loop offsets;
- varied animation speed;
- moving shadows and wind response;
- screens and signs changing on independent schedules;
- local dust and debris affected by events;
- foreground, midground and background motion;
- no entire scene moving on the same beat.

## 13. Performance Controls

- object pooling;
- physics sleep and wake control;
- capped active debris;
- animation culling;
- LOD Groups;
- simplified distant skeletons;
- baked lighting for static environment with limited dynamic lights;
- shadow distance tiers;
- material instance reuse;
- event-driven NPC updates;
- fixed-rate perception sampling;
- dynamic resolution and quality scaling.

## 14. Anti-Fake-Life Rules

A scene fails Living World review if:

- NPCs loop without reacting to major events;
- background activity has no relation to system state;
- broken machinery continues its old sound/animation;
- objects have shadows/light inconsistent with the scene;
- all movement stops when the player is idle;
- every reaction is a particle effect with no state change;
- the world resets visibly during the mission;
- important objects are painted into non-interactive background geometry.

## 15. Prototype Scope

The Wall greybox needs:

- 2 ambient machinery loops;
- 4–6 NPCs with 3 reaction states;
- 1 transport loop;
- 1 system automation response;
- 1 state-based structural failure;
- 10–15 Tier B props;
- significance debug overlay.

## 16. Acceptance Criteria

- Idle World Test passes;
- major event changes physical, system, NPC and audio state;
- player can identify the system response without text;
- critical object remains readable during maximum chaos;
- inactive simulation tiers stay within performance budget;
- no important interaction depends on an object that looks decorative.
