import React from "react";
import { Popover, Button } from "antd";
import "./index.css";

export const DrawTool = () => {
  const tools = ["drawPolygonTool", "drawRectTool", "drawCircleTool", "delete"];
  const content = (
    <div className="popover-w">
      {tools.map((tool, index) => {
        return (
          <i className={`iconfont query-item icon-${tool}`} key={index}></i>
        );
      })}
    </div>
  );
  const popperStyle = {
    backgroundColor: "#53697670",
    color: "#fff",
    width: 150,
    border: "1px solid #fff",
  };
  return (
    <Popover
      content={content}
      title=""
      placement="top"
      trigger="click"
      overlayInnerStyle={popperStyle}
    >
      {/* <Button type="primary">Hover Me</Button> */}
      <button className="btn-toggle">
        <i className="iconfont icon-paint"></i>
      </button>
    </Popover>
  );
};
