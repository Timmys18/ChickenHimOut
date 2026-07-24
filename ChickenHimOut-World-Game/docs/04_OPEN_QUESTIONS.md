# Open Questions

**Purpose:** обязательный реестр серых зон. Вопросы не замалчиваются и не решаются случайно по умолчанию.

## Approved Product Decisions

### Q-001 — Первая целевая платформа

**Decision:** mobile-first — iOS и Android. PC/Web используются для разработки, review и демонстраций, но не диктуют управление или архитектуру.

### Q-002 — Ориентация экрана

**Decision:** landscape.

### Q-003 — Launch business model

**Decision:** free-to-play, косметические покупки и ограниченная rewarded advertising; без принудительной рекламы внутри первой сессии и без pay-to-win.

### Q-004 — Первая vertical slice миссия

**Decision:** The Wall.

### Q-005 — Launch scope planning baseline

**Decision:**

- 10 кампанийных миссий;
- гольф-клуб;
- тренировочный режим;
- отдельный golf/endless mode;
- базовая кастомизация;
- shareable mission result;
- analytics and live configuration foundation.

Количество миссий является planning baseline, а не финальным production commitment до проверки pipeline.

### Q-006 — Multiplayer at launch

**Decision:** real-time multiplayer не входит в обязательный launch scope. Асинхронные челленджи, shared replays и архитектурные точки расширения предусматриваются сразу.

### Q-007 — Тон и возрастной рейтинг

**Decision:** target rating 12+ / Teen; сатирический хаос без реалистичной крови, войны, пыток, сексуального контента и травли защищённых групп.

### Q-008 — Текст и речь

**Decision:** визуальное повествование с минимальным текстом; короткие международно понятные заголовки и UI; без длинных реплик героя. Voice-over не обязателен для vertical slice.

## Required CTO Decisions in Gate 01

Эти вопросы не перекладываются на Product Owner. Game Director обязан исследовать и принести решение:

- выбор движка;
- physics architecture и determinism strategy;
- camera architecture;
- character and tie simulation approach;
- Chaos Graph runtime and authoring model;
- mobile performance budget;
- save architecture;
- analytics stack;
- build, CI/CD and release pipeline;
- asset storage and Git LFS strategy;
- backup and disaster recovery;
- legal review workflow;
- accessibility baseline;
- supported device matrix;
- live configuration and content update strategy.

## Non-Blocking Later Questions

- точное имя вымышленной международной премии;
- название внутренней валюты;
- перечень launch skins;
- социальный профиль игрока;
- seasonal content model;
- cloud save and account model;
- creator/replay tools;
- language launch list;
- soundtrack commercial release.
