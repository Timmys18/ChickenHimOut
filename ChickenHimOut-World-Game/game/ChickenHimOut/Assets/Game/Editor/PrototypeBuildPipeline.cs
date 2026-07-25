#if UNITY_EDITOR
using System;
using System.IO;
using UnityEditor;
using UnityEditor.Build.Reporting;
using UnityEngine;

namespace ChickenHimOut.Game.Editor
{
    public static class PrototypeBuildPipeline
    {
        private const string ScenePath = "Assets/Game/Scenes/WallGreybox.unity";

        [MenuItem("ChickenHimOut/Build/Android Development APK")]
        public static void BuildAndroidFromMenu() => BuildAndroid();

        [MenuItem("ChickenHimOut/Build/Windows Development")]
        public static void BuildWindowsFromMenu() => BuildWindows();

        public static void BuildAndroid()
        {
            EnsureScene();
            Directory.CreateDirectory("Builds/Android");
            EditorUserBuildSettings.development = true;
            EditorUserBuildSettings.connectProfiler = false;
            EditorUserBuildSettings.buildAppBundle = false;

            var options = new BuildPlayerOptions
            {
                scenes = new[] { ScenePath },
                locationPathName = "Builds/Android/ChickenHimOut-Prototype.apk",
                target = BuildTarget.Android,
                options = BuildOptions.Development | BuildOptions.AllowDebugging
            };

            BuildAndFailOnError(options);
        }

        public static void BuildWindows()
        {
            EnsureScene();
            Directory.CreateDirectory("Builds/Windows");
            var options = new BuildPlayerOptions
            {
                scenes = new[] { ScenePath },
                locationPathName = "Builds/Windows/ChickenHimOut-Prototype.exe",
                target = BuildTarget.StandaloneWindows64,
                options = BuildOptions.Development | BuildOptions.AllowDebugging
            };

            BuildAndFailOnError(options);
        }

        private static void EnsureScene()
        {
            if (!File.Exists(ScenePath))
            {
                WallGreyboxSceneBuilder.BuildScene();
            }
        }

        private static void BuildAndFailOnError(BuildPlayerOptions options)
        {
            BuildReport report = BuildPipeline.BuildPlayer(options);
            BuildSummary summary = report.summary;
            Debug.Log($"Build result={summary.result}, size={summary.totalSize}, time={summary.totalTime}");

            if (summary.result != BuildResult.Succeeded)
            {
                throw new InvalidOperationException($"Prototype build failed: {summary.result} with {summary.totalErrors} errors.");
            }
        }
    }
}
#endif
