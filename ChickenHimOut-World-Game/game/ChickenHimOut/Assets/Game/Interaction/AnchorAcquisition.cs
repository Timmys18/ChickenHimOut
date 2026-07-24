using System.Collections.Generic;
using UnityEngine;

namespace ChickenHimOut.Interaction
{
    public sealed class AnchorAcquisition : MonoBehaviour
    {
        [SerializeField] private Camera gameplayCamera;
        [SerializeField] private LayerMask anchorMask;
        [SerializeField, Min(1)] private int maxCandidates = 32;

        private readonly Collider[] hits = new Collider[32];

        public InteractionAnchor FindBest(Vector2 screenPoint, AnchorRole requiredRole)
        {
            if (gameplayCamera == null)
                return null;

            var ray = gameplayCamera.ScreenPointToRay(screenPoint);
            var count = Physics.OverlapSphereNonAlloc(ray.GetPoint(8f), 8f, hits, anchorMask, QueryTriggerInteraction.Collide);

            InteractionAnchor best = null;
            var bestScore = float.NegativeInfinity;
            var limit = Mathf.Min(count, maxCandidates, hits.Length);

            for (var i = 0; i < limit; i++)
            {
                var anchor = hits[i] != null ? hits[i].GetComponentInParent<InteractionAnchor>() : null;
                if (anchor == null || !anchor.IsAvailable || anchor.Role != requiredRole)
                    continue;

                var anchorScreen = gameplayCamera.WorldToScreenPoint(anchor.WorldPoint);
                if (anchorScreen.z <= 0f)
                    continue;

                var normalizedDistance = Vector2.Distance(screenPoint, anchorScreen) / Mathf.Max(Screen.width, Screen.height);
                var score = 1f - normalizedDistance / anchor.ScreenMagnetRadius;
                if (score > bestScore)
                {
                    best = anchor;
                    bestScore = score;
                }
            }

            return bestScore >= 0f ? best : null;
        }
    }
}
