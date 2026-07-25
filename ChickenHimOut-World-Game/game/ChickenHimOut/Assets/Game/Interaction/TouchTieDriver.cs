using ChickenHimOut.WorldGame.Input;
using ChickenHimOut.Game.Interaction;
using ChickenHimOut.Game.Tie;
using UnityEngine;

namespace ChickenHimOut.WorldGame.Interaction
{
    public sealed class TouchTieDriver : MonoBehaviour
    {
        [SerializeField] private SemanticTouchInput input;
        [SerializeField] private AnchorAcquisition acquisition;
        [SerializeField] private TieController tie;
        [SerializeField] private Camera gameplayCamera;
        [SerializeField] private Transform tieOrigin;

        private InteractionAnchor selected;

        private void Awake()
        {
            if (gameplayCamera == null) gameplayCamera = Camera.main;
        }

        private void OnEnable()
        {
            if (input == null) return;
            input.Tap += HandleTap;
            input.DragStarted += HandleDragStarted;
            input.DragUpdated += HandleDragUpdated;
            input.DragEnded += HandleDragEnded;
        }

        private void OnDisable()
        {
            if (input == null) return;
            input.Tap -= HandleTap;
            input.DragStarted -= HandleDragStarted;
            input.DragUpdated -= HandleDragUpdated;
            input.DragEnded -= HandleDragEnded;
        }

        private void HandleTap(Vector2 screenPoint)
        {
            if (selected != null)
            {
                tie?.Release();
                selected = null;
                return;
            }

            selected = acquisition == null ? null : acquisition.FindBest(screenPoint, gameplayCamera);
            if (selected != null && tieOrigin != null)
            {
                tie?.Attach(tieOrigin, selected.transform);
            }
        }

        private void HandleDragStarted(DragSample sample)
        {
            selected = acquisition == null ? null : acquisition.FindBest(sample.Start, gameplayCamera);
            if (selected != null && tieOrigin != null)
            {
                tie?.Attach(tieOrigin, selected.transform);
            }
        }

        private void HandleDragUpdated(DragSample sample)
        {
            if (selected == null || gameplayCamera == null || tie == null) return;
            Ray ray = gameplayCamera.ScreenPointToRay(sample.Current);
            Plane plane = new Plane(Vector3.forward, selected.transform.position);
            if (plane.Raycast(ray, out float distance))
            {
                tie.SetTargetPoint(ray.GetPoint(distance));
            }
        }

        private void HandleDragEnded(DragSample sample)
        {
            if (tie == null) return;
            if ((sample.Current - sample.Start).magnitude < 36f)
            {
                return;
            }
            tie.Release();
            selected = null;
        }
    }
}