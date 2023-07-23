import React, { useContext, useEffect, useState } from "react";
import MapContext from "../../store/map-context";
import axios from "axios";
import {
  CityBuildingLayer,
  LayerSwitch,
  LineLayer,
  PolygonLayer,
} from "@antv/l7";
export default function SmartCity() {
  const ctx = useContext(MapContext);
  const { map, scene } = ctx;
  const [buildData, setBuildData] = useState(null);
  const [roadData, setRoadData] = useState(null);
  const [shAreaData, setShAreaData] = useState(null);
  const [layerSwitchAdded, setLayerSwitchAdded] = useState(false);
  const [roadLayerAdded, setRoadLayerAdded] = useState(false);
  const [cityLayerAdded, setCityLayerAdded] = useState(false);
  const [shAreaLayerAdded, setShAreaLayerAdded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const buildRes = await axios("http://localhost:8080/wuhan_building");
        const buildRes = await axios(
          "http://localhost:8080/geoserver/sh/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=sh%3AWuhan_Buildings&outputFormat=application%2Fjson"
        );
        setBuildData(buildRes.data);
        const roadRes = await axios(
          "http://localhost:8080/geoserver/sh/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=sh%3AWuhan_roads&outputFormat=application%2Fjson"
        );
        setRoadData(roadRes.data);
        const shAreaRes = await axios(
          "http://localhost:8080/geoserver/sh/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=sh%3Ash_area&outputFormat=application%2Fjson"
        );
        setShAreaData(shAreaRes.data);

        console.log("建筑数据加载成功");
        console.log("道路数据加载成功");
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (map && scene) {
      // add wuhan citylayer
      const cityLayer = new CityBuildingLayer({
        name: "武汉市建筑",
      });
      cityLayer
        .source(buildData)
        .size("Elevation", (h) => h)
        .color("rgb(242, 246, 250)")
        .animate({
          enable: true,
        })
        .active({
          color: "#0ff",
          mix: 0.5,
        })
        .style({
          opacity: 0.7,
          baseColor: "rgb(16,16,16)",
          windowColor: "rgb(30,30,30)",
          brightColor: "rgb(255, 176, 38)",
          sweep: {
            enable: true,
            sweepRadius: 2,
            sweepColor: "#1990fF",
            sweepSpeed: 0.3,
            sweepCenter: [114.3, 30.5],
          },
        })
        .filter("Elevation", (h) => h > 10);
      if (!cityLayerAdded && buildData) {
        console.log("cityLayer added");

        scene.addLayer(cityLayer);

        setCityLayerAdded(true);
      }

      // add wuhan road layer
      const colors = [
        "#87CEFA",
        "#00BFFF",
        "#7FFFAA",
        "#00FF7F",
        "#32CD32",
        "#F0E68C",
        "#FFD700",
        "#FF7F50",
        "#FF6347",
        "#FF0000",
        "#FF2D51",
        "#333",
      ];
      const roadLayer = new LineLayer({
        name: "武汉市道路",
      });
      roadLayer
        .source(roadData)
        .size(1)
        .shape("line")
        .color("name", colors)
        .animate({
          interval: 1,
          duration: 2,
          trailLength: 2,
        })
        .active({
          color: "#0ff",
          mix: 0.5,
        })
        .filter("coordinates", (evt) => evt.length > 5);

      if (!roadLayerAdded && roadData) {
        console.log("roadLayer added");
        scene.addLayer(roadLayer);
        setRoadLayerAdded(true);
      }

      // add shanghai layer control
      const shAreaLayer = new PolygonLayer({
        name: "上海市行政边界",
      });
      shAreaLayer
        .source(shAreaData)
        .shape("fill")
        .color("#f00")
        .style({ opacity: 0.6 });
      if (!shAreaLayerAdded && shAreaData) {
        console.log("shAreaLayer added");
        scene.addLayer(shAreaLayer);
        setShAreaLayerAdded(true);
      }
      // add layer control

      if (!layerSwitchAdded && roadLayerAdded && cityLayerAdded) {
        const layerSwitch = new LayerSwitch({
          layers: [],
        });

        scene.addControl(layerSwitch);
        setLayerSwitchAdded(true);
      }
    }
  }, [buildData, roadData, shAreaData]);

  return <div></div>;
}
