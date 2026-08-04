using ChickenHimOut.WorldGame.Guidance;
using ChickenHimOut.WorldGame.Mission;
using ChickenHimOut.WorldGame.Scoring;
using ChickenHimOut.WorldGame.UI;
using UnityEngine;

namespace ChickenHimOut.WorldGame.Core
{
    public sealed class PrototypeRuntimeInstaller : MonoBehaviour
    {
        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.AfterSceneLoad)]
        private static void Install()
        {
            var phases = Object.FindFirstObjectByType<MissionPhaseController>();
            if (phases == null)
            {
                var missionObject = GameObject.Find("MissionSystems") ?? new GameObject("MissionSystems");
                phases = missionObject.AddComponent<MissionPhaseController>();
            }

            var score = Object.FindFirstObjectByType<MissionScore>();
            if (score == null)
                score = phases.gameObject.AddComponent<MissionScore>();

            var hints = Object.FindFirstObjectByType<ContextHintDirector>();
            if (hints == null)
                hints = phases.gameObject.AddComponent<ContextHintDirector>();
            hints.Configure(phases);

            var overlay = Object.FindFirstObjectByType<PrototypeOverlay>();
            if (overlay == null)
                overlay = phases.gameObject.AddComponent<PrototypeOverlay>();
            overlay.Configure(phases, score, hints);
        }
    }
}
