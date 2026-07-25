using System.Collections;
using UnityEngine;

namespace ChickenHimOut.WorldGame.Feedback
{
    public sealed class DeviceFeedbackPlayer : MonoBehaviour
    {
        [SerializeField] private FeedbackBus bus;
        [SerializeField] private AudioSource audioSource;
        [SerializeField] private AudioClip attachClip;
        [SerializeField] private AudioClip tensionClip;
        [SerializeField] private AudioClip successClip;
        [SerializeField] private AudioClip failureClip;
        [SerializeField] private bool vibrationEnabled = true;

        private Coroutine vibrationRoutine;

        private void OnEnable()
        {
            if (bus != null) bus.VisualFeedbackRequested += HandleFeedback;
        }

        private void OnDisable()
        {
            if (bus != null) bus.VisualFeedbackRequested -= HandleFeedback;
        }

        private void HandleFeedback(FeedbackEvent type, float intensity)
        {
            AudioClip clip = type switch
            {
                FeedbackEvent.Attach => attachClip,
                FeedbackEvent.TensionLow => tensionClip,
                FeedbackEvent.TensionHigh => tensionClip,
                FeedbackEvent.FalseSuccess => successClip,
                FeedbackEvent.Escape => successClip,
                FeedbackEvent.ImminentFailure => failureClip,
                FeedbackEvent.Result => successClip,
                _ => null
            };

            if (audioSource != null && clip != null)
                audioSource.PlayOneShot(clip, Mathf.Lerp(0.45f, 1f, Mathf.Clamp01(intensity)));

            if (!vibrationEnabled) return;
            if (vibrationRoutine != null) StopCoroutine(vibrationRoutine);
            vibrationRoutine = StartCoroutine(Vibrate(type));
        }

        private static IEnumerator Vibrate(FeedbackEvent type)
        {
#if UNITY_ANDROID || UNITY_IOS
            Handheld.Vibrate();
            if (type == FeedbackEvent.FalseSuccess || type == FeedbackEvent.Escape || type == FeedbackEvent.Result)
            {
                yield return new WaitForSecondsRealtime(0.12f);
                Handheld.Vibrate();
            }
#endif
            yield break;
        }
    }
}
