using System;
using System.Collections;
using UnityEngine;
using UnityEngine.SceneManagement;

namespace ChickenHimOut.WorldGame.Mission
{
    public sealed class FastRetryController : MonoBehaviour
    {
        [SerializeField, Min(0f)] private float minimumResultBeatSeconds = 0.35f;
        [SerializeField, Min(0f)] private float retryTargetSeconds = 1.5f;

        public event Action RetryStarted;
        public event Action<float> RetryCompleted;

        public void RetryCurrentScene() => StartCoroutine(RetryRoutine());

        private IEnumerator RetryRoutine()
        {
            RetryStarted?.Invoke();
            var startedAt = Time.realtimeSinceStartup;
            if (minimumResultBeatSeconds > 0f)
                yield return new WaitForSecondsRealtime(minimumResultBeatSeconds);

            var operation = SceneManager.LoadSceneAsync(SceneManager.GetActiveScene().buildIndex);
            if (operation == null) yield break;
            while (!operation.isDone) yield return null;

            var duration = Time.realtimeSinceStartup - startedAt;
            RetryCompleted?.Invoke(duration);
            if (duration > retryTargetSeconds)
                Debug.LogWarning($"Retry exceeded target: {duration:F2}s > {retryTargetSeconds:F2}s");
        }
    }
}
