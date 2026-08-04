using System;
using ChickenHimOut.Interaction;
using UnityEngine;

namespace ChickenHimOut.Tie
{
    public enum TieState
    {
        Idle,
        Preview,
        Attached,
        Tensioned,
        Released,
        Overloaded
    }

    public sealed class TieController : MonoBehaviour
    {
        [Header("Authoritative points")]
        [SerializeField] private Transform origin;
        [SerializeField] private Rigidbody forceReceiver;

        [Header("Feel")]
        [SerializeField, Min(0f)] private float slackLength = 2f;
        [SerializeField, Min(0f)] private float spring = 85f;
        [SerializeField, Min(0f)] private float damping = 10f;
        [SerializeField, Min(0f)] private float maxForce = 450f;
        [SerializeField, Min(0f)] private float overloadForce = 520f;

        public TieState State { get; private set; } = TieState.Idle;
        public InteractionAnchor Target { get; private set; }
        public float NormalizedTension { get; private set; }

        public event Action<InteractionAnchor> Attached;
        public event Action Released;
        public event Action Overloaded;

        public void BeginPreview(InteractionAnchor target)
        {
            if (target == null || !target.IsAvailable)
                return;

            Target = target;
            State = TieState.Preview;
        }

        public void CommitAttach()
        {
            if (State != TieState.Preview || Target == null)
                return;

            State = TieState.Attached;
            Attached?.Invoke(Target);
        }

        public void ReleaseTie()
        {
            Target = null;
            NormalizedTension = 0f;
            State = TieState.Released;
            Released?.Invoke();
            State = TieState.Idle;
        }

        private void FixedUpdate()
        {
            if ((State != TieState.Attached && State != TieState.Tensioned) || Target == null || origin == null)
                return;

            var delta = Target.WorldPoint - origin.position;
            var distance = delta.magnitude;
            if (distance <= Mathf.Epsilon)
                return;

            var extension = Mathf.Max(0f, distance - slackLength);
            var direction = delta / distance;
            var relativeSpeed = forceReceiver != null ? Vector3.Dot(forceReceiver.linearVelocity, direction) : 0f;
            var rawForce = extension * spring - relativeSpeed * damping;
            var clampedForce = Mathf.Clamp(rawForce, 0f, maxForce);

            NormalizedTension = maxForce > 0f ? clampedForce / maxForce : 0f;
            State = clampedForce > 0.05f ? TieState.Tensioned : TieState.Attached;

            if (forceReceiver != null)
                forceReceiver.AddForce(direction * clampedForce, ForceMode.Force);

            if (rawForce >= overloadForce)
            {
                State = TieState.Overloaded;
                Overloaded?.Invoke();
                ReleaseTie();
            }
        }
    }
}
