# ChickenHimOut Delivery Plan

This file is the approved execution order. Only one stage may be active at a
time. `main` always represents the last accepted checkpoint.

## Working protocol

Every stage must end with:

1. scoped changes only;
2. automated checks and visual evidence appropriate to the stage;
3. an explicit Git commit and checkpoint tag;
4. source and build archives with SHA-256 checksums;
5. an independent persistent backup;
6. an updated `STATUS.md`, `CHANGELOG.md`, `KNOWN_ISSUES.md`, and, when art is
   touched, `ASSET_MANIFEST.md`;
7. a user-facing report before the next stage starts.

If a session is interrupted, work resumes from the last commit recorded in
`STATUS.md`, never from chat memory or an unverified progress message.

## Stages

| Stage | Scope | Acceptance gate |
| --- | --- | --- |
| 00 | Recovery, Git baseline, private remote, independent backup | Restorable checkpoint, hashes, clean Git status |
| 01 | Factual product and code audit | Evidence-backed feature matrix, no unverified “done” claims |
| 02 | Inventory and lock all existing art | Approved asset manifest; no duplicate generation |
| 03 | Finalize core controls, scoring, timer, and first 20 seconds | First-run flow is understandable and regression-tested |
| 04 | Mission 1 production-quality reference | Visual and gameplay quality bar accepted |
| 05 | Missions 2–3 | Each mission committed and verified separately |
| 06 | Missions 4–6 | Each mission committed and verified separately |
| 07 | Missions 7–9 | Each mission committed and verified separately |
| 08 | Missions 10–12 | Each mission committed and verified separately |
| 09 | Missions 13–15 | Each mission committed and verified separately |
| 10 | Daily, Golf, cosmetics, progression | Repeat-reward and repeated-score defects covered by tests |
| 11 | Friend challenges, sharing, full localization | Deterministic challenge and complete locale coverage |
| 12 | Four viewport classes, offline, performance, Android/iOS | Fresh full regression and synchronized native assets |
| 13 | `1.0.0-rc.1` public web release | Public URL, rollback artifact, user acceptance pass |
| 14 | RC fixes and `1.0.0` | Final public release from an accepted tagged commit |

App Store and Play Store publication additionally requires publisher-owned
developer accounts, signing identities, store listings, and product IDs.

