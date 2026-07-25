using System;
using ChickenHimOut.WorldGame.Mission;
using UnityEngine;

namespace ChickenHimOut.WorldGame.Guidance
{
    public sealed class ContextHintDirector : MonoBehaviour
    {
        [SerializeField, Min(0.5f)] private float firstHintDelay = 3f;
        [SerializeField, Min(1f)] private float repeatDelay = 7f;
        [SerializeField, Min(0.1f)] private float visibleSeconds = 2.4f;
        [SerializeField] private MissionPhaseController phases;

        private float lastMeaningfulActionTime;
        private float hideAt;
        private string currentHint;
        private bool visible;

        public event Action<string, bool> HintChanged;

        public void Configure(MissionPhaseController controller)
        {
            if (phases != null) phases.PhaseChanged -= HandlePhaseChanged;
            phases = controller;
            if (isActiveAndEnabled && phases != null) phases.PhaseChanged += HandlePhaseChanged;
        }

        private void Awake()
        {
            lastMeaningfulActionTime = Time.unscaledTime;
            if (phases != null) phases.PhaseChanged += HandlePhaseChanged;
        }

        private void OnDestroy()
        {
            if (phases != null) phases.PhaseChanged -= HandlePhaseChanged;
        }

        private void Update()
        {
            if (visible && Time.unscaledTime >= hideAt)
            {
                visible = false;
                HintChanged?.Invoke(currentHint, false);
            }

            if (!visible && Time.unscaledTime - lastMeaningfulActionTime >= CurrentDelay())
                ShowHint(HintFor(phases != null ? phases.Current : MissionPhase.Setup));
        }

        public void RegisterMeaningfulAction()
        {
            lastMeaningfulActionTime = Time.unscaledTime;
            if (!visible) return;
            visible = false;
            HintChanged?.Invoke(currentHint, false);
        }

        private void HandlePhaseChanged(MissionPhase _, MissionPhase __) => RegisterMeaningfulAction();
        private float CurrentDelay() => lastMeaningfulActionTime <= 0.01f ? firstHintDelay : repeatDelay;

        private void ShowHint(string hint)
        {
            if (string.IsNullOrWhiteSpace(hint)) return;
            currentHint = hint;
            visible = true;
            hideAt = Time.unscaledTime + visibleSeconds;
            lastMeaningfulActionTime = Time.unscaledTime;
            HintChanged?.Invoke(currentHint, true);
        }

        private static string HintFor(MissionPhase phase) => phase switch
        {
            MissionPhase.Setup => "Потяни галстук к светящейся точке",
            MissionPhase.FirstIntervention => "Посмотри, что изменилось вокруг",
            MissionPhase.Response => "Используй последствия в свою пользу",
            MissionPhase.Escalation => "Подготовь красивый выход",
            MissionPhase.FalseSuccess => "Уходи, пока всё не рухнуло",
            MissionPhase.Escape => "Доберись до выхода",
            MissionPhase.Failed => "Попробуй другой порядок действий",
            _ => string.Empty
        };
    }
}
