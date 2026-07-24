# Gate 01 Rework — Execution Plan

**Status:** IN PROGRESS  
**Owner:** Game Director / CTO

## Goal

Bring Gate 01 back to REVIEW only after the entire product, technical, visual and behavioral blueprint is internally consistent and ready to authorize the mechanical prototype.

## Mandatory Reconciliation Areas

### 1. Engine and rendering

- Unity 6000.5.4f1 pinned;
- URP with Render Graph mandatory;
- Metal/Vulkan baseline;
- Forward+ evaluated as Main/High path;
- GPU Resident Drawer and STP validated on devices;
- no compatibility-mode rendering;
- no editor-only performance evidence.

### 2. Input and tie feel

- Input System + EnhancedTouch;
- semantic input recording;
- one-finger campaign completion;
- native haptics abstraction;
- hybrid tie logic synchronized across visual, audio and haptic feedback;
- no raw rigidbody-chain rope.

### 3. Camera and animation

- Cinemachine 3.1.x;
- Chaos Director priority layer;
- Playables-based orchestration;
- Animation Rigging for contact alignment;
- no oversized Animator state-machine architecture;
- camera never interrupts precision release windows.

### 4. Chaos Graph and living world

- Graph Toolkit authoring spike;
- event-driven runtime;
- Burst/Jobs for heavy batched evaluation;
- layered NPC and crowd presentation;
- autonomous scene processes before player action;
- no passive player observation longer than three seconds during active mission flow.

### 5. Behavioral and neuropsychology design

- first satisfying player-caused payoff within 15 seconds;
- anticipation, agency, surprise, mastery and relief designed explicitly;
- clear causal attribution for success and failure;
- at least three distinct replay motives per mission;
- adaptive assistance without visible humiliation or fake difficulty;
- no coercive streaks, punitive absence mechanics or pay-to-win;
- voluntary immediate retry target at least 40% in prototype playtest.

### 6. The Wall mission

The scenario must be reconciled with:

- updated engine and performance baseline;
- explicit reward cadence;
- three psychologically distinct routes: clean mastery, spectacular chaos, absurd exploit;
- active escape as emotional climax;
- retry under 1.5 seconds target;
- no branch that degrades into a one-shot scripted sequence.

### 7. Audio and haptics

- FMOD 2.03 compatibility/performance spike;
- parameterized adaptive music from Chaos Graph state;
- material-weight audio hierarchy;
- named native haptic events;
- fallback architecture if middleware fails proof;
- audio/haptics included in core feel test, not postponed to polish.

### 8. Analytics and playtest

Required telemetry:

- time to first understood action;
- time to first payoff;
- anchor mis-selection rate;
- cause-understanding after failure;
- passive-watch duration;
- retry latency;
- voluntary retry rate;
- route diversity;
- frustration and delight self-report;
- frame, thermal and memory samples on device.

## Definition of Rework Complete

Gate 01 may return to REVIEW only when:

1. all superseded documents point to their replacements;
2. no remaining file references Unity 6.3 as active baseline;
3. no performance document treats 30 FPS as the Main target;
4. behavioral requirements appear in mission, input, audio, analytics and prototype acceptance criteria;
5. The Wall scenario and Gate 02 plan use one consistent architecture;
6. every major technology decision includes advantage, risk, rollback and proof test;
7. a final contradiction audit reports no blocking inconsistencies;
8. the review package contains a concise Product Owner approval sheet.

## Next Artifacts

- revised Wall scenario v2;
- revised input/camera specification v2;
- revised tie interaction specification v2;
- revised analytics and playtest specification;
- audio/haptics technical spike plan;
- final Gate 01 contradiction audit;
- Gate 01 approval sheet.
