using System;
using System.IO;
using UnityEditor;
using UnityEngine;

namespace ChickenHimOut.WorldGame.Editor
{
    public static class CompileReadinessValidator
    {
        private const string RequiredVersion = "6000.5.4f1";

        [MenuItem("ChickenHimOut/Validate/Compile Readiness")]
        public static void ValidateMenu() => ValidateOrThrow();

        public static void ValidateOrThrow()
        {
            var projectRoot = Directory.GetParent(Application.dataPath)?.FullName
                ?? throw new InvalidOperationException("Unable to resolve Unity project root.");

            RequireFile(projectRoot, "ProjectSettings/ProjectVersion.txt");
            RequireFile(projectRoot, "Packages/manifest.json");
            RequireFile(projectRoot, "Assets/Game/ChickenHimOut.Game.asmdef");
            RequireFile(projectRoot, "Assets/Game/Editor/WallGreyboxSceneBuilder.cs");
            RequireFile(projectRoot, "Assets/Game/Editor/PrototypeBuildPipeline.cs");

            var version = File.ReadAllText(Path.Combine(projectRoot, "ProjectSettings/ProjectVersion.txt"));
            if (!version.Contains(RequiredVersion, StringComparison.Ordinal))
                throw new BuildFailedException($"Expected Unity {RequiredVersion}.");

            var manifest = File.ReadAllText(Path.Combine(projectRoot, "Packages/manifest.json"));
            RequirePackage(manifest, "com.unity.inputsystem");
            RequirePackage(manifest, "com.unity.cinemachine");
            RequirePackage(manifest, "com.unity.render-pipelines.universal");
            RequirePackage(manifest, "com.unity.test-framework");

            if (Directory.Exists(Path.Combine(projectRoot, "..", "..", "Assets", "ChickenHimOut")))
                throw new BuildFailedException("Legacy duplicate Assets/ChickenHimOut tree still exists outside canonical Unity root.");

            Debug.Log("ChickenHimOut compile-readiness validation passed.");
        }

        private static void RequireFile(string root, string relative)
        {
            if (!File.Exists(Path.Combine(root, relative)))
                throw new BuildFailedException($"Missing required file: {relative}");
        }

        private static void RequirePackage(string manifest, string package)
        {
            if (!manifest.Contains($"\"{package}\"", StringComparison.Ordinal))
                throw new BuildFailedException($"Missing required Unity package: {package}");
        }
    }
}
