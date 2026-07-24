using System;
using System.Collections.Generic;
using UnityEngine;

namespace ChickenHimOut.WorldGame.Director
{
    public enum CameraEventPriority { Ambient = 0, NpcReaction = 10, Destruction = 20, RareChain = 30, CriticalState = 40, HeroThreat = 50 }

    public sealed class ChaosCameraDirector : MonoBehaviour
    {
        [Serializable]
        public struct CameraTarget
        {
            public string id;
            public Transform target;
        }

        [SerializeField] private CameraTarget[] targets;
        [SerializeField] private float minimumHoldSeconds = 0.45f;
        [SerializeField] private float cooldownSeconds = 0.25f;

        private readonly Dictionary<string, Transform> lookup = new();
        private CameraEventPriority currentPriority;
        private float holdUntil;
        private float cooldownUntil;

        public event Action<Transform, CameraEventPriority> FocusRequested;

        private void Awake()
        {
            foreach (var entry in targets)
                if (!string.IsNullOrWhiteSpace(entry.id) && entry.target != null)
                    lookup[entry.id] = entry.target;
        }

        public bool RequestFocus(string id, CameraEventPriority priority)
        {
            if (!lookup.TryGetValue(id, out var target)) return false;
            if (Time.unscaledTime < holdUntil && priority < currentPriority) return false;
            if (Time.unscaledTime < cooldownUntil && priority <= currentPriority) return false;

            currentPriority = priority;
            holdUntil = Time.unscaledTime + minimumHoldSeconds;
            cooldownUntil = Time.unscaledTime + cooldownSeconds;
            FocusRequested?.Invoke(target, priority);
            return true;
        }
    }
}
