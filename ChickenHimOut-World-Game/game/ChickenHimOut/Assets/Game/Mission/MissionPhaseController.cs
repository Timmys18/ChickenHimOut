using System;
using UnityEngine;

namespace ChickenHimOut.Game.Mission
{
    public enum MissionPhase
    {
        Setup,
        FirstIntervention,
        Response,
        Escalation,
        FalseSuccess,
        Escape,
        Result,
        Failed
    }

    public sealed class MissionPhaseController : MonoBehaviour
    {
        public event Action<MissionPhase, MissionPhase> PhaseChanged;
        public MissionPhase Current { get; private set; } = MissionPhase.Setup;

        public bool TryAdvance(MissionPhase next)
        {
            if (!IsAllowed(Current, next)) return false;
            MissionPhase previous = Current;
            Current = next;
            PhaseChanged?.Invoke(previous, next);
            return true;
        }

        public void Fail()
        {
            if (Current is MissionPhase.Result or MissionPhase.Failed) return;
            MissionPhase previous = Current;
            Current = MissionPhase.Failed;
            PhaseChanged?.Invoke(previous, Current);
        }

        public void ResetMission()
        {
            MissionPhase previous = Current;
            Current = MissionPhase.Setup;
            PhaseChanged?.Invoke(previous, Current);
        }

        public static bool IsAllowed(MissionPhase from, MissionPhase to) => (from, to) switch
        {
            (MissionPhase.Setup, MissionPhase.FirstIntervention) => true,
            (MissionPhase.FirstIntervention, MissionPhase.Response) => true,
            (MissionPhase.Response, MissionPhase.Escalation) => true,
            (MissionPhase.Escalation, MissionPhase.FalseSuccess) => true,
            (MissionPhase.FalseSuccess, MissionPhase.Escape) => true,
            (MissionPhase.Escape, MissionPhase.Result) => true,
            _ => false
        };
    }
}
