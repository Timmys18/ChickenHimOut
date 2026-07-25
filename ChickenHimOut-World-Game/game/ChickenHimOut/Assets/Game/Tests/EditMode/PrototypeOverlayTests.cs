using ChickenHimOut.WorldGame.Mission;
using ChickenHimOut.WorldGame.Scoring;
using NUnit.Framework;
using UnityEngine;

namespace ChickenHimOut.WorldGame.Tests
{
    public sealed class PrototypeOverlayTests
    {
        [Test]
        public void Score_TotalSubtractsCollateral()
        {
            var go = new GameObject("ScoreTest");
            var score = go.AddComponent<MissionScore>();
            score.AddObjective(60);
            score.AddChaos(30);
            score.AddStyle(20);
            score.AddCollateral(25);
            Assert.That(score.Current.Total, Is.EqualTo(85));
            Object.DestroyImmediate(go);
        }

        [Test]
        public void FailedMission_EntersFailedState()
        {
            var go = new GameObject("PhaseTest");
            var phases = go.AddComponent<MissionPhaseController>();
            phases.Fail();
            Assert.That(phases.Current, Is.EqualTo(MissionPhase.Failed));
            Object.DestroyImmediate(go);
        }
    }
}
