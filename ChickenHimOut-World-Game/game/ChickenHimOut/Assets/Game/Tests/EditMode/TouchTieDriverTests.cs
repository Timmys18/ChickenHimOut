using ChickenHimOut.Interaction;
using ChickenHimOut.Tie;
using NUnit.Framework;
using UnityEngine;

namespace ChickenHimOut.WorldGame.Tests
{
    public sealed class TouchTieDriverTests
    {
        [Test]
        public void TieController_AttachAndRelease_ReturnsToIdle()
        {
            var root = new GameObject("TieTestRoot");
            var origin = new GameObject("Origin").transform;
            origin.SetParent(root.transform);
            var anchorObject = new GameObject("Anchor");
            anchorObject.transform.SetParent(root.transform);
            var anchor = anchorObject.AddComponent<InteractionAnchor>();
            var tie = root.AddComponent<TieController>();

            tie.BeginPreview(anchor);
            tie.CommitAttach();
            Assert.That(tie.State, Is.EqualTo(TieState.Attached));
            Assert.That(tie.Target, Is.EqualTo(anchor));

            tie.ReleaseTie();
            Assert.That(tie.State, Is.EqualTo(TieState.Idle));
            Assert.That(tie.Target, Is.Null);

            Object.DestroyImmediate(root);
        }
    }
}