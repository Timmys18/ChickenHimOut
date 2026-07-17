# Production notes

## Locked product pillars

1. Campaign is the primary game and the primary menu surface.
2. The elastic red tie is the shared control language across missions.
3. Escalation creates score; timing the bailout creates mastery.
4. Chicken Golf is a small training and retention mode, never an alternative product identity.
5. No real names, parties, logos, official seals, direct slogans, war content or cruelty.

## Architecture

- `missions.ts` is the canonical data source for the 15 launch missions.
- Phaser scenes own presentation and physical simulation.
- Mission objects use Matter labels; `promise:*` labels feed the common scoring system.
- Progress is local-first and versioned under `chickenhimout-progress-v1`.
- Challenge links encode mission and score without exposing user data.
- Native delivery is handled by Capacitor; the same PWA remains playable in a mobile browser.

## Before public store submission

- replace current concept cutout with final rigged production character sprites or 3D renders;
- commission/clear final music and effects;
- complete legal review of parody, character likeness, title and red-cap trade dress in launch markets;
- connect privacy-safe analytics, crash reporting and remote configuration;
- provide App Store / Play signing credentials, privacy URLs, age rating and screenshots;
- conduct device testing across low-, mid- and high-tier Android plus current iPhone sizes.
