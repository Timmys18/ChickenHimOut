using ChickenHimOut.WorldGame.Mission;
using NUnit.Framework;
using UnityEngine;

namespace ChickenHimOut.WorldGame.Tests
{
    public sealed class MissionPhaseControllerTests
    {
        [Test]
        public void ValidSequence_ReachesResult()
        {
            var go = new GameObject("MissionPhaseControllerTests");
            var controller = go.AddComponent<MissionPhaseController>();

            Assert.That(controller.TryAdvance(MissionPhase.FirstIntervention), Is.True);
            Assert.That(controller.TryAdvance(MissionPhase.Response), Is.True);
            Assert.That(controller.TryAdvance(MissionPhase.Escalation), Is.True);
            Assert.That(controller.TryAdvance(MissionPhase.FalseSuccess), Is.True);
            Assert.That(controller.TryAdvance(MissionPhase.Escape), Is.True);
            Assert.That(controller.TryAdvance(MissionPhase.Result), Is.True);
            Assert.That(controller.Current, Is.EqualTo(MissionPhase.Result));

            Object.DestroyImmediate(go);
        }

        [Test]
        public void Setup_CannotSkipDirectlyToResult()
        {
            var go = new GameObject("MissionPhaseControllerTests");
            var controller = go.AddComponent<MissionPhaseController>();
            Assert.That(controller.TryAdvance(MissionPhase.Result), Is.False);
            Assert.That(controller.Current, Is.EqualTo(MissionPhase.Setup));
            Object.DestroyImmediate(go);
        }
    }
}
