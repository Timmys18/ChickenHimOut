using System;
using System.Collections.Generic;
using System.IO;
using UnityEngine;

namespace ChickenHimOut.WorldGame.Progress
{
    [Serializable]
    public sealed class MissionProgressRecord
    {
        public string missionId;
        public int attempts;
        public int completions;
        public int bestTotalScore;
        public string bestRoute;
        public float bestCompletionSeconds;
        public float prizeProbability;
    }

    [Serializable]
    internal sealed class MissionProgressEnvelope
    {
        public int schemaVersion = 1;
        public List<MissionProgressRecord> missions = new();
    }

    public sealed class MissionProgressStore
    {
        private const int CurrentSchemaVersion = 1;
        private readonly string primaryPath;
        private readonly string backupPath;
        private MissionProgressEnvelope state;

        public MissionProgressStore(string directory = null)
        {
            directory ??= Application.persistentDataPath;
            primaryPath = Path.Combine(directory, "chickenhimout-progress.json");
            backupPath = primaryPath + ".bak";
            state = LoadEnvelope();
        }

        public MissionProgressRecord Get(string missionId)
        {
            var existing = state.missions.Find(x => x.missionId == missionId);
            if (existing != null) return existing;

            var created = new MissionProgressRecord
            {
                missionId = missionId,
                bestCompletionSeconds = float.MaxValue,
                prizeProbability = 0.5f
            };
            state.missions.Add(created);
            return created;
        }

        public void RecordAttempt(string missionId)
        {
            Get(missionId).attempts++;
            Save();
        }

        public void RecordCompletion(string missionId, int totalScore, string route, float completionSeconds, float prizeProbability)
        {
            var record = Get(missionId);
            record.completions++;
            if (totalScore > record.bestTotalScore)
            {
                record.bestTotalScore = totalScore;
                record.bestRoute = route;
            }
            record.bestCompletionSeconds = Mathf.Min(record.bestCompletionSeconds, completionSeconds);
            record.prizeProbability = Mathf.Clamp01(prizeProbability);
            Save();
        }

        private MissionProgressEnvelope LoadEnvelope()
        {
            var loaded = TryRead(primaryPath) ?? TryRead(backupPath);
            if (loaded == null || loaded.schemaVersion > CurrentSchemaVersion)
                return new MissionProgressEnvelope { schemaVersion = CurrentSchemaVersion };
            return loaded;
        }

        private static MissionProgressEnvelope TryRead(string path)
        {
            try
            {
                if (!File.Exists(path)) return null;
                return JsonUtility.FromJson<MissionProgressEnvelope>(File.ReadAllText(path));
            }
            catch (Exception exception)
            {
                Debug.LogWarning($"Progress load failed for {path}: {exception.Message}");
                return null;
            }
        }

        private void Save()
        {
            Directory.CreateDirectory(Path.GetDirectoryName(primaryPath) ?? Application.persistentDataPath);
            var temporaryPath = primaryPath + ".tmp";
            var json = JsonUtility.ToJson(state, true);
            File.WriteAllText(temporaryPath, json);
            if (File.Exists(primaryPath)) File.Copy(primaryPath, backupPath, true);
            File.Copy(temporaryPath, primaryPath, true);
            File.Delete(temporaryPath);
        }
    }
}
