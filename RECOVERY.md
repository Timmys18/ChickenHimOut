# Recovery

## Durable checkpoint

The Stage 00 recovery set is stored under:

`/ChickenHimOut/Stage 00 - Recovery - 2026-07-16`

Use `ChickenHimOut-checkpoint-00-durable.bundle` as the primary offline
recovery source. `ChickenHimOut-checkpoint-00-local.bundle` preserves the
earlier source baseline independently.

The private online source is:

`https://github.com/Timmys18/ChickenHimOut`

Its default branch is `main`. Stage 00 import commit
`4a3f1dee6c7f028404d2fb90d1f231adce6274a7` was verified against the durable
local checkpoint before Stage 00 was closed.

## Restore from the Git bundle

1. Download the bundle and `SHA256SUMS.txt` into one directory.
2. Verify the file:

   `sha256sum -c SHA256SUMS.txt`

3. Clone it:

   `git clone ChickenHimOut-checkpoint-00-durable.bundle ChickenHimOut`

4. Validate the restored repository:

   `cd ChickenHimOut`

   `git show checkpoint-00-durable --no-patch`

   `npm ci`

   `npm test`

   `npm run build`

## Fallbacks

- The source ZIP restores tracked project files without Git history.
- The pre-Git workspace ZIP also preserves earlier QA output, release
  packages, and generated web files.
- The art-source ZIP independently preserves generated and uploaded art
  material, including interrupted files kept only for provenance.
