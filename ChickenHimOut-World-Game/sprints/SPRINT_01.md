# Sprint 01 — Game Blueprint and Technical Decision Frame

**Status:** REVIEW  
**Gate:** 01  
**Started:** 2026-07-24  
**Submitted for review:** 2026-07-24

## Objective

Полностью спроектировать игру как систему и подготовить доказуемый путь к mechanical prototype без преждевременного production-кода.

## Approved Inputs

- mobile-first iOS/Android;
- landscape;
- free-to-play with cosmetic IAP and limited rewarded ads;
- The Wall as first vertical slice;
- 10-mission planning baseline;
- no required real-time multiplayer at launch;
- asynchronous challenges and replay sharing architecturally supported;
- 12+/Teen;
- minimal text and visual storytelling.

## Completed Deliverables

- `docs/05_GATE_01_PLAN_BEFORE_BUILD.md`
- `docs/06_GAME_BLUEPRINT_V1.md`
- `docs/07_INPUT_AND_CAMERA_SPEC.md`
- `docs/08_TIE_INTERACTION_SPEC.md`
- `docs/09_CHAOS_GRAPH_SPEC.md`
- `docs/10_LIVING_WORLD_SPEC.md`
- `docs/11_TECHNICAL_ARCHITECTURE_DECISION.md`
- `docs/12_MOBILE_PERFORMANCE_BUDGET.md`
- `docs/13_MISSION_DESIGN_FRAMEWORK.md`
- `docs/14_WALL_VERTICAL_SLICE_SCENARIO.md`
- `docs/15_VISUAL_AND_AUDIO_TARGET_BRIEF.md`
- `docs/16_RISK_REGISTER.md`
- `docs/17_GATE_02_PLAN_BEFORE_BUILD.md`

## Key Recommendations

- Unity 6.3 LTS + URP;
- controlled PhysX with authored mission states;
- hybrid logical/physical tie simulation;
- contextual tactical positions without permanent joystick;
- event-driven Chaos Graph;
- The Wall greybox as Gate 02 prototype;
- explicit mobile performance and simulation caps.

## Review Questions

1. Accept Unity 6.3 LTS + URP as technical baseline?
2. Accept hybrid tie model instead of fully simulated rope?
3. Accept contextual positions and no permanent joystick?
4. Accept The Wall scenario and its Safe/Spectacular/Absurd route structure?
5. Accept Gate 02 prototype scope and metrics?

## Deviations

Gate 01 drafts were committed directly to `main` for immediate crash recovery instead of being developed on a Gate branch. Every file is explicitly marked `DRAFT` or `REVIEW`, so accepted and proposed decisions remain distinguishable. Starting with implementation, feature branches and pull requests are mandatory.

## Gate Result

Awaiting Product Owner decision: `ACCEPTED / REWORK / REJECTED`.
