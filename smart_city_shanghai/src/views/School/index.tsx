import React, { useEffect, useContext } from "react";
import { ThreeLayer, ThreeRender } from "@antv/l7-three";
import { LayerPopup } from "@antv/l7";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import MapContext from "../../store/map-context";
import "./index.css";
const School = () => {
  const ctx = useContext(MapContext);
  const navigate = useNavigate();
  const { map, scene } = ctx;
  useEffect(() => {
    if (map && scene) {
      scene.registerRenderService(ThreeRender);
      const threeJSLayer = new ThreeLayer({
        name: "school",
        zIndex: 100,
        onAddMeshes: (threeScene: THREE.Scene, layer: ThreeLayer) => {
          const ambientLight = new THREE.AmbientLight(0xffffff, 1);
          threeScene.add(ambientLight);
          // 添加太阳光源
          const sunlight = new THREE.DirectionalLight(0xffffff, 2);
          sunlight.position.set(0, 0, 0); // 初始位置设置为原点，后续会使用极坐标来更新位置
          threeScene.add(sunlight);

          // 模拟太阳绕Z轴旋转的动画
          let angle = 0; // 初始角度
          const radius = 80000000; // 太阳绕Z轴旋转的半径
          const rotationSpeed = 0.002; // 太阳绕Z轴旋转的速度

          function updateSunPosition() {
            angle += rotationSpeed;
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);
            sunlight.position.set(x, y, 100000000);
          }

          // 每帧更新太阳位置
          function animate() {
            updateSunPosition();
            requestAnimationFrame(animate);
          }

          animate();
          // const sunlight = new THREE.DirectionalLight(0xffffff, 0.25);
          // sunlight.position.set(0, 80000000, 100000000);
          // sunlight.matrixWorldNeedsUpdate = true;
          // threeScene.add(sunlight);

          // 2、构建加载器
          const loader = new GLTFLoader();
          // 3、加载模型
          loader.load("src/assets/models/scene.gltf", (gltf) => {
            const model = gltf.scene;
            layer.adjustMeshToMap(model);
            layer.setMeshScale(model, 120, 120, 120);
            layer.setObjectLngLat(model, [114.17967, 22.30405], 0);
            model.rotateX(0.2);
            model.rotateZ(0.1);
            model.rotateY(3.8);
            // layer.adjustMeshToMap(model);
            model.add(ambientLight);
            threeScene.add(model);
          });
        },
      })
        .source([])
        .animate(true);
      const schoolLayerPop = new LayerPopup({
        items: [
          {
            layer: threeJSLayer,
            fields: [
              {
                field: "id",
                formatField: () => "香港理工大学",
                formatValue: () => "点击进入学生管理系统",
              },
            ],
          },
        ],
        trigger: "hover",
      });

      threeJSLayer.on("click", () => {
        // history.push("/school");
        navigate("/school");
      });

      // 4、添加 threejs 图层对象
      scene.addLayer(threeJSLayer);
      scene.addPopup(schoolLayerPop);
    }
  }, [map, scene]);

  return <div className="test"></div>;
};

export default School;
