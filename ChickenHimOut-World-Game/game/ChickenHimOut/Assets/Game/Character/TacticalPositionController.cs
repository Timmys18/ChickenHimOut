using System.Collections;
using UnityEngine;

namespace ChickenHimOut.Character
{
    public sealed class TacticalPositionNode : MonoBehaviour
    {
        [SerializeField] private string positionId;
        [SerializeField] private Transform arrivalPoint;
        [SerializeField, Min(0.1f)] private float travelDuration = 0.65f;

        public string PositionId => positionId;
        public Vector3 ArrivalPosition => arrivalPoint != null ? arrivalPoint.position : transform.position;
        public Quaternion ArrivalRotation => arrivalPoint != null ? arrivalPoint.rotation : transform.rotation;
        public float TravelDuration => travelDuration;
    }

    public sealed class TacticalPositionController : MonoBehaviour
    {
        [SerializeField] private Transform heroRoot;
        private Coroutine travelRoutine;

        public bool IsTravelling => travelRoutine != null;
        public TacticalPositionNode Current { get; private set; }

        public void MoveTo(TacticalPositionNode destination)
        {
            if (destination == null || heroRoot == null)
                return;

            if (travelRoutine != null)
                StopCoroutine(travelRoutine);

            travelRoutine = StartCoroutine(Travel(destination));
        }

        private IEnumerator Travel(TacticalPositionNode destination)
        {
            var startPosition = heroRoot.position;
            var startRotation = heroRoot.rotation;
            var duration = Mathf.Max(0.1f, destination.TravelDuration);
            var elapsed = 0f;

            while (elapsed < duration)
            {
                elapsed += Time.deltaTime;
                var t = Mathf.SmoothStep(0f, 1f, Mathf.Clamp01(elapsed / duration));
                heroRoot.SetPositionAndRotation(
                    Vector3.Lerp(startPosition, destination.ArrivalPosition, t),
                    Quaternion.Slerp(startRotation, destination.ArrivalRotation, t));
                yield return null;
            }

            heroRoot.SetPositionAndRotation(destination.ArrivalPosition, destination.ArrivalRotation);
            Current = destination;
            travelRoutine = null;
        }
    }
}
