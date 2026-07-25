using System;
using UnityEngine;

namespace ChickenHimOut.WorldGame.Scoring
{
    [Serializable]
    public struct ScoreBreakdown
    {
        [Range(0, 100)] public int objective;
        [Range(0, 100)] public int chaos;
        [Range(0, 100)] public int style;
        [Range(0, 100)] public int collateral;
        [Range(-100, 100)] public int prizeProbabilityDelta;

        public int Total => Mathf.Max(0, objective + chaos + style - collateral);
    }

    public sealed class MissionScore : MonoBehaviour
    {
        [SerializeField] private ScoreBreakdown current;

        public event Action<ScoreBreakdown> Changed;
        public ScoreBreakdown Current => current;

        public void AddObjective(int value) { current.objective = Clamp(current.objective + value); Publish(); }
        public void AddChaos(int value) { current.chaos = Clamp(current.chaos + value); Publish(); }
        public void AddStyle(int value) { current.style = Clamp(current.style + value); Publish(); }
        public void AddCollateral(int value) { current.collateral = Clamp(current.collateral + value); Publish(); }
        public void AddPrizeDelta(int value) { current.prizeProbabilityDelta = Mathf.Clamp(current.prizeProbabilityDelta + value, -100, 100); Publish(); }
        public void ResetScore() { current = default; Publish(); }

        private static int Clamp(int value) => Mathf.Clamp(value, 0, 100);
        private void Publish() => Changed?.Invoke(current);
    }
}
