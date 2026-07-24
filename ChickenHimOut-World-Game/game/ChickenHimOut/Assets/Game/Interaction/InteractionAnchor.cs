using UnityEngine;

namespace ChickenHimOut.Interaction
{
    public enum AnchorRole
    {
        Hook,
        Link,
        Routing,
        Escape,
        TacticalPosition
    }

    public sealed class InteractionAnchor : MonoBehaviour
    {
        [SerializeField] private string anchorId;
        [SerializeField] private AnchorRole role;
        [SerializeField, Min(0.05f)] private float screenMagnetRadius = 0.12f;
        [SerializeField] private bool available = true;
        [SerializeField] private Transform forcePoint;

        public string AnchorId => anchorId;
        public AnchorRole Role => role;
        public float ScreenMagnetRadius => screenMagnetRadius;
        public bool IsAvailable => available && isActiveAndEnabled;
        public Vector3 WorldPoint => forcePoint != null ? forcePoint.position : transform.position;

        public void SetAvailable(bool value) => available = value;

#if UNITY_EDITOR
        private void OnValidate()
        {
            if (string.IsNullOrWhiteSpace(anchorId))
                anchorId = gameObject.name;
        }
#endif
    }
}
