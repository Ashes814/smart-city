import React from "react";
import "./index.css";
const Focus: React.FC = () => {
  return (
    <div className="focus">
      <h2>
        <strong>重点关注</strong>
        <img src="src/assets/images/logoline.png" className="logoline"></img>
        <img src="src/assets/images/logoline1.png" className="logoline1"></img>
        <img src="src/assets/images/logoline2.png" className="logoline2"></img>
        <img src="src/assets/images/logoline3.png" className="logoline3"></img>
      </h2>
      <div className="date-timer">
        <p>
          <strong id="H">20</strong>
          <strong>:</strong>
          <strong id="M">00</strong>
        </p>
        <em>星期一</em>
        <em>2023年7月25日</em>
      </div>
    </div>
  );
};

export default Focus;
