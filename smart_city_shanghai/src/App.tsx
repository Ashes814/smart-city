import { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapContext from "./store/map-context";
import { Scene, Mapbox } from "@antv/l7";
import Header from "./components/Header";

import "./App.css";
import HomeView from "./views/HomeView";

function App() {
  const [map, setMap] = useState(null);
  const [scene, setScene] = useState(null);
  useEffect(() => {
    const token = import.meta.env.VITE_TOKEN;
    mapboxgl.accessToken = token;
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/dark-v11",
      center: [114.3, 30.5],
      zoom: 13,
      projection: "globe",
      pitch: 70,
    });

    const scene = new Scene({
      id: "map",
      map: new Mapbox({
        mapInstance: map,
      }),
      logoVisible: false,
    });

    map.on("style.load", () => {
      map.setFog({});
      // 中华疆土，一寸不让
      map.setFilter("admin-0-boundary-disputed", [
        "all",
        ["==", ["get", "disputed"], "true"],
        ["==", ["get", "admin_level"], 0],
        ["==", ["get", "maritime"], "false"],
        ["match", ["get", "worldview"], ["all", "CN"], true, false],
      ]);
      map.setFilter("admin-0-boundary", [
        "all",
        ["==", ["get", "admin_level"], 0],
        ["==", ["get", "disputed"], "false"],
        ["==", ["get", "maritime"], "false"],
        ["match", ["get", "worldview"], ["all", "CN"], true, false],
      ]);
      map.setFilter("admin-0-boundary-bg", [
        "all",
        ["==", ["get", "admin_level"], 0],
        ["==", ["get", "maritime"], "false"],
        ["match", ["get", "worldview"], ["all", "CN"], true, false],
      ]);
    });
    setMap(map);
    setScene(scene);
  }, []);
  return (
    <MapContext.Provider value={{ map, scene }}>
      {/* <button id="fly">飞到武汉</button> */}
      <HomeView />
      <div id="map"></div>
    </MapContext.Provider>
  );
}

export default App;
