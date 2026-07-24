# Sprint 00 — Project Foundation

**Status:** ACCEPTED  
**Gate:** 00  
**Accepted by Product Owner:** 2026-07-24

## Objective

Создать отдельную, устойчивую и управляемую основу нового проекта ChickenHimOut — World Game до начала игрового производства.

## Completed

- создана самостоятельная директория `ChickenHimOut-World-Game/`;
- зафиксировано отсутствие наследования первой итерации;
- создан Project Constitution;
- создан Master Design Plan v0.1;
- создан Decision Log;
- создан Roadmap and Gates;
- создан Open Questions register;
- утверждена first vertical slice — The Wall;
- зафиксированы обязательные визуальные, механические и управленческие требования.

## Approved Product Decisions

- mobile-first: iOS и Android;
- PC/Web — development and review builds, не продуктовый ориентир;
- landscape orientation;
- free-to-play: cosmetic IAP + limited rewarded advertising;
- planning baseline: 10 кампанийных миссий, хаб, тренировка, отдельный гольф-режим, кастомизация и sharing;
- real-time multiplayer не входит в обязательный launch scope;
- асинхронные челленджи и replay sharing предусматриваются архитектурно;
- target rating: 12+ / Teen;
- визуальное повествование и минимальный текст;
- The Wall утверждена как first vertical slice.

## Not Included

- production code;
- greybox prototype;
- новые визуальные ассеты;
- backend;
- массовая детализация миссий.

Отсутствие этих результатов является намеренным: они относятся к последующим Gate.

## Acceptance Result

Все критерии Gate 00 выполнены. Разрешён переход к Gate 01 — Game Blueprint.

## Next Sprint

**Sprint 01 — Game Blueprint and Technical Decision Frame**

Planned outputs:

- complete core loop specification;
- input and camera specification;
- tie interaction model;
- Chaos Graph specification;
- mission design template;
- living-world model;
- Wall vertical slice scenario v1;
- engine and architecture decision;
- visual target brief;
- mobile performance budget;
- updated risks and decisions.

## Deviations

- Ранее была ошибочно создана ветка `redesign/v2`. Она не используется новой игрой и не является рабочей веткой проекта.
- Новый проект ведётся исключительно внутри `ChickenHimOut-World-Game/`.
