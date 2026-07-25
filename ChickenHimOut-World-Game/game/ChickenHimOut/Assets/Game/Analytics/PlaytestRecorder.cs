using System;
using System.Collections.Generic;
using System.IO;
using UnityEngine;

namespace ChickenHimOut.WorldGame.Analytics
{
    [Serializable]
    public sealed class PlaytestEvent
    {
        public string name;
        public string missionId;
        public string route;
        public float elapsedSeconds;
        public int attempt;
        public string payload;
        public string utc;
    }

    public sealed class PlaytestRecorder : MonoBehaviour
    {
        [SerializeField] private string missionId = "the-wall";
        private readonly List<PlaytestEvent> session = new();
        private float sessionStart;
        private int attempt;

        public IReadOnlyList<PlaytestEvent> Session => session;

        private void Awake() => sessionStart = Time.realtimeSinceStartup;

        public void BeginAttempt(int attemptNumber)
        {
            attempt = attemptNumber;
            Record("attempt_started");
        }

        public void Record(string eventName, string route = "", string payload = "")
        {
            session.Add(new PlaytestEvent
            {
                name = eventName,
                missionId = missionId,
                route = route,
                elapsedSeconds = Time.realtimeSinceStartup - sessionStart,
                attempt = attempt,
                payload = payload,
                utc = DateTime.UtcNow.ToString("O")
            });
        }

        public string FlushToDisk()
        {
            var directory = Path.Combine(Application.persistentDataPath, "playtests");
            Directory.CreateDirectory(directory);
            var path = Path.Combine(directory, $"{missionId}-{DateTime.UtcNow:yyyyMMdd-HHmmss}.jsonl");
            using var writer = new StreamWriter(path, false);
            foreach (var item in session) writer.WriteLine(JsonUtility.ToJson(item));
            return path;
        }

        private void OnApplicationPause(bool paused)
        {
            if (paused && session.Count > 0) FlushToDisk();
        }
    }
}
