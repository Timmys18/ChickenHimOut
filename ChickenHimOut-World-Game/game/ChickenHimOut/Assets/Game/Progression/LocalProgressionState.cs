using System;
using System.Collections.Generic;
using System.IO;
using UnityEngine;

namespace ChickenHimOut.WorldGame.Progression
{
    [Serializable]
    public sealed class MissionRecord
    {
        public string MissionId;
        public int BestTotalScore;
        public string BestRoute;
        public int Attempts;
        public bool Completed;
    }

    [Serializable]
    public sealed class PlayerProgressData
    {
        public int SchemaVersion = 1;
        public float PrizeProbability = 0.05f;
        public List<MissionRecord> Missions = new();
    }

    public sealed class LocalProgressionState : MonoBehaviour
    {
        private const string FileName = "progress-v1.json";
        public PlayerProgressData Data { get; private set; } = new();

        private string SavePath => Path.Combine(Application.persistentDataPath, FileName);
        private string BackupPath => SavePath + ".bak";

        public void Load()
        {
            Data = Read(SavePath) ?? Read(BackupPath) ?? new PlayerProgressData();
        }

        public void RecordResult(string missionId, int totalScore, string route, float prizeDelta)
        {
            var record = Data.Missions.Find(item => item.MissionId == missionId);
            if (record == null)
            {
                record = new MissionRecord { MissionId = missionId };
                Data.Missions.Add(record);
            }

            record.Attempts++;
            record.Completed = true;
            if (totalScore > record.BestTotalScore)
            {
                record.BestTotalScore = totalScore;
                record.BestRoute = route;
            }

            Data.PrizeProbability = Mathf.Clamp01(Data.PrizeProbability + prizeDelta);
            SaveAtomic();
        }

        public void RecordAttempt(string missionId)
        {
            var record = Data.Missions.Find(item => item.MissionId == missionId);
            if (record == null)
            {
                record = new MissionRecord { MissionId = missionId };
                Data.Missions.Add(record);
            }
            record.Attempts++;
            SaveAtomic();
        }

        private void SaveAtomic()
        {
            var temporary = SavePath + ".tmp";
            File.WriteAllText(temporary, JsonUtility.ToJson(Data, true));
            if (File.Exists(SavePath)) File.Copy(SavePath, BackupPath, true);
            if (File.Exists(SavePath)) File.Delete(SavePath);
            File.Move(temporary, SavePath);
        }

        private static PlayerProgressData Read(string path)
        {
            try
            {
                return File.Exists(path) ? JsonUtility.FromJson<PlayerProgressData>(File.ReadAllText(path)) : null;
            }
            catch (Exception exception)
            {
                Debug.LogWarning($"Progress file could not be read: {exception.Message}");
                return null;
            }
        }
    }
}
