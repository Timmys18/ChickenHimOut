# Gate 03 — Visual Target Implementation

**Status:** IMPLEMENTATION STARTED / AWAITING UNITY VALIDATION

## Goal

Prove that ChickenHimOut can deliver premium stylized 3D presentation on target mobile hardware without breaking 60 FPS Main-tier design.

## Implemented foundation

- dedicated `gate/03-visual-target` branch based on current mechanical prototype;
- scalable `VisualQualityProfile` asset;
- explicit Supported Floor, Main and High tiers;
- Forward+ / GPU Resident Drawer / STP feature switches;
- visual budgets represented as authored data rather than hidden constants.

## Required scene package

The Wall target scene must contain:

1. final hero placeholder with approved silhouette and production rig topology;
2. one functional wall panel and crane fragment;
3. final red tie material and spline presentation;
4. concrete, painted steel, fabric and paper material families;
5. one hybrid structural-failure event;
6. three reactive props;
7. two fully reactive NPCs plus layered crowd representation;
8. Tactical, Tension, Chaos and Escape camera beats;
9. native haptic events and adaptive audio hooks;
10. device profiler captures.

## Non-negotiable visual tests

- no AI wallpaper or sprite-layer look;
- hero shares lighting, contact shadow and occlusion with scene;
- tie remains readable under every approved background and effect state;
- material families remain distinct on a phone screen;
- peak chaos preserves objective silhouette;
- result frame is shareable without explanatory text;
- no feature is approved from desktop screenshots alone.

## Validation evidence still required

- Unity project opens in `6000.5.4f1` without compile errors;
- EditMode and PlayMode tests pass;
- Android development build launches;
- Main-tier candidate sustains 60 FPS in representative thermal run;
- Supported Floor candidate sustains 30 FPS;
- Render Graph, Frame Debugger and Profile Analyzer captures are attached;
- memory returns near baseline after retry/unload;
- before/after screenshots prove coherent scene integration.

## Gate status rule

The branch may contain a complete implementation package, but Gate 03 cannot be marked `ACCEPTED` until real Unity and device evidence exists.
