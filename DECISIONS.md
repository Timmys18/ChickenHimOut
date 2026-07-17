# Decision Log

## D-001 — Durable source of truth

**Status:** approved, 2026-07-16

Use a private GitHub repository as the primary source history and independent
persistent archives as a second recovery layer.

## D-002 — Sequential stage gates

**Status:** approved, 2026-07-16

Only one relatively small stage is active at a time. A later stage cannot
start until the current stage is committed, tagged, tested, archived, and
reported.

## D-003 — Preserve before improving

**Status:** approved, 2026-07-16

Stage 00 makes no gameplay or visual improvements. The recovered workspace is
preserved first, including incomplete work and known defects.

## D-004 — Art generation freeze

**Status:** active until Stage 02 is accepted

Do not generate new scenes or character variants until all existing generated
and uploaded art has been inventoried and classified.

