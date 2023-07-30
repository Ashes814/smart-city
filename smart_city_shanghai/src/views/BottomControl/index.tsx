import React, { useState, useContext, useEffect } from "react";
import MapContext from "../../store/map-context";
import "./index.css";
import Footer from "../../components/Footer";
import { DrawTool } from "../../components/DrawTool";
import { fa } from "element-plus/es/locale/index.js";
import { MeasureTool } from "../../components/MeasureTool";

const drawTools = {};
const BottomControl = ({ showControlHandler }) => {
  const ctx = useContext(MapContext);
  const { map, scene } = ctx;
  //   const [isStartRotate, setIsStartRotate] = useState(false);
  const [isRotate, setIsRotate] = useState(false);
  const [isOtherDraw, setIsOtherDraw] = useState(false);
  // const [isShowControl, setIsShowControl] = useState(true);
  // const [isInWuhan, setIsInWuhan] = useState(false);

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
  // const controlCenterHandler = () => {
  //   showControlHandler(!isShowControl);
  //   setIsShowControl(!isShowControl);
  // };
  const viewRecover = () => {
    map.flyTo({
      center: [114.3, 30.5],
      zoom: 1,
      pitch: 0,
    });
  };
  const fylTo = () => {
    map.flyTo({
      center: [114.3, 30.5],
      zoom: 9,
    });
  };
  const fylToSh = () => {
    map.flyTo({
      center: [121.42, 31.3],
      zoom: 9,
    });
  };
  const fylToSc = () => {
    map.flyTo({
      center: [114.17967, 22.30405],
      zoom: 17,
      pitch: 70,
    });
  };
  // useEffect(() => {
  //   const moveendListener = () => {
  //     isRotate && rotateEarth();
  //   };

  //   if (map) {
  //     isRotate && rotateEarth();
  //     map.on("moveend", moveendListener);
  //   }
  //   return () => {
  //     if (map) {
  //       map.off("moveend", moveendListener);
  //     }
  //   };
  // }, [map, isRotate]);
  return (
    <div>
      <div className="btn-groups">
        <div className="item" onClick={viewRecover}>
          <button className="btn-toggle">
            <i className="iconfont icon-supervision-full"></i>
          </button>
          <p>{"地图复位"}</p>
        </div>
        <div className="item" onClick={fylToSc}>
          <button className="btn-toggle">
            <i className="iconfont icon-fuwudiqiu"></i>
          </button>
          <p>{"智慧校园"}</p>
        </div>

        <div className="item" onClick={fylTo}>
          <button className="btn-toggle">
            <i className="iconfont icon-icon-test"></i>
          </button>
          <p>{"飞入武汉"}</p>
        </div>
        <div className="item" onClick={fylToSh}>
          <button className="btn-toggle">
            <i className="iconfont icon-icon-test"></i>
          </button>
          <p>{"飞入上海"}</p>
        </div>

        <DrawTool drawTools={drawTools} />
        <MeasureTool drawTools={drawTools} />
      </div>
    </div>
  );
};

export default BottomControl;
