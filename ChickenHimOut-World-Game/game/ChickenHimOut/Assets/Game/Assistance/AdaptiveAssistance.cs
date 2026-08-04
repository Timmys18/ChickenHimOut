using System;
using UnityEngine;

namespace ChickenHimOut.WorldGame.Assistance
{
    public enum AssistanceTier { None, Subtle, Guided }

    public sealed class AdaptiveAssistance : MonoBehaviour
    {
        [SerializeField] private int failuresForSubtle = 2;
        [SerializeField] private int failuresForGuided = 4;
        [SerializeField] private float idleSecondsForHint = 6f;

        private int consecutiveFailures;
        private float lastMeaningfulActionTime;

        public event Action<AssistanceTier> TierChanged;
        public event Action IdleHintRequested;
        public AssistanceTier CurrentTier { get; private set; }

        private void Awake() => lastMeaningfulActionTime = Time.unscaledTime;

        private void Update()
        {
            if (Time.unscaledTime - lastMeaningfulActionTime >= idleSecondsForHint)
            {
                lastMeaningfulActionTime = Time.unscaledTime;
                IdleHintRequested?.Invoke();
            }
        }

        public void RegisterMeaningfulAction() => lastMeaningfulActionTime = Time.unscaledTime;

        public void RegisterFailure()
        {
            consecutiveFailures++;
            SetTier(consecutiveFailures >= failuresForGuided
                ? AssistanceTier.Guided
                : consecutiveFailures >= failuresForSubtle ? AssistanceTier.Subtle : AssistanceTier.None);
        }

        public void RegisterSuccess()
        {
            consecutiveFailures = 0;
            SetTier(AssistanceTier.None);
        }

        private void SetTier(AssistanceTier tier)
        {
            if (CurrentTier == tier) return;
            CurrentTier = tier;
            TierChanged?.Invoke(tier);
        }
    }
}
