# Roadmap and Gates

**Status:** REVIEW

## Gate 00 — Project Constitution & Operating System

### Goal

Создать устойчивую систему управления, единый источник правды и непереговорные требования.

### Deliverables

- Project Constitution;
- Master Design Plan v0.1;
- Decision Log;
- Roadmap;
- Open Questions;
- Sprint 00 report;
- GitHub tracker.

### Exit Criteria

- Product Owner подтверждает самостоятельность проекта;
- утверждает правила управления;
- утверждает или корректирует непереговорные требования;
- выбирает первую vertical slice миссию;
- отвечает на блокирующие вопросы Gate 01.

---

## Gate 01 — Game Blueprint

### Goal

Полностью спроектировать игру как систему до начала production-кода.

### Planned Deliverables

- Game Design Document v1;
- Player Journey;
- Input and Camera Specification;
- Tie Interaction Specification;
- Mission Design Framework;
- Chaos Graph Specification;
- Living World Specification;
- Hub and Meta Specification;
- Scoring and Prize Probability model;
- progression and economy outline;
- visual direction brief;
- audio direction brief;
- technical feasibility matrix;
- production scope and risk register.

### Exit Criteria

- core loop понятен без устного объяснения;
- нет нерешённых блокирующих серых зон;
- определены платформы, ориентация, monetization direction и launch scope;
- утверждена первая prototype mission;
- утверждён prototype plan.

---

## Gate 02 — Mechanical Prototype

### Goal

Доказать, что механика интересна без дорогой графики.

### Planned Deliverables

- greybox сцена;
- playable tie prototype;
- минимум три типа физических связей;
- контекстные позиции;
- system response;
- повторное вмешательство;
- active escape;
- запись сессий и playtest report.

### Exit Criteria

- игрок понимает базовый жест;
- первый запуск не завершает миссию;
- есть минимум два осмысленных способа прохождения;
- управление ощущается точным, а не случайным;
- хаос читается, а не превращается в физический шум;
- повторное прохождение вызывает желание изменить стратегию.

---

## Gate 03 — Visual Target

### Goal

Доказать достижимость premium визуала на целевом устройстве.

### Planned Deliverables

- финальный character target;
- небольшая production-quality сцена;
- lighting target;
- materials target;
- animation target;
- destruction target;
- VFX target;
- sound target;
- mobile performance capture.

### Exit Criteria

- пройден Wallpaper Test;
- герой встроен в мир;
- отсутствует эффект фотобоев и наклеек;
- сцена держит performance budget;
- визуальный язык масштабируем на другие миссии.

---

## Gate 04 — Vertical Slice

### Goal

Создать одну полноценную миссию, представляющую целевой продукт.

### Planned Deliverables

- вход через гольф-клуб;
- briefing;
- живая сцена;
- complete mission loop;
- несколько решений;
- Chaos Graph;
- побег;
- scoring;
- Prize Probability;
- возврат в хаб;
- финальный звук, камера и VFX;
- аналитика;
- playable build.

### Exit Criteria

- миссия ощущается как настоящая игра, а не прототип;
- механика, визуал и юмор работают вместе;
- есть replay value;
- сцена демонстрирует production standard;
- нет критических архитектурных тупиков.

---

## Gate 05 — Production Pipeline

### Goal

Доказать, что новые миссии можно производить системно.

### Planned Deliverables

- reusable entity library;
- Chaos Graph authoring tools;
- reaction system;
- NPC state framework;
- destruction presets;
- mission template;
- content validation;
- performance tooling;
- automated build and backup process;
- second mission production test.

### Exit Criteria

- вторая миссия создаётся без переписывания ядра;
- runtime и authoring tools стабильны;
- стоимость одной миссии прогнозируема;
- документация позволяет подключить нового исполнителя.

---

## Gate 06 — Content Production

### Goal

Произвести утверждённый launch scope.

### Restrictions

Gate не открывается до принятия vertical slice и production pipeline.

### Planned Streams

- campaign missions;
- golf hub;
- training and golf mode;
- customization;
- UI/UX;
- audio;
- localization;
- analytics;
- QA;
- compliance and legal review;
- store and marketing assets.

---

## Gate 07 — Release Candidate

### Goal

Получить production-ready сборку без логики «потом доделаем после MVP».

### Exit Criteria

- все launch systems завершены;
- performance соответствует бюджету;
- crash-free and save integrity targets достигнуты;
- юридический review закрыт;
- onboarding и первые сессии протестированы;
- store assets готовы;
- rollback и incident plan готовы.

## Current Position

`Gate 00 — REVIEW`

Следующий предлагаемый переход: `Gate 01 — Game Blueprint`, только после утверждения Package 00 и ответов на блокирующие вопросы.
