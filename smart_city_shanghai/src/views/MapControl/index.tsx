import React, { useContext, useEffect, useState } from "react";
import MapContext from "../../store/map-context";
import {
  Logo,
  Zoom,
  Fullscreen,
  MouseLocation,
  MapTheme,
  LayerSwitch,
} from "@antv/l7";

export default function MapControl() {
  const ctx = useContext(MapContext);
  const { map, scene } = ctx;
  const [controlAdded, setControlAdded] = useState(false);

  useEffect(() => {
    if (map && scene && !controlAdded) {
      const logo = new Logo({
        position: "lefttop",
        // 图片 url
        img: "https://img.gejiba.com/images/dfdb6db1623eb881e724f58d9a366af8.png",
        // 跳转地址
        href: "https://zhangouwen.netlify.app/",
      });
      scene.addControl(logo);
      const zoom = new Zoom({
        zoomInTitle: "放大",
        zoomOutTitle: "缩小",
        position: "bottomright",
      });
      scene.addControl(zoom);

      const fullscreen = new Fullscreen({
        btnText: "全屏",
        exitBtnText: "退出全屏",
      });
      scene.addControl(fullscreen);
      const mouseLocation = new MouseLocation({
        transform: (position) => {
          return position;
        },
        position: "leftbottom",
      });
      scene.addControl(mouseLocation);
      const mapTheme = new MapTheme({});
      scene.addControl(mapTheme);
      setControlAdded(true);
    }
  }, [map, scene]);

  return <div></div>;
}
