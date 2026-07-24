# Gate 01 — Plan Before Build

**Status:** APPROVED / IN PROGRESS  
**Gate:** 01

## 1. Цель

Спроектировать ChickenHimOut как целостную игровую систему до начала production-кода и подготовить проверяемый план mechanical prototype.

## 2. Результат для игрока

Игрок получает понятный, однопальцевый, но глубокий физический игровой язык: он читает живую сцену, меняет связи галстуком, запускает цепную реакцию, повторно вмешивается, выполняет задачу и активно сбегает.

## 3. Артефакты

- Game Blueprint v1;
- touch input and camera specification;
- tie interaction specification;
- Chaos Graph runtime and authoring specification;
- living world specification;
- mission design framework;
- Wall vertical slice scenario v1;
- engine and technical architecture decision;
- mobile performance budget;
- visual and audio target briefs;
- risk register;
- Gate 02 mechanical prototype plan.

## 4. Не входит

- production art;
- final character model;
- complete Wall build;
- backend and store integrations;
- массовое производство миссий;
- live real-time multiplayer.

## 5. Ключевые решения

- Unity 6.3 LTS + URP как основной технический baseline;
- controlled 3D physics, а не полностью свободная симуляция;
- touch-first contextual input без постоянного joystick;
- hybrid tie simulation: authored interaction graph + физический rope representation;
- Chaos Graph как data-driven event/state system;
- The Wall как prototype and vertical slice reference mission.

## 6. Альтернативы

### Unreal Engine 5.8

Сильнее в high-end rendering, но тяжелее для компактной mobile-first команды, быстрее создаёт риск избыточного runtime/authoring overhead и дороже в итерациях физической casual-игры.

### Godot

Прозрачнее и дешевле по лицензированию, но слабее по зрелости production mobile tooling, asset ecosystem и готовым сервисам для целевого уровня визуала и коммерческого mobile pipeline.

### Recommendation

Unity 6.3 LTS с URP: лучший баланс mobile iteration speed, C# tooling, PhysX, platform services, Addressables, editor extensibility и доступности специалистов.

## 7. Главные риски

- галстук может ощущаться непредсказуемым;
- физика может быть красивой, но нечитаемой;
- живой мир может превысить CPU/GPU budget;
- Chaos Graph может стать сложнее самих миссий;
- визуальная премиальность может вступить в конфликт с устройствами среднего класса;
- чрезмерное количество контекстных действий может снизить понятность управления.

## 8. Критерии приёмки Gate 01

- полный игровой цикл описан без серых зон;
- каждое действие галстука имеет точное touch mapping;
- camera rules не требуют ручного управления камерой;
- Chaos Graph отделяет authored logic от raw physics;
- Wall mission имеет минимум два пути успеха, system response и active escape;
- определён performance budget и device tiers;
- определён технический стек и pipeline;
- подготовлен Gate 02 plan с измеримыми тестами.
