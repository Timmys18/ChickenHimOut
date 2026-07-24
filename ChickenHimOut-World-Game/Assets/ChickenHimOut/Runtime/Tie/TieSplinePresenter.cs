using UnityEngine;

namespace ChickenHimOut.WorldGame.Tie
{
    [RequireComponent(typeof(LineRenderer))]
    public sealed class TieSplinePresenter : MonoBehaviour
    {
        [SerializeField] private Transform origin;
        [SerializeField] private Transform target;
        [SerializeField, Min(4)] private int segments = 18;
        [SerializeField, Min(0f)] private float slack = 0.35f;
        [SerializeField, Min(0f)] private float tensionStraighten = 0.9f;
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

        private void LateUpdate()
        {
            if (origin == null || target == null)
            {
                line.enabled = false;
                return;
            }

            line.enabled = true;
            var a = origin.position;
            var b = target.position;
            var sag = slack * (1f - normalizedTension * tensionStraighten);

            for (var i = 0; i < segments; i++)
            {
                var t = i / (segments - 1f);
                var p = Vector3.Lerp(a, b, t);
                p += Vector3.down * (4f * t * (1f - t) * sag);
                line.SetPosition(i, p);
            }

            var widthScale = widthByTension.Evaluate(normalizedTension);
            line.widthMultiplier = widthScale;
        }
    }
}
