using System;
using System.Collections.Generic;
using UnityEngine;

namespace ChickenHimOut.WorldGame.Analytics
{
    public readonly struct GameplayEvent
    {
        public GameplayEvent(string name, float time, IReadOnlyDictionary<string, string> data)
        {
            Name = name;
            Time = time;
            Data = data;
        }

        public string Name { get; }
        public float Time { get; }
        public IReadOnlyDictionary<string, string> Data { get; }
    }

    public interface IGameplayAnalyticsSink
    {
        void Track(in GameplayEvent gameplayEvent);
    }

    public sealed class GameplayAnalytics : MonoBehaviour
    {
        private readonly List<GameplayEvent> buffer = new();
        private IGameplayAnalyticsSink sink;

        public IReadOnlyList<GameplayEvent> BufferedEvents => buffer;

        public void Configure(IGameplayAnalyticsSink analyticsSink) => sink = analyticsSink;

        public void Track(string eventName, params (string Key, object Value)[] fields)
        {
            var data = new Dictionary<string, string>(StringComparer.Ordinal);
            foreach (var field in fields)
                data[field.Key] = field.Value?.ToString() ?? string.Empty;

            var gameplayEvent = new GameplayEvent(eventName, Time.unscaledTime, data);
            buffer.Add(gameplayEvent);
            sink?.Track(in gameplayEvent);
        }

        public void ClearBuffer() => buffer.Clear();
    }
}
