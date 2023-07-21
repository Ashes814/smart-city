import React from "react";
import "./index.css";

export default function Panel({ header, content }) {
  return (
    <div className="g2-chart">
      <div className="g2-header">{header}</div>
      <div className="g2-content">{content}</div>
    </div>
  );
}
