using ChickenHimOut.WorldGame.Scoring;
using NUnit.Framework;
using UnityEngine;

namespace ChickenHimOut.WorldGame.Tests.EditMode
{
    public sealed class MissionScoreTests
    {
        [Test]
        public void TotalSubtractsCollateralAndNeverDropsBelowZero()
        {
            var go = new GameObject("score-test");
            var score = go.AddComponent<MissionScore>();
            score.AddObjective(40);
            score.AddChaos(20);
            score.AddStyle(10);
            score.AddCollateral(90);

            Assert.That(score.Current.Total, Is.EqualTo(0));
            Object.DestroyImmediate(go);
        }

        [Test]
        public void ScoreDimensionsClampToOneHundred()
        {
            var go = new GameObject("score-test");
            var score = go.AddComponent<MissionScore>();
            score.AddStyle(150);

            Assert.That(score.Current.style, Is.EqualTo(100));
            Object.DestroyImmediate(go);
        }
    }
}
