using System;
using ChickenHimOut.WorldGame.Mission;
using ChickenHimOut.WorldGame.Scoring;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UIElements;

namespace ChickenHimOut.WorldGame.UI
{
    [RequireComponent(typeof(UIDocument))]
    public sealed class MissionResultPanel : MonoBehaviour
    {
        [SerializeField] private MissionPhaseController phases;
        [SerializeField] private MissionScore score;
        [SerializeField] private float retryDelaySeconds = 0.15f;

        private VisualElement root;
        private Label title;
        private Label summary;
        private Button retryButton;
        private bool visible;

        private void Awake()
        {
            root = GetComponent<UIDocument>().rootVisualElement;
            BuildInterface();
            Hide();
            if (phases != null) phases.PhaseChanged += HandlePhaseChanged;
        }

        private void OnDestroy()
        {
            if (phases != null) phases.PhaseChanged -= HandlePhaseChanged;
        }

        private void BuildInterface()
        {
            root.style.position = Position.Absolute;
            root.style.left = 0;
            root.style.right = 0;
            root.style.top = 0;
            root.style.bottom = 0;
            root.style.alignItems = Align.Center;
            root.style.justifyContent = Justify.Center;

            var card = new VisualElement { name = "result-card" };
            card.style.width = 520;
            card.style.paddingLeft = 28;
            card.style.paddingRight = 28;
            card.style.paddingTop = 24;
            card.style.paddingBottom = 24;
            card.style.backgroundColor = new Color(0.04f, 0.04f, 0.06f, 0.94f);
            card.style.borderTopLeftRadius = 20;
            card.style.borderTopRightRadius = 20;
            card.style.borderBottomLeftRadius = 20;
            card.style.borderBottomRightRadius = 20;

            title = new Label("РЕЗУЛЬТАТ");
            title.style.fontSize = 34;
            title.style.unityFontStyleAndWeight = FontStyle.Bold;
            title.style.marginBottom = 14;

            summary = new Label();
            summary.style.fontSize = 19;
            summary.style.whiteSpace = WhiteSpace.Normal;
            summary.style.marginBottom = 20;

            retryButton = new Button(Retry) { text = "ЕЩЁ РАЗ" };
            retryButton.style.height = 58;
            retryButton.style.fontSize = 22;
            retryButton.style.unityFontStyleAndWeight = FontStyle.Bold;

            card.Add(title);
            card.Add(summary);
            card.Add(retryButton);
            root.Add(card);
        }

        private void HandlePhaseChanged(MissionPhase previous, MissionPhase current)
        {
            if (current == MissionPhase.Result)
            {
                ShowSuccess();
            }
            else if (current == MissionPhase.Failed)
            {
                ShowFailure();
            }
        }

        private void ShowSuccess()
        {
            title.text = "ПОЛУЧИЛОСЬ. ПОЧТИ.";
            summary.text = score == null
                ? "Стена стоит, герой ушёл. Но последствия уже начались."
                : $"Цель: {score.Objective}\nХаос: {score.Chaos}\nСтиль: {score.Style}\nУщерб: {score.Collateral}";
            Show();
        }

        private void ShowFailure()
        {
            title.text = "ВСЁ ПОШЛО НЕ ТАК";
            summary.text = "Теперь ты уже знаешь, где сорвалась цепочка. Попробуй другим способом.";
            Show();
        }

        private void Show()
        {
            visible = true;
            root.style.display = DisplayStyle.Flex;
            retryButton.Focus();
        }

        private void Hide()
        {
            visible = false;
            root.style.display = DisplayStyle.None;
        }

        private async void Retry()
        {
            if (!visible) return;
            retryButton.SetEnabled(false);
            int milliseconds = Mathf.RoundToInt(retryDelaySeconds * 1000f);
            await System.Threading.Tasks.Task.Delay(milliseconds);
            SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex);
        }
    }
}