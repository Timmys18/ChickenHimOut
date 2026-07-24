using UnityEngine;

namespace ChickenHimOut.WorldGame.Visual
{
    public enum VisualTier { SupportedFloor, Main, High }

    [CreateAssetMenu(menuName = "ChickenHimOut/Visual Quality Profile")]
    public sealed class VisualQualityProfile : ScriptableObject
    {
        public VisualTier tier;
        [Range(0.5f, 1f)] public float renderScale = 1f;
        [Range(0, 4)] public int shadowCascades = 2;
        [Min(0f)] public float shadowDistance = 35f;
        [Min(0)] public int maxReactiveProps = 24;
        [Min(0)] public int maxVisibleCrowd = 48;
        [Min(0)] public int maxPhysicalDebris = 28;
        public bool enableForwardPlus = true;
        public bool enableGpuResidentDrawer = true;
        public bool enableStp = true;
        public bool enableHighRefreshMode;
    }
}
