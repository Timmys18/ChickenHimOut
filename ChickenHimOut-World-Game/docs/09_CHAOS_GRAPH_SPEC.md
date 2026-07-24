# Chaos Graph Specification

**Status:** DRAFT — Gate 01

## 1. Purpose

Chaos Graph — data-driven система причин и последствий, которая связывает authored mission logic с контролируемой 3D-физикой.

Она нужна, чтобы:

- сцена ощущалась живой и системной;
- игрок мог вмешиваться после начала хаоса;
- миссии не превращались в заранее записанные ролики;
- физика не превращалась в непредсказуемую кашу;
- новые миссии собирались из повторно используемых типов узлов;
- дизайнер мог видеть и тестировать причинные цепи без переписывания runtime-кода.

## 2. Core Principle

Высокоуровневые состояния и критические переходы являются authored и воспроизводимыми. Микродвижение, столкновения, обломки и вторичная реакция используют физику.

То есть:

> authored causality + bounded physics variability.

## 3. Graph Model

### Nodes

Узел содержит:

- unique ID;
- node type;
- входные сигналы;
- выходные сигналы;
- conditions;
- cooldown;
- priority;
- current state;
- debugging metadata.

### Edges

Ребро описывает зависимость:

- signal;
- condition;
- delay;
- payload;
- one-shot / repeatable;
- required mission phase;
- cancellation rule.

### Blackboard

Общий mission blackboard хранит:

- current phase;
- objective state;
- active hazards;
- hero position;
- tie connections;
- named object states;
- score events;
- timer values;
- escape availability;
- director focus target.

## 4. Node Families

### Source Nodes

Запускают движение или энергию:

- motor;
- vehicle;
- conveyor;
- crane;
- wind;
- water flow;
- scheduled event;
- NPC action.

### Sensor Nodes

Читают мир:

- object entered zone;
- tension threshold;
- joint stress;
- collision impulse;
- angle/position threshold;
- object destroyed;
- player attached/released;
- timer expired;
- NPC witnessed event.

### State Nodes

Хранят authored состояния объекта или системы:

- Normal;
- Alert;
- Stressed;
- Unstable;
- Failing;
- Disabled;
- Transformed;
- Complete.

### Action Nodes

Изменяют мир:

- enable motor;
- unlock anchor;
- change path;
- apply bounded impulse;
- switch animation;
- release joint;
- open/close gate;
- spawn pooled debris;
- trigger NPC reaction;
- change camera target;
- activate escape point.

### Logic Nodes

- AND / OR;
- sequence;
- threshold counter;
- random selector with seeded range;
- state gate;
- priority selector;
- debounce;
- delay;
- cancel/interrupt.

### Score Nodes

- objective progress;
- chaos chain increment;
- style event;
- collateral event;
- secret route;
- clean-run violation;
- prize probability modifier.

### Director Nodes

- camera focus request;
- music intensity;
- slow-motion request;
- haptic event;
- hero reaction beat;
- UI prompt.

## 5. Mission Phases

Every mission uses explicit phases:

`Setup → Intervention → Response → Escalation → Escape → Result`

Graph events may be phase-scoped. This prevents late or duplicate events from breaking the mission after the objective has moved on.

## 6. Physics Integration

Physics never directly decides critical narrative success without validation.

Example:

- PhysX reports panel angle > 24° and support stress > threshold.
- Sensor node emits `PanelUnstable`.
- Graph checks phase and whether emergency brace is active.
- State node moves panel to `Failing`.
- Action node releases specific joint and enables controlled fall profile.

This preserves physical continuity while preventing random solver spikes from skipping the designed escalation.

## 7. Interaction with Tie

Tie system publishes:

- AnchorAcquired;
- TieAttached;
- LinkCreated;
- TensionChanged;
- OverloadEntered;
- TieReleased;
- TieSnapped;
- EscapeAttached.

Chaos Graph can:

- unlock new anchors;
- alter tension limits;
- change object resistance;
- request reattach window;
- convert a temporary tie into autonomous Link;
- mark a connection as score-relevant.

## 8. Reaction Chain Scoring

A Chaos Chain is a directed sequence of unique meaningful event categories. Repeated debris collisions do not create unlimited score.

Example:

`Tie Pull → Stopper Removed → Truck Rolls → Cable Tensions → Crane Rotates → Panel Falls → Gate Opens → Escape Triggered`

Scoring considers:

- number of unique systems;
- chain continuity;
- player interventions inside chain;
- optional risks;
- precision windows;
- rare branch completion.

## 9. Authoring Tool Requirements

Unity Editor tool must provide:

- node graph canvas;
- search and categorized node creation;
- named scene object binding;
- validation warnings;
- phase visualization;
- live runtime highlighting;
- breakpoints and step mode;
- event log;
- graph simulation with mock signals;
- duplicate ID detection;
- unreachable node detection;
- cycle warning;
- score chain preview;
- exportable graph report.

## 10. Validation Rules

Mission cannot enter review if:

- first player action directly activates Result;
- there are fewer than two player decision windows after Commit;
- mission-critical node has no fail-safe route;
- escape point is activated independently of changed world state;
- graph contains an unbounded event loop;
- mandatory event depends only on uncontrolled debris collision;
- score can be farmed by repeated same-category events;
- a critical phase can become impossible without readable warning.

## 11. Determinism and Replay

Full cross-device PhysX determinism is not assumed.

Async replay format stores:

- mission content version;
- random seed;
- player input events;
- selected anchors and positions;
- critical graph transitions;
- periodic object correction keyframes;
- final score event log.

Visual replay may interpolate toward correction keyframes. Competitive validation should use score event rules and integrity checks, not require bit-identical simulation.

## 12. Runtime Architecture

Recommended components:

- `MissionGraphAsset` — serialized authored graph;
- `MissionGraphRunner` — runtime execution;
- `MissionBlackboard` — typed state store;
- `WorldSignalBus` — decoupled event transport;
- `PhysicsSensor` components — translate world observations to signals;
- `MissionAction` components — controlled world mutations;
- `DirectorRequestBus` — camera/audio/VFX priorities;
- `MissionEventRecorder` — analytics and replay trace;
- `GraphValidator` — editor and CI checks.

## 13. Performance Rules

- no per-node Update loops;
- event-driven execution;
- physics sensors use fixed-rate sampling and hysteresis;
- inactive phase nodes do not evaluate;
- graph allocations are pooled or preallocated;
- event log uses bounded ring buffer in release builds;
- visual graph tooling is Editor-only.

## 14. Prototype Scope

Mechanical prototype needs only:

- 12–20 nodes;
- Setup, Response, Escalation and Escape phases;
- tension sensor;
- position/angle sensor;
- state transition;
- two action types;
- camera request;
- score event;
- runtime debug overlay.

## 15. Acceptance Criteria

- designer can change sequence without modifying gameplay code;
- critical branch is reproducible across 20 runs;
- microphysics varies without breaking objective logic;
- graph shows at least two post-Commit decisions;
- event log explains every success/failure;
- no critical mission rule lives only inside an animation timeline;
- graph validation can fail CI for structural errors.
