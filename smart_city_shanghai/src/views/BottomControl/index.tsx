import React, { useContext } from "react";
import MapContext from "../../store/map-context";
import "./index.css";
import { DrawTool } from "../../components/DrawTool";
import { MeasureTool } from "../../components/MeasureTool";

interface DarwToolType {
  drawPolygonTool?: null;
}
const drawTools: DarwToolType = {};
const BottomControl: React.FC = () => {
  const { map } = useContext(MapContext);

  // Map Recover Button
  const viewRecover = () => {
    if (map) {
      map.flyTo({
        center: [114.3, 30.5],
        zoom: 1,
        pitch: 0,
      });
    } else {
      return;
    }
  };

  // FLY TO WUHAN
  const fylTo = () => {
    if (map) {
      map.flyTo({
        center: [114.3, 30.5],
        zoom: 9,
      });
    } else {
      return;
    }
  };

  // FLY TO SHANGHAI
  const fylToSh = () => {
    if (map) {
      map.flyTo({
        center: [121.42, 31.3],
        zoom: 9,
      });
    } else {
      return;
    }
  };

  // FLY TO SCHOOL
  const fylToSc = () => {
    if (map) {
      map.flyTo({
        center: [114.17967, 22.30405],
        zoom: 17,
        pitch: 70,
      });
    } else {
      return;
    }
  };

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
