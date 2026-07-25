using System;
using UnityEngine;

namespace ChickenHimOut.WorldGame.Feedback
{
    public enum FeedbackEvent
    {
        AnchorEnter,
        Attach,
        TensionLow,
        TensionHigh,
        Commit,
        ImminentFailure,
        FalseSuccess,
        Escape,
        Result
    }

    public interface IHapticsDriver { void Play(FeedbackEvent feedbackEvent, float intensity); }
    public interface IAudioFeedbackDriver { void Play(FeedbackEvent feedbackEvent, float intensity); }

    public sealed class FeedbackBus : MonoBehaviour
    {
        private IHapticsDriver haptics;
        private IAudioFeedbackDriver audioDriver;

        public event Action<FeedbackEvent, float> VisualFeedbackRequested;

        public void Configure(IHapticsDriver hapticsDriver, IAudioFeedbackDriver audioFeedbackDriver)
        {
            haptics = hapticsDriver;
            audioDriver = audioFeedbackDriver;
        }

        public void Emit(FeedbackEvent feedbackEvent, float intensity = 1f)
        {
            intensity = Mathf.Clamp01(intensity);
            haptics?.Play(feedbackEvent, intensity);
            audioDriver?.Play(feedbackEvent, intensity);
            VisualFeedbackRequested?.Invoke(feedbackEvent, intensity);
        }
    }
}
