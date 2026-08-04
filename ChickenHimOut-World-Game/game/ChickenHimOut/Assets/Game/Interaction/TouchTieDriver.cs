using ChickenHimOut.Interaction;
using ChickenHimOut.Tie;
using ChickenHimOut.WorldGame.Input;
using UnityEngine;

namespace ChickenHimOut.WorldGame.Interaction
{
    public sealed class TouchTieDriver : MonoBehaviour
    {
        [SerializeField] private SemanticTouchInput input;
        [SerializeField] private AnchorAcquisition acquisition;
        [SerializeField] private TieController tie;

        private InteractionAnchor selected;

        private void OnEnable()
        {
            if (input == null) return;
            input.Tap += HandleTap;
            input.DragStarted += HandleDragStarted;
            input.DragEnded += HandleDragEnded;
        }

        private void OnDisable()
        {
            if (input == null) return;
            input.Tap -= HandleTap;
            input.DragStarted -= HandleDragStarted;
            input.DragEnded -= HandleDragEnded;
        }

        private void HandleTap(Vector2 screenPoint)
        {
            if (selected != null)
            {
                tie?.ReleaseTie();
                selected = null;
                return;
            }

            TryAttach(screenPoint);
        }

        private void HandleDragStarted(DragSample sample) => TryAttach(sample.Start);

        private void HandleDragEnded(DragSample sample)
        {
            if (selected == null) return;
            tie?.ReleaseTie();
            selected = null;
        }

        private void TryAttach(Vector2 screenPoint)
        {
            if (acquisition == null || tie == null) return;
            selected = acquisition.FindBest(screenPoint, AnchorRole.Hook);
            if (selected == null) return;
            tie.BeginPreview(selected);
            tie.CommitAttach();
        }
    }
}