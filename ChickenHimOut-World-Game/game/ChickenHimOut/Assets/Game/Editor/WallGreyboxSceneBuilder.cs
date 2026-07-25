#if UNITY_EDITOR
using System;
using System.IO;
using ChickenHimOut.Game.ChaosGraph;
using ChickenHimOut.Game.Character;
using ChickenHimOut.Game.Core;
using ChickenHimOut.Game.Interaction;
using ChickenHimOut.Game.Tie;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.SceneManagement;

namespace ChickenHimOut.Game.Editor
{
    public static class WallGreyboxSceneBuilder
    {
        private const string SceneDirectory = "Assets/Game/Scenes";
        private const string ScenePath = SceneDirectory + "/WallGreybox.unity";

        [MenuItem("ChickenHimOut/Build Wall Greybox Scene")]
        public static void BuildScene()
        {
            Directory.CreateDirectory(SceneDirectory);
            Scene scene = EditorSceneManager.NewScene(NewSceneSetup.EmptyScene, NewSceneMode.Single);

            CreateBootstrap();
            CreateLighting();
            Camera camera = CreateCamera();
            CreateGround();
            CreateWallShell();
            GameObject hero = CreateHero();
            CreateTacticalPositions(hero);
            CreatePanel();
            CreateCrane();
            CreateCounterweight();
            CreateTruck();
            CreateMissionSystems(camera, hero);

            EditorSceneManager.MarkSceneDirty(scene);
            EditorSceneManager.SaveScene(scene, ScenePath);
            AddSceneToBuildSettings(ScenePath);
            AssetDatabase.SaveAssets();
            AssetDatabase.Refresh();
            Debug.Log($"Wall greybox scene generated at {ScenePath}");
        }

        private static void CreateBootstrap()
        {
            var root = new GameObject("__BOOTSTRAP");
            root.AddComponent<GameBootstrap>();
        }

        private static void CreateLighting()
        {
            var lightObject = new GameObject("Directional Light");
            var light = lightObject.AddComponent<Light>();
            light.type = LightType.Directional;
            light.intensity = 1.25f;
            light.shadows = LightShadows.Soft;
            lightObject.transform.rotation = Quaternion.Euler(45f, -35f, 0f);
            RenderSettings.ambientMode = UnityEngine.Rendering.AmbientMode.Trilight;
            RenderSettings.ambientSkyColor = new Color(0.58f, 0.64f, 0.72f);
            RenderSettings.ambientEquatorColor = new Color(0.38f, 0.34f, 0.30f);
            RenderSettings.ambientGroundColor = new Color(0.16f, 0.13f, 0.11f);
        }

        private static Camera CreateCamera()
        {
            var cameraObject = new GameObject("Main Camera");
            cameraObject.tag = "MainCamera";
            var camera = cameraObject.AddComponent<Camera>();
            camera.fieldOfView = 42f;
            camera.nearClipPlane = 0.1f;
            camera.farClipPlane = 300f;
            cameraObject.transform.position = new Vector3(0f, 9.5f, -22f);
            cameraObject.transform.rotation = Quaternion.Euler(14f, 0f, 0f);
            return camera;
        }

        private static void CreateGround()
        {
            GameObject ground = GameObject.CreatePrimitive(PrimitiveType.Plane);
            ground.name = "Ground";
            ground.transform.localScale = new Vector3(5f, 1f, 3f);
        }

        private static void CreateWallShell()
        {
            CreateBlock("Wall_Left", new Vector3(-8f, 3f, 3f), new Vector3(10f, 6f, 1.2f), true);
            CreateBlock("Wall_Right", new Vector3(8f, 3f, 3f), new Vector3(10f, 6f, 1.2f), true);
        }

        private static GameObject CreateHero()
        {
            GameObject hero = GameObject.CreatePrimitive(PrimitiveType.Capsule);
            hero.name = "Hero_Greybox";
            hero.transform.position = new Vector3(-8f, 1f, -2f);
            hero.AddComponent<Rigidbody>().isKinematic = true;
            hero.AddComponent<TacticalPositionController>();
            return hero;
        }

        private static void CreateTacticalPositions(GameObject hero)
        {
            var root = new GameObject("TacticalPositions");
            CreatePosition(root.transform, "P0_PressStage", new Vector3(-8f, 0f, -2f));
            CreatePosition(root.transform, "P1_CranePlatform", new Vector3(-3f, 1.25f, 0f));
            CreatePosition(root.transform, "P2_WallBase", new Vector3(0f, 0f, 1.5f));
            CreatePosition(root.transform, "P3_Scaffold", new Vector3(6f, 4f, 0f));
        }

