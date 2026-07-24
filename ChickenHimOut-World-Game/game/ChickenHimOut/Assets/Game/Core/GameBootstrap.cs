using System;
using UnityEngine;

namespace ChickenHimOut.Core
{
    [DefaultExecutionOrder(-1000)]
    public sealed class GameBootstrap : MonoBehaviour
    {
        public static GameBootstrap Instance { get; private set; }

        public event Action Ready;

        [SerializeField, Min(30)] private int targetFrameRate = 60;
        [SerializeField, Min(30)] private int physicsRate = 60;

        private void Awake()
        {
            if (Instance != null && Instance != this)
            {
                Destroy(gameObject);
                return;
            }

            Instance = this;
            DontDestroyOnLoad(gameObject);

            Application.targetFrameRate = targetFrameRate;
            Time.fixedDeltaTime = 1f / physicsRate;
            QualitySettings.vSyncCount = 0;

            Ready?.Invoke();
        }
    }
}
