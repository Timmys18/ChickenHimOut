# Historical QA Report

> This report predates the latest recovered code and production-art changes.
> It is retained as historical evidence only and must not be used to declare
> the current workspace release-ready. Stage 12 will replace it with a report
> tied to an exact Git commit.

Candidate: `0.9.0-rc.1`

Automated checks cover:

- TypeScript compilation and Vite production build
- first-run splash → tutorial → chaos → bailout → result flow
- launch and interaction smoke test for all 15 mission configurations
- Golf, Wardrobe, and Settings scene launch
- browser console and uncaught page errors
- Android/iOS web asset synchronization
- dependency vulnerability audit

Visual review targets a 390×844 mobile viewport. Generated screenshots are retained in `qa/` for regression comparison.

Platform signing and App Store/Play Store submission are publisher-side release operations and are not represented as completed QA.
