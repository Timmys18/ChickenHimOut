using UnityEngine;

namespace ChickenHimOut.Game.Tie
{
    [RequireComponent(typeof(LineRenderer))]
    public sealed class TieSplinePresenter : MonoBehaviour
    {
        [SerializeField] private Transform origin;
        [SerializeField] private Transform target;
        [SerializeField, Min(4)] private int segments = 18;
        [SerializeField, Min(0f)] private float slack = 0.35f;
        [SerializeField, Range(0f, 1f)] private float tensionStraighten = 0.9f;
        [SerializeField] private AnimationCurve widthByTension = AnimationCurve.Linear(0f, 1f, 1f, 0.72f);

        private LineRenderer line;
        private float normalizedTension;

        public void SetEndpoints(Transform from, Transform to)
        {
            origin = from;
            target = to;
        }

        public void SetTension(float value) => normalizedTension = Mathf.Clamp01(value);

        private void Awake()
        {
            line = GetComponent<LineRenderer>();
            line.useWorldSpace = true;
            line.positionCount = segments;
        }

        private void OnValidate()
        {
            segments = Mathf.Max(4, segments);
            if (line == null) line = GetComponent<LineRenderer>();
            if (line != null) line.positionCount = segments;
        }

        private void LateUpdate()
        {
            if (origin == null || target == null)
            {
                line.enabled = false;
                return;
            }

            line.enabled = true;
            Vector3 a = origin.position;
            Vector3 b = target.position;
            float sag = slack * (1f - normalizedTension * tensionStraighten);

            for (int i = 0; i < segments; i++)
            {
                float t = i / (segments - 1f);
                Vector3 point = Vector3.Lerp(a, b, t);
                point += Vector3.down * (4f * t * (1f - t) * sag);
                line.SetPosition(i, point);
            }

            line.widthMultiplier = widthByTension.Evaluate(normalizedTension);
        }
    }
}
