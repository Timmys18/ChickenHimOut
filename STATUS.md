# Project Status

## Active stage

`00 — Recovery and baseline`

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
- [ ] Create and push to a private remote repository.
- [x] Save independent persistent recovery copies.
- [x] Verify commit, tag, archive hashes, and restoration instructions.

## Latest checks

- `npm test`: passed, 2026-07-16
- `npm run build`: passed, 2026-07-16
- `npm audit --audit-level=high`: 0 vulnerabilities, 2026-07-16
- Isolated Git-bundle restore: clone, `npm ci`, `npm test`, and
  `npm run build` passed, 2026-07-16

## Current blocker

The private GitHub repository has not yet been created. This environment has
Git access but no authenticated repository-creation capability. The complete
project is nevertheless recoverable from the independent Stage 00 set.

## Next stage

Stage 01 may start only after the user receives and accepts the completed Stage
00 report.
