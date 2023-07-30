import React, { useContext, useState, useEffect } from "react";
import { Popover } from "antd";
import { DrawPolygon, DrawRect, DrawCircle, DrawEvent } from "@antv/l7-draw";
import { point, polygon, booleanPointInPolygon } from "@turf/turf";
import axios from "axios";
import MapContext from "../../store/map-context";
import "./index.css";
import DisplayCard from "../DisplayCard";

export const DrawTool = ({ drawTools }) => {
  const tools = ["drawPolygonTool", "drawRectTool", "drawCircleTool", "delete"];
  const { scene } = useContext(MapContext);
  const [dataSource, setDataSource] = useState(null);
  const [dataOk, setDataOk] = useState(false);
  const [eventData, setEventData] = useState(null);
  const popperStyle = {
    backgroundColor: "#53697670",
    color: "#fff",
    width: 150,
    border: "1px solid #fff",
  };

  const initDrawTool = () => {
    tools.forEach((tool) => {
      switch (tool) {
        case "drawPolygonTool":
          drawTools[tool] = new DrawPolygon(scene, {
            name: "POLYGON",
            editable: true,
          });

          break;
        case "drawRectTool":
          drawTools[tool] = new DrawRect(scene, {
            name: "RECT",
            editable: true,
          });
          break;
        case "drawCircleTool":
          drawTools[tool] = new DrawCircle(scene, {
            name: "CIRCLE",
            editable: true,
          });
          break;
        // case "delete":
        //   // 执行删除逻辑

        //   break;
        default:
          break;
      }
    });
  };
  const getData = async () => {
    const data = await axios.get(
      "http://localhost:8080/geoserver/sh/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=sh%3Awuhan_events&outputFormat=application%2Fjson"
    );
    setDataSource(data.data);
  };
  useEffect(() => {
    if (!dataOk) {
      getData();
      setDataOk(true);
    }
  }, [dataSource]);

  useEffect(() => {
    if (scene && dataSource) {
      initDrawTool();
    }
  }, [scene, dataSource]);

  // 清除之前绘制的
  const stopDrawing = () => {
    for (let key in drawTools) {
      const tool = drawTools[key];
      // clear清除绘制结果
      tool.clear();
      tool.disable();
      tool.removeActiveFeature();
    }
  };

  // const features = [];
  const query = (type) => {
    // 每次将上一次的绘制结果清除
    stopDrawing();
    initDrawTool();
    console.log("into fanwei celiang");

    // 如果为删除，直接退出
    if (type === "delete") {
      // stopDrawing();
      console.log("delete");
      setEventData(null);
      return;
    }

    const drawTool = drawTools[type];

    if (drawTool) {
      drawTool.enable();
      drawTool.on(DrawEvent.Change, (allFeatures) => {
        allFeatures.forEach((feature, index) => {
          if (index !== allFeatures.length - 1) {
            drawTool.removeFeature(feature);
          }

          if (index === allFeatures.length - 1) {
            const {
              geometry: { coordinates },
            } = feature;
            const polygonArea = polygon(coordinates);

            const resData = dataSource.features.filter((item) => {
              const {
                geometry: { coordinates },
              } = item;
              const pointTurf = point(coordinates);
              const isInArea = booleanPointInPolygon(pointTurf, polygonArea);
              return isInArea;
            });

            setEventData(resData);
          }
        });
      });
    }
  };

  const content = (
    <div className="popover-w">
      {tools.map((tool, index) => {
        return (
          <i
            className={`iconfont query-item icon-${tool}`}
            key={index}
            onClick={() => query(tool)}
          ></i>
        );
      })}
    </div>
  );
  return (
    <>
      <Popover
        content={content}
        title=""
        placement="top"
        trigger="click"
        overlayInnerStyle={popperStyle}
      >
        <div className="item">
          <button className="btn-toggle">
            <i className="iconfont icon-paint"></i>
          </button>
          <p>事故查询</p>
        </div>
      </Popover>

      <DisplayCard eventData={eventData} />
    </>
  );
};
