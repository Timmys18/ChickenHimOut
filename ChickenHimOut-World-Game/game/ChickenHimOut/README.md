# ChickenHimOut — Mechanical Prototype

Unity project root for Gate 02.

## Editor

- Unity `6000.5.4f1`
- URP with Render Graph
- Target: Android/iOS landscape
- Main-tier target: 60 FPS / 60 Hz physics

## Gate 02 scope

The first playable proof is **The Wall** greybox. It must prove:

- touch-first Hook, Pull, Link and Release;
- contextual Tactical Positions;
- hybrid tie control;
- system response after the first Commit;
- at least two post-Commit decisions;
- active escape;
- immediate retry;
- semantic analytics and playtest capture.

## Source layout

- `Assets/Game/Core` — lifecycle and shared contracts;
- `Assets/Game/Input` — semantic pointer/touch input;
- `Assets/Game/Interaction` — anchors and acquisition;
- `Assets/Game/Tie` — tie state, tension and connections;
- `Assets/Game/Character` — tactical position movement;
- `Assets/Game/ChaosGraph` — causal mission runtime;
- `Assets/Game/Mission` — mission phase and objective flow;
- `Assets/Game/Tests` — edit/play mode tests.

No asset, code or architecture is inherited from the first game iteration.
