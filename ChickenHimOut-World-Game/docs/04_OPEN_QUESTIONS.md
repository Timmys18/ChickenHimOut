# Open Questions

**Purpose:** обязательный реестр серых зон. Вопросы не замалчиваются и не решаются случайно по умолчанию.

## Blocking for Gate 01

### Q-001 — Первая целевая платформа

**Question:** какой порядок релиза фиксируем как основной?

**Recommendation:** mobile-first — iOS и Android как продуктовая цель; PC/Web build используется для разработки, review и демонстраций, но не диктует управление или архитектуру.

**Why blocking:** определяет input, orientation, performance budget, UI density, build pipeline и analytics.

### Q-002 — Ориентация экрана

**Options:** portrait / landscape.

**Recommendation:** landscape. Причина — физические цепи, тактические позиции, глубина 2.5D и живые системы требуют ширины кадра. Portrait допустим только после отдельного prototype comparison.

**Why blocking:** определяет camera composition, управление, layout хаба и production форматы.

### Q-003 — Launch business model

**Options:** premium purchase / free-to-play with cosmetic IAP / free-to-play with ads and IAP.

**Recommendation:** free-to-play, косметические покупки и ограниченная rewarded advertising; без принудительной рекламы внутри первой сессии и без pay-to-win.

**Why blocking:** влияет на progression, session structure, economy, hub и backend.

### Q-004 — Первая vertical slice миссия

**Recommendation:** The Wall.

**Alternative:** Tariffs, если приоритетом станет доказательство системной глубины вместо максимально читаемого маркетингового кадра.

**Why blocking:** определяет prototype mechanics, asset family и visual target.

### Q-005 — Launch scope

**Question:** что считать полноценным первым релизом?

**Recommendation for planning baseline:**

- 10 кампанийных миссий;
- гольф-клуб;
- тренировочный режим;
- отдельный golf/endless mode;
- базовая кастомизация;
- shareable mission result;
- analytics and live configuration foundation.

Количество не фиксируется как обещание до оценки pipeline после vertical slice.

### Q-006 — Multiplayer at launch

**Recommendation:** не включать real-time multiplayer в обязательный launch scope. Сразу предусмотреть архитектурные точки расширения и запустить asynchronous challenges / shared replays как более дешёвую вирусную механику.

**Why blocking:** real-time multiplayer существенно меняет physics determinism, backend, QA и сроки.

### Q-007 — Тон и возрастной рейтинг

**Recommendation:** целевой рейтинг 12+ / Teen; сатирический хаос без реалистичной крови, войны, пыток, сексуального контента и травли защищённых групп.

**Why blocking:** влияет на анимации, миссии, маркетинг, store compliance и рекламную монетизацию.

### Q-008 — Текст и речь

**Recommendation:** визуальное повествование с минимальным текстом; короткие международно понятные заголовки и UI; герой не произносит длинных реплик. Voice-over не является обязательным для vertical slice.

**Why blocking:** влияет на localization cost, timing, sound design и юридическую дистанцию.

## Required CTO Research in Gate 01

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
