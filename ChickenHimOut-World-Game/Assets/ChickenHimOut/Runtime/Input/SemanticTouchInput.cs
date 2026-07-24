using System;
using UnityEngine;
using UnityEngine.InputSystem.EnhancedTouch;
using Touch = UnityEngine.InputSystem.EnhancedTouch.Touch;

namespace ChickenHimOut.WorldGame.Input
{
    public readonly struct DragSample
    {
        public DragSample(int fingerId, Vector2 start, Vector2 current, Vector2 delta, float duration)
        {
            FingerId = fingerId;
            Start = start;
            Current = current;
            Delta = delta;
            Duration = duration;
        }

        public int FingerId { get; }
        public Vector2 Start { get; }
        public Vector2 Current { get; }
        public Vector2 Delta { get; }
        public float Duration { get; }
    }

    public sealed class SemanticTouchInput : MonoBehaviour
    {
        public event Action<Vector2> Tap;
        public event Action<DragSample> DragStarted;
        public event Action<DragSample> DragUpdated;
        public event Action<DragSample> DragEnded;

        private const float TapMoveThresholdPixels = 24f;
        private const float TapDurationSeconds = 0.28f;

        private void OnEnable()
        {
            EnhancedTouchSupport.Enable();
            Touch.onFingerDown += HandleFingerDown;
            Touch.onFingerMove += HandleFingerMove;
            Touch.onFingerUp += HandleFingerUp;
        }

        private void OnDisable()
        {
            Touch.onFingerDown -= HandleFingerDown;
            Touch.onFingerMove -= HandleFingerMove;
            Touch.onFingerUp -= HandleFingerUp;
            EnhancedTouchSupport.Disable();
        }

        private static DragSample ToSample(Finger finger)
        {
            var touch = finger.currentTouch;
            return new DragSample(
                finger.index,
                touch.startScreenPosition,
                touch.screenPosition,
                touch.delta,
                touch.time - touch.startTime);
        }

        private void HandleFingerDown(Finger finger) => DragStarted?.Invoke(ToSample(finger));
        private void HandleFingerMove(Finger finger) => DragUpdated?.Invoke(ToSample(finger));

        private void HandleFingerUp(Finger finger)
        {
            var sample = ToSample(finger);
            DragEnded?.Invoke(sample);
            if ((sample.Current - sample.Start).magnitude <= TapMoveThresholdPixels && sample.Duration <= TapDurationSeconds)
                Tap?.Invoke(sample.Current);
        }
    }
}
