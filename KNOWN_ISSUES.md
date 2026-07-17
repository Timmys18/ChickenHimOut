# Known Issues

This list records factual gaps in the recovered `0.9.0-rc.1` workspace. It is
not a claim that fixes have already been implemented.

1. Daily rewards can currently be collected more than once per day.
2. Golf lacks an explicit one-shot sink guard and can potentially score the
   same hole repeatedly before the next hole is created.
3. Only tie cosmetics are implemented; the previously claimed second cosmetic
   category is absent.
4. Six locales cover core navigation only. Mission, result, Golf, and other
   strings remain partly hard-coded in English.
5. Existing full-mission QA evidence predates the latest code and art changes.
6. Automated viewport QA currently targets one primary `390×844` viewport,
   not four form-factor classes.
7. Android and iOS wrappers have not been resynchronized after the latest
   source and asset changes.
8. Production art is not complete across all 15 missions.
9. Runtime source previously contained unused large intermediate PNGs. They
   are preserved externally and excluded from Git, but the runtime package
   must be rechecked before release.
10. The repository version is `0.9.0-rc.1`; earlier chat claims about a
    completed `1.0.0-rc.1` are not supported by the files.

