import React from "react";
import Panel from "./Panel";
import { ChordChart, GaugeChart } from "@opd/g2plot-react";

import "./index.css";

export default function G2Chart() {
  const wuhanData = [
    { source: "洪山", target: "武昌", value: 30 },
    { source: "洪山", target: "江岸", value: 80 },
    { source: "洪山", target: "江夏", value: 46 },
    { source: "洪山", target: "汉阳", value: 49 },
    { source: "洪山", target: "江夏", value: 69 },
    { source: "武昌", target: "江夏", value: 62 },
    { source: "武昌", target: "汉阳", value: 82 },
    { source: "武昌", target: "江岸", value: 16 },
    { source: "江岸", target: "江夏", value: 16 },
    { source: "江夏", target: "汉阳", value: 76 },
    { source: "江夏", target: "洪山", value: 32 },
  ];
  const configChord = {
    data: wuhanData,
    sourceField: "source",
    targetField: "target",
    weightField: "value",
    width: 200,
    height: 285,
  };
  const configGauge = {
    width: 200,
    height: 270,
    percent: 0.37,
    range: {
      ticks: [0, 1 / 4, 1 / 2, 3 / 4, 1],
      color: ["#30BF78", "#FAAD14", "#F4664A", "#000"],
    },
    startAngle: -Math.PI,
    endAngle: 0,
    gaugeStyle: {
      // 因为圆角是借助重叠去实现的，所以建议填充色不要有透明度
      fillOpacity: 1,
      lineCap: "round",
      stroke: "#fff",
      lineWidth: 3,
    },
    appendPadding: [0, 0, 80, 0],
    statistic: {
      content: {
        offsetY: 50,
        customHtml: () => {
          return `
          <div>
          <span>拥挤</span>
          </div>
        `;
        },
        style: {
          fontSize: "26px",
          lineHeight: "26px",
          color: "#FAAD14",
        },
      },
    },
    // Add more customization options as needed
  };

  return (
    <>
      <div className="g2-left">
        <Panel
          header={"武汉各区救护车跨区调度车次"}
          content={<ChordChart {...configChord} />}
        />
        <Panel
          header={"上海市地铁客流压力指数"}
          content={<GaugeChart {...configGauge} />}
        />
      </div>

      {/* <div className="g2-right">
        <Panel
          header={"武汉三镇人口统计"}
          content={
            <PieChart {...peopleStatisticConfig} data={peopleStatisticData} />
          }
        />
        <Panel
          header={"武汉三甲医院"}
          content={
            <div className="hospital">
              {hospital.map((h, index) => {
                return (
                  <div className={"item"} key={index}>
                    <p>
                      {h.title}
                      <span>
                        {h.num}
                        {h.unit}
                      </span>
                    </p>
                    <img
                      src={h.url}
                      alt="pic"
                      style={{
                        marginTop: "10px",
                        width: "50px",
                        height: "50px",
                      }}
                    />
                  </div>
                );
              })}
            </div>
          }
        />
        <Panel
          header={"武汉市高校学生统计"}
          content={
            <div className="school">
              {school.map((s, index) => {
                return (
                  <div className={"item"} key={index}>
                    <p>
                      {s.title}
                      <span>
                        {s.num}
                        {s.unit}
                      </span>
                    </p>
                    <img
                      src={s.url}
                      alt="pic"
                      style={{
                        marginTop: "10px",
                        width: "50px",
                        height: "50px",
                      }}
                    />
                  </div>
                );
              })}
            </div>
          }
        />
      </div> */}
    </>
  );
}
