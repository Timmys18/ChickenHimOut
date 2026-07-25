using ChickenHimOut.WorldGame.Analytics;
using ChickenHimOut.WorldGame.Progress;
using ChickenHimOut.WorldGame.Scoring;
using UnityEngine;

namespace ChickenHimOut.WorldGame.Mission
{
    public sealed class MissionResultController : MonoBehaviour
    {
        [SerializeField] private string missionId = "the-wall";
        [SerializeField] private MissionScore score;
        [SerializeField] private PlaytestRecorder recorder;
        private MissionProgressStore progress;
        private float startedAt;
        private int attempt;

        private void Awake()
        {
            progress = new MissionProgressStore();
            startedAt = Time.realtimeSinceStartup;
        }

        public void BeginAttempt()
        {
            attempt++;
            startedAt = Time.realtimeSinceStartup;
            progress.RecordAttempt(missionId);
            recorder?.BeginAttempt(attempt);
        }

        public void Complete(string route)
        {
            var elapsed = Time.realtimeSinceStartup - startedAt;
            var total = score != null ? score.Total : 0;
            var prize = score != null ? score.PrizeProbability : 0.5f;
            progress.RecordCompletion(missionId, total, route, elapsed, prize);
            recorder?.Record("mission_completed", route, $"score={total};seconds={elapsed:F2};prize={prize:F3}");
            recorder?.FlushToDisk();
        }

        public void Fail(string reason)
        {
            recorder?.Record("mission_failed", payload: reason);
        }

        public void RecordImmediateReplay()
        {
            recorder?.Record("immediate_replay_selected");
        }
    }
}
