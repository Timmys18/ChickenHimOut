using ChickenHimOut.WorldGame.Analytics;
using ChickenHimOut.WorldGame.Assistance;
using ChickenHimOut.WorldGame.Feedback;
using ChickenHimOut.WorldGame.Scoring;
using UnityEngine;

namespace ChickenHimOut.WorldGame.Mission
{
    public sealed class WallMissionOrchestrator : MonoBehaviour
    {
        [SerializeField] private MissionPhaseController phases;
        [SerializeField] private MissionScore score;
        [SerializeField] private GameplayAnalytics analytics;
        [SerializeField] private FeedbackBus feedback;
        [SerializeField] private AdaptiveAssistance assistance;

        private void Awake()
        {
            if (phases != null) phases.PhaseChanged += OnPhaseChanged;
        }

        private void OnDestroy()
        {
            if (phases != null) phases.PhaseChanged -= OnPhaseChanged;
        }

        public void RegisterFirstAttach()
        {
            assistance?.RegisterMeaningfulAction();
            analytics?.Track("tie_attach", ("mission", "wall"));
            feedback?.Emit(FeedbackEvent.Attach, 0.65f);
            phases?.TryAdvance(MissionPhase.FirstIntervention);
        }

        public void RegisterSystemResponse()
        {
            score?.AddChaos(10);
            analytics?.Track("system_response", ("mission", "wall"));
            phases?.TryAdvance(MissionPhase.Response);
        }

        public void RegisterEscalationChoice(string route)
        {
            score?.AddStyle(route == "spectacular" ? 20 : 8);
            analytics?.Track("route_selected", ("route", route));
            phases?.TryAdvance(MissionPhase.Escalation);
        }

        public void RegisterFalseSuccess()
        {
            score?.AddObjective(35);
            feedback?.Emit(FeedbackEvent.FalseSuccess, 1f);
            analytics?.Track("false_success");
            phases?.TryAdvance(MissionPhase.FalseSuccess);
        }

        public void RegisterEscape()
        {
            score?.AddObjective(35);
            score?.AddStyle(15);
            feedback?.Emit(FeedbackEvent.Escape, 1f);
            analytics?.Track("escape_complete");
            phases?.TryAdvance(MissionPhase.Escape);
            phases?.TryAdvance(MissionPhase.Result);
            assistance?.RegisterSuccess();
        }

        public void RegisterFailure(string reason)
        {
            analytics?.Track("mission_fail", ("reason", reason));
            assistance?.RegisterFailure();
            phases?.Fail();
        }

        private void OnPhaseChanged(MissionPhase from, MissionPhase to) =>
            analytics?.Track("mission_phase", ("from", from), ("to", to));
    }
}
