# Gate 02 — Mechanical Prototype Plan Before Build

**Status:** PROPOSED — requires Gate 01 acceptance

## 1. Goal

Prove that the core mechanic is understandable, controllable, repeatable and replayable before production art begins.

## 2. Player-Visible Result

A greybox Wall scene where the player:

- selects tactical positions;
- hooks and pulls a massive panel;
- links a moving truck to a counterweight system;
- triggers a system response;
- makes at least two decisions after Commit;
- actively escapes through the changed scene;
- receives a basic score breakdown.

## 3. Prototype Deliverables

- Unity 6.3 LTS project baseline;
- Android development build;
- desktop review build;
- touch simulation in Editor and real touch on device;
- two Tactical Position Nodes;
- Hook, Pull, Link and Release;
- hybrid tie visual spline and tension model;
- panel, crane arm, counterweight rail and looping truck;
- minimal Chaos Graph runtime;
- system-response branch;
- active escape interaction;
- camera modes: Tactical, Tension, Chaos, Escape;
- debug overlay and event log;
- analytics prototype events;
- playtest script and report;
- performance capture on at least two Android devices.

## 4. Deliberately Excluded

- final hero art;
- premium materials/lighting;
- full NPC crowd;
- final audio and music;
- Spectacular/Hidden routes beyond minimal proof;
- monetization SDK;
- backend;
- cloud save;
- real-time multiplayer;
- complete golf-club hub.

## 5. Build Sequence

### P0 — Technical Skeleton

- Unity project and packages;
- build pipeline;
- logging and test framework;
- scene bootstrap;
- device deployment.

### P1 — Input and Anchors

- touch drag;
- anchor acquisition;
- tactical position selection;
- preview and cancel;
- debug visualization.

### P2 — Tie Feel

- logical connection;
- tension;
- visual spline;
- bounded force;
- Hook/Pull/Release repeatability.

### P3 — Link and World Systems

- autonomous Link;
- truck loop;
- counterweight response;
- panel state sensors;
- basic Chaos Graph.

### P4 — Mission Flow

- Setup, Response, Escalation, Escape, Result;
- failure and instant retry;
- score events;
- camera priorities.

### P5 — Playtest and Performance

- first-time user tests;
- repeated gesture tests;
- decision/replay tests;
- on-device profiling;
- issue triage;
- Gate report.

## 6. Prototype Acceptance Criteria

### Understanding

- 8/10 players perform first Hook after one non-verbal demonstration;
- 7/10 identify the objective within 5 seconds;
- 7/10 discover a valid first action within 10 seconds.

### Control

- anchor mis-selection under 10%;
- same gesture gives functionally equivalent result in 9/10 runs;
- attach feedback begins in the same rendered frame;
- no required gesture uses two fingers.

### Depth

- first Commit cannot complete mission;
- at least two meaningful post-Commit decisions occur;
- at least two successful action sequences exist by final prototype iteration;
- at least 30% of successful testers voluntarily retry to improve or change approach.

### Readability

- player can explain why the system responded;
- camera never hides objective-critical event;
- fail reason is understood without developer explanation;
- active escape is recognized as part of gameplay.

### Technical

- no catastrophic solver failure across 100 automated/manual runs;
- stable 60 FPS target on selected Main Target Android test device in greybox;
- stable 30 FPS on Supported Floor candidate;
- physics within budget during peak event;
- retry under 3 seconds;
- no increasing memory leak across 20 retries.

## 7. Stop Conditions

Prototype work stops for redesign if:

- basic tie feel remains random after two solver/tuning approaches;
- players consistently treat the mechanic as one-shot slingshot;
- camera must become manually controlled to make the level understandable;
- post-Commit decisions feel like arbitrary quick-time events;
- performance requires removing core living-system behavior;
- success depends on pixel-perfect touch.

## 8. Evidence Required for Gate 02 Review

- playable Android build;
- desktop build;
- unedited gameplay recordings;
- playtest sample and results;
- anchor heatmap;
- retry/replay behavior;
- profiler captures;
- event log examples;
- list of deviations from Blueprint;
- recommendation: proceed / redesign / stop.

## 9. Gate Boundary

Acceptance of this plan authorizes a mechanical prototype only. It does not authorize production art, full vertical slice construction or mass mission production.
