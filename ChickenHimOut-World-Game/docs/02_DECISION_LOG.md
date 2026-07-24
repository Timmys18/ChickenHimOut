# Decision Log

## Формат

Каждое решение имеет ID, статус, владельца, утверждение, дату фиксации, обоснование и влияние. Исторические решения не удаляются.

---

## DEC-001 — Проект является самостоятельной игрой

- **Status:** APPROVED
- **Owner:** Game Director / CTO
- **Approved by:** Product Owner / Creative Director
- **Decision:** ChickenHimOut — World Game не является редизайном, второй версией или продолжением первой итерации.
- **Impact:** автоматическое наследование старого кода, арта, архитектуры и механики запрещено.

## DEC-002 — Отдельная постоянная директория

- **Status:** APPROVED
- **Decision:** единый источник правды размещается в `ChickenHimOut-World-Game/` в приватном GitHub-репозитории.
- **Impact:** все новые документы, код и артефакты должны создаваться внутри этой директории.

## DEC-003 — Полная ответственность Game Director

- **Status:** APPROVED
- **Decision:** Game Director / CTO отвечает за все продуктовые, технические, визуальные, производственные, QA и релизные части проекта.
- **Impact:** неозвученные области нельзя молча считать решёнными по умолчанию; серые зоны обязаны выявляться и обсуждаться.

## DEC-004 — Plan Before Build и Gate Control

- **Status:** APPROVED
- **Decision:** крупный этап не начинается без предварительного плана и утверждения Product Owner.
- **Impact:** массовое производство контента до принятия vertical slice и pipeline запрещено.

## DEC-005 — Функциональный 3D/2.5D-мир

- **Status:** APPROVED / FROZEN
- **Decision:** уровни строятся как единый функциональный стилизованный мир, а не как AI-фон с плоскими спрайтами.
- **Impact:** важные объекты, персонаж, свет, физика, реакции и разрушения существуют в общей сцене.

## DEC-006 — Галстук как универсальный системный инструмент

- **Status:** APPROVED DIRECTION
- **Decision:** игрок изменяет физические и логические связи внутри сцены; галстук не ограничивается функцией рогатки.
- **Impact:** prototype должен проверить hook, pull, link, wrap, swing, hold, release и escape.

## DEC-007 — Chaos Graph

- **Status:** APPROVED DIRECTION
- **Decision:** миссии проектируются как сети причин и последствий с повторным вмешательством игрока.
- **Impact:** одношаговые миссии и заранее записанные разрушения не принимаются.

## DEC-008 — Контекстное перемещение

- **Status:** APPROVED DIRECTION
- **Decision:** базовое управление не использует постоянный виртуальный джойстик; герой перемещается между тактическими позициями.
- **Impact:** перемещение должно менять доступные связи, угол, риск и путь побега.

## DEC-009 — Гольф-клуб как главный хаб

- **Status:** APPROVED
- **Decision:** гольф-клуб является личным кабинетом и центром игры.
- **Impact:** миссии, прогресс, кастомизация, тренировка и гольф-режим доступны через хаб.

## DEC-010 — Prize Probability

- **Status:** APPROVED DIRECTION
- **Decision:** результат миссий изменяет вероятность получения вымышленной международной премии мира.
- **Impact:** система должна быть сатиричной, простой и не требовать отдельного международного комитета.

## DEC-011 — Первая подтверждённая шестёрка миссий

- **Status:** APPROVED DIRECTION
- **Decision:** Wall, Greenland, Tariffs, Count Again, TikTok, The Prize.
- **Impact:** остальные темы проходят отдельный фильтр глобальной узнаваемости.

## DEC-012 — Первая vertical slice миссия

- **Status:** APPROVED
- **Decision:** The Wall используется как первая полноценная демонстрационная миссия.
- **Reason:** сильнейшая узнаваемость и лучший охват физических, визуальных и системных требований.

## DEC-013 — Целевые платформы и формат

- **Status:** APPROVED
- **Decision:** mobile-first iOS/Android, landscape. PC/Web используются для development/review builds.
- **Impact:** input, camera, UI и performance проектируются под мобильный landscape.

## DEC-014 — Business model

- **Status:** APPROVED
- **Decision:** free-to-play, cosmetic IAP и limited rewarded advertising; без pay-to-win и без обязательной рекламы в первой сессии.

## DEC-015 — Launch scope planning baseline

- **Status:** APPROVED DIRECTION
- **Decision:** 10 миссий, гольф-клуб, тренировка, отдельный гольф-режим, кастомизация, shareable results, analytics/live-config foundation.
- **Note:** число миссий остаётся planning baseline до проверки production pipeline.

## DEC-016 — Multiplayer scope

- **Status:** APPROVED
- **Decision:** real-time multiplayer не является обязательным launch feature. Асинхронные челленджи и replay sharing закладываются архитектурно.

## DEC-017 — Rating and narrative language

- **Status:** APPROVED
- **Decision:** target 12+/Teen, минимум текста, визуальный юмор, без длинных реплик и реалистичной жестокости.

## DEC-018 — Старый technical baseline отменён

- **Status:** SUPERSEDED
- **Date:** 2026-07-24
- **Decision:** `docs/11_TECHNICAL_ARCHITECTURE_DECISION.md` больше не является рабочей архитектурой.
- **Reason:** содержал несколько чрезмерно стандартных и консервативных решений, не соответствующих требованию current top-tier.

## DEC-019 — Current-production technology rule

- **Status:** APPROVED PROCESS RULE
- **Date:** 2026-07-24
- **Decision:** используется наиболее современное production-ready решение с доказуемым преимуществом для продукта или производства. Experimental допускается только как изолированный spike с rollback.
- **Impact:** "стабильно", "обычно" и "проще" не являются достаточным обоснованием.

## DEC-020 — Unity 6.5 baseline

- **Status:** PROPOSED IN GATE 01 REWORK
- **Decision:** initial editor baseline — Unity `6000.5.4f1` + URP, Render Graph enabled, compatibility mode prohibited.
- **Note:** final approval follows revised Gate 01 review.

## DEC-021 — Modern hybrid runtime

- **Status:** PROPOSED IN GATE 01 REWORK
- **Decision:** authoritative GameObject/PhysX gameplay combined with Burst/Jobs and optional benchmark-driven ECS for scalable ambient systems.

## DEC-022 — Modern experience stack

- **Status:** PROPOSED IN GATE 01 REWORK
- **Decision:** Input System + EnhancedTouch, Cinemachine 3.1.x, UI Toolkit/UI Builder, native iOS/Android haptics, Playables/Animation Rigging and FMOD evaluation.

## DEC-023 — 60 FPS / 60 Hz main baseline

- **Status:** PROPOSED IN GATE 01 REWORK
- **Decision:** Main tier targets stable 60 FPS and 60 Hz physics; optional 120 FPS on High; 30 FPS only supported floor or emergency thermal state.
