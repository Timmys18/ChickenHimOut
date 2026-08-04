using ChickenHimOut.WorldGame.Guidance;
using ChickenHimOut.WorldGame.Mission;
using ChickenHimOut.WorldGame.Scoring;
using UnityEngine;
using UnityEngine.SceneManagement;

namespace ChickenHimOut.WorldGame.UI
{
    public sealed class PrototypeOverlay : MonoBehaviour
    {
        [SerializeField] private MissionPhaseController phases;
        [SerializeField] private MissionScore score;
        [SerializeField] private ContextHintDirector hints;

        private string hintText;
        private bool hintVisible;
        private GUIStyle titleStyle;
        private GUIStyle textStyle;
        private GUIStyle buttonStyle;

        public void Configure(MissionPhaseController phaseController, MissionScore missionScore, ContextHintDirector hintDirector)
        {
            if (hints != null) hints.HintChanged -= HandleHint;
            phases = phaseController;
            score = missionScore;
            hints = hintDirector;
            if (isActiveAndEnabled && hints != null) hints.HintChanged += HandleHint;
        }

        private void OnEnable()
        {
            if (hints != null) hints.HintChanged += HandleHint;
        }

        private void OnDisable()
        {
            if (hints != null) hints.HintChanged -= HandleHint;
        }

        private void HandleHint(string text, bool visible)
        {
            hintText = text;
            hintVisible = visible;
        }

        private void EnsureStyles()
        {
            titleStyle ??= new GUIStyle(GUI.skin.label) { fontSize = 30, fontStyle = FontStyle.Bold, alignment = TextAnchor.MiddleCenter };
            textStyle ??= new GUIStyle(GUI.skin.label) { fontSize = 20, alignment = TextAnchor.MiddleCenter, wordWrap = true };
            buttonStyle ??= new GUIStyle(GUI.skin.button) { fontSize = 22, fontStyle = FontStyle.Bold };
        }

        private void OnGUI()
        {
            EnsureStyles();
            float width = Mathf.Min(Screen.width * 0.82f, 720f);
            float left = (Screen.width - width) * 0.5f;

            if (hintVisible)
            {
                GUI.Box(new Rect(left, 28f, width, 72f), string.Empty);
                GUI.Label(new Rect(left + 20f, 36f, width - 40f, 56f), hintText, textStyle);
            }

            if (phases == null || (phases.Current != MissionPhase.Result && phases.Current != MissionPhase.Failed)) return;

            bool won = phases.Current == MissionPhase.Result;
            var current = score != null ? score.Current : default;
            float panelHeight = 360f;
            float top = (Screen.height - panelHeight) * 0.5f;

            GUI.Box(new Rect(left, top, width, panelHeight), string.Empty);
            GUI.Label(new Rect(left + 20f, top + 24f, width - 40f, 48f), won ? "УСПЕЛ СБЕЖАТЬ" : "ВСЁ РУХНУЛО РАНЬШЕ", titleStyle);
            GUI.Label(new Rect(left + 30f, top + 88f, width - 60f, 150f),
                $"Цель: {current.objective}\nХаос: {current.chaos}\nСтиль: {current.style}\nУщерб: {current.collateral}\nИтог: {current.Total}", textStyle);

            if (GUI.Button(new Rect(left + 70f, top + 258f, width - 140f, 68f), "ЕЩЁ РАЗ", buttonStyle))
                SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex);
        }
    }
}
