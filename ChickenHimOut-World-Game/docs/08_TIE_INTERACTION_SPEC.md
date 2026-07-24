# Tie Interaction Specification

**Status:** DRAFT — Gate 01

## 1. Design Role

Красный галстук — главный узнаваемый инструмент ChickenHimOut. Он одновременно является:

- физическим интерфейсом;
- источником комедии;
- частью силуэта героя;
- языком головоломок;
- инструментом побега;
- носителем кастомизации.

Галстук не должен ощущаться как курсор, лазерная линия или обычная верёвка. Он должен быть выразительным, слегка преувеличенным и управляемым.

## 2. Hybrid Simulation Principle

Полная rope simulation из большого количества свободных rigidbody-сегментов не используется как основа. Она слишком нестабильна, дорогая и плохо предсказуема для точного mobile gameplay.

Используется hybrid model:

1. **Logical Tie** — endpoints, routing anchors, допустимая длина, tension, тип связи и gameplay state.
2. **Force Model** — ограниченные и предсказуемые силы, применяемые к связанным объектам.
3. **Physical Proxies** — малое количество physics points для контактов и крупных изгибов.
4. **Visual Spline** — плавная форма, вторичная анимация, squash/stretch и collision approximation.
5. **Authored Beats** — контролируемые анимационные акценты для Attach, Snap, Wrap и Escape.

Игрок получает ощущение живой верёвки, но game logic не зависит от хаотичного поведения десятков joints.

## 3. Core Functions

### Hook

Прикрепить конец к одному anchor.

Uses:

- подтянуть объект;
- удержать объект;
- раскачать груз;
- закрепить героя;
- создать escape line.

### Pull

Создать направленную тягу между героем/позицией и объектом.

Control variables:

- direction;
- normalized tension 0–1;
- hold time;
- release timing.

### Link

Связать два внешних объекта между собой. После Link герой может отпустить active control, а связь продолжает существовать.

Uses:

- грузовик ↔ ворота;
- противовес ↔ кран;
- кабель ↔ механизм;
- движущийся объект ↔ опора.

### Wrap

Провести галстук через routing anchor и изменить направление силы.

Routing anchor не является свободным узлом. Он заранее помечен и имеет понятную геометрию: блок, труба, стойка, край платформы.

### Swing / Launch

Использовать натяжение и массу объекта для маятника или запуска. Траектория preview показывается не точной линией, а короткой областью вероятного движения.

### Hold / Redirect

Временно удерживать нестабильный объект и менять его направление. Это создаёт active control после начала хаоса.

### Release / Cut Loose

Разорвать текущую связь в выбранный момент. Некоторые связи разрушаются автоматически при превышении tension threshold.

### Escape

Герой использует галстук как grappling line, swing line, tow line или emergency tether. Escape имеет отдельные tuning rules и более сильный aim assist.

## 4. Anchor Types

### Static Anchor

Неподвижная конструкция: балка, крюк, столб, ферма.

### Dynamic Anchor

Подвижный rigidbody: контейнер, панель, тележка, груз.

### Mechanism Anchor

Передаёт действие системе: рычаг, клапан, крановая лебёдка, переключатель.

### Routing Anchor

Изменяет направление галстука без самостоятельной цели.

### Hero Position Anchor

Тактическая точка, определяющая опору и доступный диапазон тяги.

### Escape Anchor

Специально валидированная точка для безопасного, но зрелищного побега.

### Forbidden / Decorative Anchor

Не интерактивен. Не должен выглядеть как полноценный mission anchor.

## 5. Tie State Machine

`Holstered → Acquire → Preview → Attached → Tensioned → Committed → Dynamic → Reattach / Release → Recover`

Special branches:

- `Overload → Warning → Snap`;
- `Escape Attach → Swing/Tow → Landing`;
- `Link Complete → Autonomous Connection`.

## 6. Tension Model

Tension — gameplay variable, а не только результат PhysX.

Inputs:

- distance from rest length;
- player drag;
- connected object mass class;
- mechanism resistance;
- current state modifier;
- authored safety clamp.

Outputs:

- force applied to bodies;
- visual stretch;
- haptics;
- sound pitch;
- warning VFX;
- Chaos Graph signal;
- snap probability or deterministic threshold.

Tension is clamped per interaction. Тяжёлый объект не должен случайно улетать из-за единичного physics spike.

## 7. Mass Classes

Для читаемого управления объекты получают gameplay mass class поверх реальной Rigidbody mass:

- Light;
- Medium;
- Heavy;
- Massive;
- Fixed/System.

Mass class определяет допустимые действия, preview, анимацию героя и ограничения силы. Реальная масса используется для локальной физики, но не является единственным источником баланса.

## 8. Attach Rules

Attach считается успешным, когда:

- touch входит в acquisition zone;
- anchor разрешён текущей фазой;
- длина галстука достаточна или допускается stretch;
- линия не пересекает blocker, который запрещает связь;
- текущая позиция героя поддерживает угол.

Некоторые apparent blockers допускают Wrap suggestion вместо отказа.

## 9. Readability and Feedback

### Visual

- галстук слегка поднимается и ориентируется к ближайшему anchor;
- при preview меняется ширина и кривизна;
- напряжение читается через straightening, micro-vibration и изменение материала;
- слабое крепление показывает deformation до разрушения;
- snap point виден заранее.

### Audio

- тканевый whip;
- натяжение волокон;
- creak подключённого объекта;
- distinct attach click;
- overload warning;
- комедийный release accent.

### Character

Герой упирается, скользит, теряет равновесие, самодовольно поправляет пиджак или преждевременно празднует. Реакция тела обязана соответствовать направлению силы.

## 10. Assistance System

Assistance не решает головоломку, а компенсирует touch uncertainty:

- anchor magnetism;
- tension smoothing;
- release buffer 80–150 ms для authored timing windows;
- trajectory cone;
- automatic routing suggestion;
- escape auto-correction;
- optional stronger assist mode.

## 11. Failure Modes to Prevent

- rope noodle: галстук бесконтрольно болтается и не передаёт намерение;
- laser pointer: галстук выглядит идеально прямой UI-линией;
- physics lottery: одинаковый жест даёт радикально разные результаты;
- anchor hunt: игрок ищет невидимую активную точку;
- instant solution: первый attach завершает миссию;
- decorative tie: после запуска галстук больше не участвует в игре;
- clipping comedy by accident: галстук постоянно проходит сквозь важные объекты.

## 12. Prototype Scope

Первый mechanical prototype обязан реализовать только:

- Hook;
- Pull;
- Link;
- Release;
- one Routing Anchor;
- one Escape interaction;
- Light/Heavy/Massive classes;
- visual spline and tension feedback.

Swing, complex Wrap, multiple simultaneous links и customization добавляются после доказательства базового feel.

## 13. Acceptance Metrics

- одинаковый gesture produces functionally equivalent outcome в 9 из 10 повторов;
- attach latency менее 100 ms;
- visual response начинается в тот же frame;
- игрок различает safe, stressed и overload state без текста;
- tie never becomes invisible against scene materials;
- no mandatory interaction relies on pixel-precise touch;
- 30 consecutive prototype attempts без catastrophic solver explosion.
