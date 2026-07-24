# Risk Register

**Status:** ACTIVE — Gate 01

## Scale

- Probability: Low / Medium / High
- Impact: Low / Medium / High / Critical
- Owner: accountable project role

## R-001 — Tie feels random

- **Probability:** High
- **Impact:** Critical
- **Owner:** Game Director / Gameplay Engineering
- **Risk:** одинаковый жест produces different outcomes; player feels physics lottery.
- **Mitigation:** hybrid logical/physical tie, clamped force model, anchor magnetism, repeatability tests, limited proxy points.
- **Gate:** must be reduced before Gate 02 acceptance.

## R-002 — Mechanic remains one-note

- **Probability:** Medium
- **Impact:** Critical
- **Owner:** Game Design
- **Risk:** every mission becomes pull-release-collapse despite new art.
- **Mitigation:** mechanical thesis, diversity matrix, post-Commit decisions, Reskin Test, adjacent-mission comparison.
- **Gate:** mission rejected before greybox if thesis is weak.

## R-003 — Physics chaos becomes unreadable

- **Probability:** High
- **Impact:** High
- **Owner:** Game Director / Technical Design
- **Mitigation:** Chaos Graph phase control, Director priorities, debris caps, state-based destruction, clear objective silhouette.

## R-004 — Living world exceeds CPU budget

- **Probability:** High
- **Impact:** High
- **Owner:** CTO
- **Mitigation:** significance tiers, event-driven NPCs, capped awake rigidbodies, device profiling from Gate 02, automatic warnings.

## R-005 — Premium visual target fails on mid-tier mobile

- **Probability:** Medium
- **Impact:** Critical
- **Owner:** Art Director / CTO
- **Mitigation:** URP, baked/mixed lighting, controlled shader set, quality tiers, device-first Visual Target, no desktop-only approval.

## R-006 — Character looks like direct real-person copy

- **Probability:** Medium
- **Impact:** High
- **Owner:** Creative Director / Legal
- **Mitigation:** independent stylized proportions, no exact portrait, no real name, legal review of character and marketing.

## R-007 — Satirical premise is not globally readable

- **Probability:** Medium
- **Impact:** High
- **Owner:** Game Director / Product Owner
- **Mitigation:** 3-second premise test across countries, globally known motifs, minimal dependence on US legal detail.

## R-008 — Chaos Graph becomes an overengineered tool

- **Probability:** Medium
- **Impact:** High
- **Owner:** CTO / Tools Engineering
- **Mitigation:** prototype with 12–20 nodes, add node families only from real mission needs, measure authoring time, avoid generic visual-scripting platform.

## R-009 — Main repository polluted by drafts

- **Probability:** Medium
- **Impact:** Medium
- **Owner:** CTO
- **Risk:** accepted and unaccepted states become unclear.
- **Mitigation:** every document carries status; after Gate 01 use gate/feature branches and PRs; tag accepted Gates; maintain Decision Log.
- **Current note:** Gate 01 documents were committed directly for immediate crash recovery. They remain explicitly DRAFT.

## R-010 — Large binary assets make Git unusable

- **Probability:** Medium
- **Impact:** High
- **Owner:** Technical Art / DevOps
- **Mitigation:** Git LFS, asset size checks, separate source/runtime exports, no caches, periodic repository health report.

## R-011 — iOS pipeline blocked by lack of macOS signing environment

- **Probability:** Medium
- **Impact:** High
- **Owner:** DevOps
- **Mitigation:** identify macOS runner before Gate 03, early unsigned build validation, certificates/provisioning checklist, no postponement until release.

## R-012 — Ads damage premium perception

- **Probability:** Medium
- **Impact:** High
- **Owner:** Product / Monetization
- **Mitigation:** no mandatory ads in first session, rewarded ads only in context, frequency caps, cosmetics primary, no ad after every fail.

## R-013 — F2P economy dictates mission frustration

- **Probability:** Low/Medium
- **Impact:** Critical
- **Owner:** Product Owner / Game Director
- **Mitigation:** no pay-to-win, no energy gate in core campaign baseline, difficulty balanced for fun rather than monetization, economy reviewed separately.

## R-014 — Async replay diverges across devices

- **Probability:** High
- **Impact:** Medium
- **Owner:** Social/Gameplay Engineering
- **Mitigation:** record graph transitions and correction keyframes; do not assume bit-identical PhysX; score validation based on event log.

## R-015 — Camera hides critical interactions

- **Probability:** Medium
- **Impact:** High
- **Owner:** Camera Design
- **Mitigation:** authored rails, safe zones, Director priorities, no rapid movement during release windows, automated visibility checks.

## R-016 — Anchor ambiguity frustrates touch input

- **Probability:** High
- **Impact:** High
- **Owner:** UX / Gameplay
- **Mitigation:** acquisition zones, magnetism, contextual priority, radial choice only when necessary, touch heatmaps.

## R-017 — Mission cost becomes unsustainable

- **Probability:** High
- **Impact:** Critical
- **Owner:** Executive Producer / CTO
- **Mitigation:** production pipeline Gate, second-mission test, reusable entity library, authoring metrics, no content scale-up before cost predictability.

## R-018 — AI-generated art creates inconsistency or rights risk

- **Probability:** Medium
- **Impact:** High
- **Owner:** Art Director / Legal
- **Mitigation:** AI output may be reference/concept only unless provenance and production suitability are verified; final world assets follow controlled art pipeline; no AI background substitute.

## R-019 — Scope expands through attractive side systems

- **Probability:** High
- **Impact:** High
- **Owner:** Game Director
- **Mitigation:** Gate scope, Impact Notes, non-goals, real-time multiplayer excluded at launch, committee storyline excluded, golf does not invade every mission.

## R-020 — Project knowledge lost despite repository

- **Probability:** Low/Medium
- **Impact:** Critical
- **Owner:** CTO
- **Mitigation:** commit after every accepted sprint and important draft package, Decision Log, issue tracker, tags, external mirror, CI artifacts, recovery drill.

## Review Cadence

- update at every Gate review;
- update when a prototype test fails;
- any Critical risk without active mitigation blocks Gate acceptance;
- closed risks remain in history with evidence.
