import React, { useState, useContext, useEffect } from "react";
import MapContext from "../../store/map-context";
import "./index.css";
import Footer from "../../components/Footer";
import { DrawTool } from "../../components/DrawTool";
import { fa } from "element-plus/es/locale/index.js";

const BottomControl = ({ showControlHandler }) => {
  const ctx = useContext(MapContext);
  const { map, scene } = ctx;
  //   const [isStartRotate, setIsStartRotate] = useState(false);
  const [isRotate, setIsRotate] = useState(false);
  const [isShowControl, setIsShowControl] = useState(false);
  const [isInWuhan, setIsInWuhan] = useState(false);

  const rotateEarth = () => {
    const zoom = map.getZoom();

    if (zoom < 5) {
      let center = map.getCenter();
      center.lng -= 10;
      map.easeTo({ center, duration: 1000, easing: (n) => n });
    }
  };
  const rotateHandler = () => {
    if (!isRotate) {
      rotateEarth();
    } else {
      map.stop();
    }
    setIsRotate(!isRotate);
  };
  const controlCenterHandler = () => {
    showControlHandler(!isShowControl);
    setIsShowControl(!isShowControl);
  };

  const fylTo = () => {
    if (!isInWuhan) {
      map.flyTo({
        center: [114.3, 30.5],
        zoom: 1,
      });
    } else {
      map.flyTo({
        center: [114.3, 30.5],
        zoom: 13,
      });
    }
    setIsInWuhan(!isInWuhan);
  };
  const fylToSh = () => {
    map.flyTo({
      center: [121.3, 31.0],
      zoom: 13,
    });
  };

  useEffect(() => {
    const moveendListener = () => {
      isRotate && rotateEarth();
    };

    if (map) {
      isRotate && rotateEarth();
      map.on("moveend", moveendListener);
    }
    return () => {
      if (map) {
        map.off("moveend", moveendListener);
      }
    };
  }, [map, isRotate]);
  return (
    <div>
      <div className="btn-groups">
        <div className="item" onClick={rotateHandler}>
          <button className="btn-toggle">
            <i className="iconfont icon-fuwudiqiu"></i>
          </button>
          <p>{isRotate ? "停止自转" : "开始自转"}</p>
        </div>
        <div className="item" onClick={controlCenterHandler}>
          <button className="btn-toggle">
            <i className="iconfont icon-supervision-full"></i>
          </button>
          <p>{"控制中心"}</p>
        </div>
        <div className="item" onClick={fylTo}>
          <button className="btn-toggle">
            <i className="iconfont icon-icon-test"></i>
          </button>
          <p>{isInWuhan ? "飞入武汉" : "地图复位"}</p>
        </div>
        <div className="item" onClick={fylToSh}>
          <button className="btn-toggle">
            <i className="iconfont icon-icon-test"></i>
          </button>
          <p>{"飞入上海"}</p>
        </div>

        <DrawTool />
      </div>
    </div>
  );
};

export default BottomControl;
