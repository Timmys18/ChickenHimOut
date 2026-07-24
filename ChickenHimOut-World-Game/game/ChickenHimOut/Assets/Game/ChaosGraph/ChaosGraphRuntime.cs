using System;
using System.Collections.Generic;
using UnityEngine;

namespace ChickenHimOut.ChaosGraph
{
    [Serializable]
    public sealed class ChaosTransition
    {
        public string fromState;
        public string eventId;
        public string toState;
    }

    [CreateAssetMenu(menuName = "ChickenHimOut/Chaos Graph Definition")]
    public sealed class ChaosGraphDefinition : ScriptableObject
    {
        public string initialState = "Setup";
        public List<ChaosTransition> transitions = new();
    }

    public sealed class ChaosGraphRuntime : MonoBehaviour
    {
        [SerializeField] private ChaosGraphDefinition definition;

        public string CurrentState { get; private set; }
        public event Action<string, string> StateChanged;

        private void Awake()
        {
            CurrentState = definition != null ? definition.initialState : "Setup";
        }

        public bool Raise(string eventId)
        {
            if (definition == null || string.IsNullOrWhiteSpace(eventId))
                return false;

            foreach (var transition in definition.transitions)
            {
                if (!string.Equals(transition.fromState, CurrentState, StringComparison.Ordinal) ||
                    !string.Equals(transition.eventId, eventId, StringComparison.Ordinal))
                    continue;

                var previous = CurrentState;
                CurrentState = transition.toState;
                StateChanged?.Invoke(previous, CurrentState);
                return true;
            }

            Debug.LogWarning($"ChaosGraph ignored event '{eventId}' in state '{CurrentState}'.", this);
            return false;
        }
    }
}
