using System;
using UnityEngine;

namespace ChickenHimOut.WorldGame.Wall
{
    public enum PanelState { Cradled, Suspended, Unstable, Aligned, Braced, PhotoStable, Failing, Fallen }

    public sealed class WallPanelSystem : MonoBehaviour
    {
        public event Action<PanelState> StateChanged;
        public PanelState State { get; private set; } = PanelState.Cradled;
        public float Alignment01 { get; private set; }

        public void ResetState()
        {
            Alignment01 = 0f;
            SetState(PanelState.Cradled);
        }

        public void SetSuspended() => SetState(PanelState.Suspended);
        public void SetUnstable() => SetState(PanelState.Unstable);

        public void SetAlignment(float value)
        {
            Alignment01 = Mathf.Clamp01(value);
            if (Alignment01 >= 0.92f) SetState(PanelState.Aligned);
        }

        public bool Brace()
        {
            if (State != PanelState.Aligned) return false;
            SetState(PanelState.Braced);
            return true;
        }

        public bool ConfirmPhotoStable()
        {
            if (State != PanelState.Braced) return false;
            SetState(PanelState.PhotoStable);
            return true;
        }

        public void BeginFailure() => SetState(PanelState.Failing);
        public void Fall() => SetState(PanelState.Fallen);

        private void SetState(PanelState next)
        {
            if (State == next) return;
            State = next;
            StateChanged?.Invoke(next);
        }
    }

    public sealed class CraneAutoLevelSystem : MonoBehaviour
    {
        [SerializeField] private Rigidbody boom;
        [SerializeField] private float compensationTorque = 1800f;
        [SerializeField] private float imbalanceThreshold = 0.18f;
        public bool IsCompensating { get; private set; }

        public void Configure(Rigidbody boomBody) => boom = boomBody;

        public void Evaluate(float normalizedImbalance)
        {
            IsCompensating = Mathf.Abs(normalizedImbalance) >= imbalanceThreshold;
            if (!IsCompensating || boom == null) return;
            boom.AddTorque(Vector3.up * -Mathf.Sign(normalizedImbalance) * compensationTorque, ForceMode.Force);
        }
    }

    public sealed class CounterweightRail : MonoBehaviour
    {
        [SerializeField] private Transform minPoint;
        [SerializeField] private Transform maxPoint;
        [SerializeField] private Transform weight;
        public float Position01 { get; private set; }

        public void Configure(Transform minimum, Transform maximum, Transform movableWeight)
        {
            minPoint = minimum;
            maxPoint = maximum;
            weight = movableWeight;
        }

        public void SetPosition(float normalized)
        {
            Position01 = Mathf.Clamp01(normalized);
            if (weight != null && minPoint != null && maxPoint != null)
                weight.position = Vector3.Lerp(minPoint.position, maxPoint.position, Position01);
        }
    }

    public sealed class LoopingTruck : MonoBehaviour
    {
        [SerializeField] private Transform[] route;
        [SerializeField] private float speed = 5f;
        [SerializeField] private float alignmentRadius = 1.25f;
        [SerializeField] private Transform alignmentPoint;
        private int nextIndex;

        public bool IsInAlignmentWindow => alignmentPoint != null && Vector3.Distance(transform.position, alignmentPoint.position) <= alignmentRadius;

        public void Configure(Transform[] routePoints, Transform alignment)
        {
            route = routePoints;
            alignmentPoint = alignment;
            nextIndex = 0;
        }

        private void Update()
        {
            if (route == null || route.Length == 0 || route[nextIndex] == null) return;
            var target = route[nextIndex];
            transform.position = Vector3.MoveTowards(transform.position, target.position, speed * Time.deltaTime);
            if (Vector3.Distance(transform.position, target.position) < 0.05f)
                nextIndex = (nextIndex + 1) % route.Length;
        }
    }
}
