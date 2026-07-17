# Asset Manifest

This is the source of truth for art status. New image generation is frozen
until Stage 02 completes this inventory.

## Runtime assets currently in the game project

| Asset group | Runtime location | Current status |
| --- | --- | --- |
| Original approved hero cutout | `public/assets/hero-clean.png` | Preserved; still loaded as legacy fallback |
| Eight derived hero poses | `public/assets/production/hero/{idle,pull,airborne,impact,panic,sneak,run,victory}.png` | Integrated candidate; not yet user-approved as final production rig |
| Wall mission background | `public/assets/production/backgrounds/wall.webp` | Integrated candidate for Mission 1 |
| Tariff background | `public/assets/production/backgrounds/tariff.webp` | Preserved but not integrated |
| Icons and splash assets | `public/assets/` and native projects | Preserved; native copies require later resync |

## Source-art preservation

Generated images and uploaded references live outside the runtime project and
are preserved in the Stage 00 art-source recovery archive. This includes the
approved character iterations, screen concepts, mission renders, and two
interrupted/corrupt PNG outputs. Corrupt files are retained for provenance but
must never be used as runtime assets.

Large chroma sheets and full-resolution source backgrounds are deliberately
excluded from Git/runtime delivery after being preserved in the source-art
archive.