        private static void CreatePosition(Transform parent, string name, Vector3 position)
        {
            GameObject marker = CreateBlock(name, position, new Vector3(1.5f, 0.25f, 1.5f), false);
            marker.transform.SetParent(parent);
        }

        private static void CreatePanel()
        {
            GameObject panel = CreateBlock("FinalPanel", new Vector3(0f, 3f, 0f), new Vector3(5f, 6f, 0.8f), true);
            Rigidbody body = panel.AddComponent<Rigidbody>();
            body.mass = 1200f;
            body.constraints = RigidbodyConstraints.FreezePositionZ;
            AddAnchor(panel.transform, "Panel_UpperAnchor", new Vector3(0f, 2.6f, 0f));
            AddAnchor(panel.transform, "Panel_LowerAnchor", new Vector3(0f, -2.6f, 0f));
        }

        private static void CreateCrane()
        {
            CreateBlock("CraneBase", new Vector3(-5f, 2f, 1f), new Vector3(2f, 4f, 2f), true);
            GameObject boom = CreateBlock("CraneBoom", new Vector3(-2f, 7f, 1f), new Vector3(8f, 0.6f, 0.6f), true);
            boom.transform.rotation = Quaternion.Euler(0f, 0f, -18f);
            AddAnchor(boom.transform, "CraneHookAnchor", new Vector3(3.8f, -0.4f, 0f));
        }

        private static void CreateCounterweight()
        {
            GameObject counterweight = CreateBlock("Counterweight", new Vector3(-7f, 1f, 1f), new Vector3(2f, 2f, 2f), true);
            Rigidbody body = counterweight.AddComponent<Rigidbody>();
            body.mass = 1800f;
            body.constraints = RigidbodyConstraints.FreezePositionZ | RigidbodyConstraints.FreezeRotation;
            AddAnchor(counterweight.transform, "CounterweightAnchor", Vector3.zero);
        }

        private static void CreateTruck()
        {
            GameObject truck = CreateBlock("MoneyTruck", new Vector3(10f, 1f, 0f), new Vector3(4f, 2f, 2f), true);
            Rigidbody body = truck.AddComponent<Rigidbody>();
            body.mass = 2500f;
            body.constraints = RigidbodyConstraints.FreezePositionZ | RigidbodyConstraints.FreezeRotation;
            AddAnchor(truck.transform, "TruckTowAnchor", new Vector3(-2f, 0f, 0f));
        }

        private static void CreateMissionSystems(Camera camera, GameObject hero)
        {
            var systems = new GameObject("MissionSystems");
            systems.AddComponent<ChaosGraphRuntime>();
            var tie = systems.AddComponent<TieController>();
            var acquisition = systems.AddComponent<AnchorAcquisition>();

            var lineObject = new GameObject("TieLine");
            lineObject.transform.SetParent(systems.transform);
            var line = lineObject.AddComponent<LineRenderer>();
            line.positionCount = 2;
            line.startWidth = 0.18f;
            line.endWidth = 0.32f;
            line.useWorldSpace = true;

            Selection.activeGameObject = systems;
        }

        private static void AddAnchor(Transform parent, string name, Vector3 localPosition)
        {
            var anchorObject = new GameObject(name);
            anchorObject.transform.SetParent(parent);
            anchorObject.transform.localPosition = localPosition;
            var sphere = anchorObject.AddComponent<SphereCollider>();
            sphere.radius = 0.45f;
            sphere.isTrigger = true;
            anchorObject.AddComponent<InteractionAnchor>();
        }

        private static GameObject CreateBlock(string name, Vector3 position, Vector3 scale, bool collider)
        {
            GameObject block = GameObject.CreatePrimitive(PrimitiveType.Cube);
            block.name = name;
            block.transform.position = position;
            block.transform.localScale = scale;
            if (!collider)
            {
                UnityEngine.Object.DestroyImmediate(block.GetComponent<Collider>());
            }
            return block;
        }

        private static void AddSceneToBuildSettings(string scenePath)
        {
            var scenes = EditorBuildSettings.scenes;
            foreach (var scene in scenes)
            {
                if (string.Equals(scene.path, scenePath, StringComparison.OrdinalIgnoreCase))
                {
                    return;
                }
            }

            Array.Resize(ref scenes, scenes.Length + 1);
            scenes[^1] = new EditorBuildSettingsScene(scenePath, true);
            EditorBuildSettings.scenes = scenes;
        }
    }
}
#endif
