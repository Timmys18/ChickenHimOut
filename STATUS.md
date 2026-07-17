# Project Status

## Active stage

`00 — Recovery and baseline (completed)`

No gameplay, balance, mission, or visual redesign work is authorized during
this stage.

## Current factual version

- Package version: `0.9.0-rc.1`
- Working product: Phaser/Vite mobile-first game
- Campaign definitions: 15
- Git history at recovery start: none; recovered baseline now committed
- Public `1.0.0-rc.1`: does not exist

## Stage 00 checklist

- [x] Freeze feature work.
- [x] Create a pre-Git workspace recovery archive.
- [x] Create a separate generated/uploaded art-source archive.
- [x] Test both archives and calculate SHA-256 checksums.
- [x] Initialize local Git on branch `main`.
- [x] Run TypeScript, production build, and dependency audit checks.
- [x] Record and tag the recovered baseline commit.
- [x] Create and push to a private remote repository.
- [x] Save independent persistent recovery copies.
- [x] Verify commit, tag, archive hashes, and restoration instructions.

## Latest checks

- `npm test`: passed, 2026-07-16
- `npm run build`: passed, 2026-07-16
- `npm audit --audit-level=high`: 0 vulnerabilities, 2026-07-16
- Isolated Git-bundle restore: clone, `npm ci`, `npm test`, and
  `npm run build` passed, 2026-07-16

## Remote verification

- Repository: `Timmys18/ChickenHimOut`
- Visibility: private
- Default branch: `main`
- Verified import commit:
  `4a3f1dee6c7f028404d2fb90d1f231adce6274a7`
- Imported files: 115
- Imported unique Git blobs: 111
- Control comparison: seven representative source, art, Android, iOS, and
  recovery files matched the local checkpoint by Git SHA.

Stage 00 has no remaining blocker.

## Next stage

Stage 01 may start only after the user receives and accepts the completed Stage
00 report.
