# Mission Design Framework

**Status:** DRAFT — Gate 01

## 1. Mission Definition

A mission is a compact living system with a globally readable satirical premise, one unique mechanical thesis, multiple player decisions, a controlled escalation and an active escape.

A mission is not:

- a reskinned block-collapse puzzle;
- a single-shot physics vignette;
- a cutscene with occasional taps;
- a free-roaming platform level;
- a collection of disconnected minigames.

## 2. Mandatory Mission Thesis

Every mission begins with one sentence:

> This mission is uniquely about ______.

Examples:

- The Wall: balancing a massive structure while the system keeps compensating incorrectly.
- Greenland: coordinating multiple opposing tow forces on a cracking surface.
- Tariffs: redirecting continuous flows that return amplified consequences.
- Count Again: forcing a cyclic counting system to produce a result it keeps rejecting.
- TikTok: containing a signal that duplicates whenever the deadline is extended.
- The Prize: chasing a target that physically moves farther away as the player claims success.

If the sentence describes only the location or joke, the mission is rejected.

## 3. Mandatory Content Blocks

### World Process

What runs before the player acts?

### Objective

What concrete world state must be achieved?

### First Intervention

What first meaningful tie action changes the system?

### System Response

How does the world resist, compensate or redirect?

### Post-Commit Decisions

At least two decisions after the first irreversible action.

### Pressure Choice

What must the player prioritize under time or instability?

### Escape

How does the changed world create the way out?

### Final State

What is visibly and systemically different from the start?

## 4. Decision Count

Minimum per full campaign mission:

- 3 meaningful decisions;
- 1 tactical position change;
- 1 timed release/hold decision;
- 1 system-response decision;
- 1 active escape decision.

A gesture is not automatically a decision. Repeating the same drag three times does not count as three decisions.

## 5. Mechanical Diversity Matrix

Each mission is tagged across dimensions:

### Primary force

- tension;
- torque;
- flow;
- momentum;
- pressure;
- buoyancy;
- signal/state propagation;
- balance.

### Primary system

- construction;
- logistics;
- counting;
- network;
- towing;
- awards/target chase;
- machinery;
- crowd/ceremony.

### Player control pattern

- setup and release;
- continuous hold;
- rerouting;
- multi-anchor linking;
- timed interception;
- moving-target capture;
- stabilization;
- staged escape.

### Chaos shape

- domino;
- jam;
- feedback loop;
- duplication;
- overload;
- reversal;
- progressive collapse;
- pursuit.

Adjacent missions must differ in at least three dimensions.

## 6. Route Structure

Each mission supports:

### Safe Route

- lower execution difficulty;
- fewer systems;
- moderate score;
- low collateral;
- clear tutorial value.

### Spectacular Route

- more links and timing risk;
- longer Chaos Chain;
- higher style;
- greater collateral risk;
- stronger viral result.

### Hidden Absurd Route

Optional. Formally satisfies the objective while producing an obviously ridiculous outcome.

## 7. Timing Structure

Target pacing:

- 0–5 s: premise and system readability;
- 5–15 s: first setup and Commit;
- 15–35 s: system response and two interventions;
- 30–60 s: escalation and escape;
- 3–8 s: result beat.

Later levels may extend this, but decision density must remain.

## 8. Mission Object Budget

Typical mission:

- 5–8 Tier A mission-critical entities;
- 8–15 Tier B reactive props;
- 4–12 reactive NPCs;
- 2–4 tactical positions;
- 6–12 anchors visible per phase, but only 2–5 strongly relevant at once;
- 1–3 active hazards;
- 2 escape routes, one primary and one risky/hidden;
- 1–2 optional collectibles or style opportunities.

## 9. Readability Rules

- objective object is recognizable within 3 seconds;
- critical anchors differ by shape/function, not only color;
- foreground props do not obscure touch targets;
- system response is announced through physical motion, NPC gaze, sound and camera;
- only current-phase anchors receive strong feedback;
- dangerous trajectory crosses visible space before impact;
- failed state has a readable cause.

## 10. Comedy Rules

Comedy should emerge from cause and effect:

- premature celebration;
- system obeying the literal order but producing the opposite result;
- heroic pose during obvious failure;
- self-created obstacle becoming escape tool;
- score praising execution while Prize Probability collapses.

Avoid relying on text-only jokes, random slapstick or direct quotation of a real person.

## 11. Mission Review Checklist

A mission cannot enter greybox until all answers are concrete:

1. What does the world do without the player?
2. What is the unique mechanical thesis?
3. What does the first Commit change?
4. How does the system respond?
5. What are the two post-Commit decisions?
6. What is the pressure choice?
7. What are Safe and Spectacular routes?
8. How does escape use the consequences?
9. What makes the final frame globally readable?
10. Why can this not be reskinned into another mission unchanged?
11. What is the performance peak?
12. Which objects are Tier A/B/C/D?
13. What analytics prove whether it is fun or confusing?

## 12. Mission Acceptance Metrics

During playtest:

- 80% understand objective after intro without explanation;
- 70% discover first valid interaction within 10 seconds;
- fewer than 20% fail because of camera or anchor selection;
- players make at least one different choice on second run;
- median retry time under 3 seconds;
- at least 30% voluntarily replay after first success in focused test;
- no single route dominates more than 85% after hints are removed;
- players can describe the cause chain after the run.

## 13. Content Production Template

Each mission folder must contain:

- `MISSION_BRIEF.md`;
- `MECHANICAL_THESIS.md`;
- `CHAOS_GRAPH.md` or graph export;
- `SCENE_ENTITY_LIST.md`;
- `CAMERA_PLAN.md`;
- `AUDIO_BEATS.md`;
- `PERFORMANCE_BUDGET.md`;
- `PLAYTEST_PLAN.md`;
- `LEGAL_REVIEW.md`;
- `ACCEPTANCE_REPORT.md`.
