#if UNITY_EDITOR
using System;
using System.Collections.Generic;
using System.IO;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;

namespace ChickenHimOut.WorldGame.Editor
{
    public static class ProjectIntegrityValidator
    {
        private static readonly string[] ForbiddenRelativeRoots =
        {
            "../../Assets/ChickenHimOut",
            "../../.github"
        };

        [MenuItem("ChickenHimOut/Validate/Project Integrity")]
        public static void ValidateFromMenu() => ValidateOrThrow();

        public static void ValidateOrThrow()
        {
            var errors = new List<string>();
            var projectRoot = Directory.GetParent(Application.dataPath)?.FullName;
            if (string.IsNullOrEmpty(projectRoot)) throw new InvalidOperationException("Cannot resolve Unity project root.");

            var versionPath = Path.Combine(projectRoot, "ProjectSettings", "ProjectVersion.txt");
            if (!File.Exists(versionPath) || !File.ReadAllText(versionPath).Contains("6000.5.4f1"))
                errors.Add("Unity editor version is not pinned to 6000.5.4f1.");

            foreach (var relative in ForbiddenRelativeRoots)
            {
                var path = Path.GetFullPath(Path.Combine(projectRoot, relative));
                if (Directory.Exists(path))
                    errors.Add($"Forbidden parallel project tree exists: {path}");
            }

            var requiredTypes = new[]
            {
                "ChickenHimOut.WorldGame.Core.GameBootstrap",
                "ChickenHimOut.WorldGame.Mission.MissionPhaseController",
                "ChickenHimOut.WorldGame.Mission.WallMissionOrchestrator",
                "ChickenHimOut.WorldGame.Wall.WallPanelSystem",
                "ChickenHimOut.WorldGame.Tie.TieController"
            };

            foreach (var typeName in requiredTypes)
                if (FindType(typeName) == null) errors.Add($"Required runtime type missing: {typeName}");

            if (errors.Count > 0)
                throw new BuildFailedException("ChickenHimOut integrity validation failed:\n- " + string.Join("\n- ", errors));

            Debug.Log("ChickenHimOut project integrity validation passed.");
        }

        public static void ValidateOpenSceneOrThrow()
        {
            var scene = EditorSceneManager.GetActiveScene();
            if (!scene.IsValid() || !scene.isLoaded) throw new BuildFailedException("No valid scene is open.");

            var requiredObjects = new[] { "GameBootstrap", "MissionRuntime", "Hero", "FinalPanel", "Crane", "MoneyTruck" };
            var missing = new List<string>();
            foreach (var objectName in requiredObjects)
                if (GameObject.Find(objectName) == null) missing.Add(objectName);

            if (missing.Count > 0)
                throw new BuildFailedException("Greybox scene is incomplete. Missing: " + string.Join(", ", missing));
        }

        private static Type FindType(string fullName)
        {
            foreach (var assembly in AppDomain.CurrentDomain.GetAssemblies())
            {
                var type = assembly.GetType(fullName, false);
                if (type != null) return type;
            }
            return null;
        }
    }
}
#endif
