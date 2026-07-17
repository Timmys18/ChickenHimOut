# ChickenHimOut

Mobile-first satirical physics game. Pull the oversized tie, launch the promise, create maximum chaos, and chicken out before accountability arrives.

## Release candidate

This repository contains the `0.9.0-rc.1` candidate for web/PWA, Android, and iOS.

- 15 campaign missions with distinct layouts and reactions
- first-run playable tutorial in under 20 seconds
- daily challenge and streak rewards
- endless tie-powered golf training mode with an optional “assistant”
- six UI languages: English, Russian, Spanish, Portuguese, French, and German
- local progression, records, cosmetics, haptics, sound, challenge links, and offline PWA support
- no account, backend, tracking SDK, political names, party marks, or war content

## Run locally

```bash
npm install
npm run dev
```

Production and native synchronization:

```bash
npm run build
npm run native:sync
```

The web build is written to `dist/`. Native wrappers live in `android/` and `ios/`.

## Controls

Campaign: drag the character toward promise seals, release the tie, then tap **CHICKEN OUT!** during the best exit window.

Golf: drag from the ball, release, and use **CALL AN ASSISTANT** after two missed strokes if desired.

