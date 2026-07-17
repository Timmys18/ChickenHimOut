# Stage 00 Recovery Baseline

## Pre-Git recovery archives

The following archives were created before Git initialization and before the
governance documents were added. Both passed full ZIP integrity tests.

| Archive | SHA-256 |
| --- | --- |
| `ChickenHimOut-pre-git-workspace-2026-07-16.zip` | `154b82e21b69431f880a1f7257e405ecaeebbaa31dbb5ba906f92b0a2fe47ca3` |
| `ChickenHimOut-art-sources-2026-07-16.zip` | `ed36ed284e9b4254623836c66435ef0eb64d0d623153d67c8f82a776e2030af3` |

The workspace archive excludes reproducible dependency/cache directories:
`node_modules`, `.npm`, `.tmp`, Gradle build cache, Android app build output,
and Xcode DerivedData. It retains source, runtime assets, QA evidence, prior
release archives, generated web output, and native project source.

The art-source archive independently retains all files from the recovered
`generated_images` and `upload` directories, including interrupted outputs for
provenance.

## Baseline validation

- TypeScript check: passed
- Vite production build: passed
- Dependency audit: 0 known vulnerabilities

## Git recovery point

- Recovered source baseline commit:
  `6e0efab6be7e96a5625623c40c8a917ed4d19dc7`
- Local checkpoint tag: `checkpoint-00-local`
- Branch: `main`

The tag points to the metadata commit immediately following the recovered
source baseline. No gameplay, mission, balance, or art changes were made
between these two commits.

## Independent recovery set

The recovery set is stored under
`/ChickenHimOut/Stage 00 - Recovery - 2026-07-16` and contains:

| File | SHA-256 |
| --- | --- |
| `ChickenHimOut-pre-git-workspace-2026-07-16.zip` | `154b82e21b69431f880a1f7257e405ecaeebbaa31dbb5ba906f92b0a2fe47ca3` |
| `ChickenHimOut-art-sources-2026-07-16.zip` | `ed36ed284e9b4254623836c66435ef0eb64d0d623153d67c8f82a776e2030af3` |
| `ChickenHimOut-source-checkpoint-00-local-2026-07-16.zip` | `7f6b9393b0a1c7efeaf6797828dfd47096cb9dfd0722199f4d248e9e46a12b8c` |
| `ChickenHimOut-web-build-0.9.0-rc.1-2026-07-16.zip` | `51112e23beded51ee5d4a03c8a02aa594eb428a5446f14462c8f213d00080e1f` |
| `ChickenHimOut-checkpoint-00-local.bundle` | `57e43edcf6f7f5a8728986f662ec042de11fe936923fd2a26ceb20dc0087ea70` |

All five hashes were checked after archive creation. The Git bundle was cloned
into a new empty directory; `npm ci`, `npm test`, and `npm run build` then
completed successfully from that restored copy.
