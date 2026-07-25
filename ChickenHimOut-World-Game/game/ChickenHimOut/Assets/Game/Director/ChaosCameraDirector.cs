using System;
using System.Collections.Generic;
using UnityEngine;

namespace ChickenHimOut.Game.Director
{
    public enum CameraEventPriority
    {
        Ambient = 0,
        NpcReaction = 10,
        Destruction = 20,
        RareChain = 30,
        CriticalState = 40,
        HeroThreat = 50
    }

    public sealed class ChaosCameraDirector : MonoBehaviour
    {
        [Serializable]
        public struct CameraTarget
        {
            public string id;
            public Transform target;
        }

        [SerializeField] private CameraTarget[] targets = Array.Empty<CameraTarget>();
        [SerializeField, Min(0f)] private float minimumHoldSeconds = 0.45f;
        [SerializeField, Min(0f)] private float cooldownSeconds = 0.25f;

        private readonly Dictionary<string, Transform> lookup = new(StringComparer.Ordinal);
        private CameraEventPriority currentPriority;
        private float holdUntil;
        private float cooldownUntil;

        public event Action<Transform, CameraEventPriority> FocusRequested;

        private void Awake()
        {
            lookup.Clear();
            foreach (CameraTarget entry in targets)
            {
                if (!string.IsNullOrWhiteSpace(entry.id) && entry.target != null)
                {
                    lookup[entry.id] = entry.target;
                }
            }
        }

        public bool RequestFocus(string id, CameraEventPriority priority)
        {
            if (!lookup.TryGetValue(id, out Transform target)) return false;
            float now = Time.unscaledTime;
            if (now < holdUntil && priority < currentPriority) return false;
            if (now < cooldownUntil && priority <= currentPriority) return false;

            currentPriority = priority;
            holdUntil = now + minimumHoldSeconds;
            cooldownUntil = now + cooldownSeconds;
            FocusRequested?.Invoke(target, priority);
            return true;
        }

        public void ReleasePriority(CameraEventPriority priority)
        {
            if (priority < currentPriority) return;
            currentPriority = CameraEventPriority.Ambient;
            holdUntil = 0f;
        }
    }
}
