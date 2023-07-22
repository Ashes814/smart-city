import React from "react";
import Panel from "./Panel";
import { useBusOnline } from "../../Hooks/busOnline";
import { usePeopleOutDoor } from "../../Hooks/peopleOutdoor";
import { usePeopleStatistic } from "../../Hooks/peopleStatistic";
import { ColumnChart, RoseChart, PieChart } from "@opd/g2plot-react";

import "./index.css";

export default function G2Chart() {
  const leftData = ["武汉各区今日出行人口统计", "武汉各区实时公交在线表"];
  const rightData = ["武汉三镇人口统计", "武汉三甲医院", "武汉市高校学生统计"];
  const { config: peopleOutdoorConfig, data: peopleOutdoorData } =
    usePeopleOutDoor();
  const { config: busOnlineConfig, data: busOnlineData } = useBusOnline();
  const { config: peopleStatisticConfig, data: peopleStatisticData } =
    usePeopleStatistic();
  const hospital = [
    {
      title: "医院",
      num: 30,
      unit: "家",
      url: "src/assets/icons/医院.png",
    },
    {
      title: "门诊部",
      num: 300,
      unit: "个",
      url: "src/assets/icons/门诊.png",
    },
    {
      title: "病床",
      num: 3000,
      unit: "张",
      url: "src/assets/icons/病床.png",
    },
  ];

  const school = [
    {
      title: "高校",
      num: 130,
      unit: "家",
      url: "src/assets/icons/学校.png",
    },
    {
      title: "在校大学生",
      num: 100,
      unit: "万",
      url: "src/assets/icons/学生.png",
    },
  ];
  return (
    <>
      <div className="g2-left">
        {/* {leftData.map((data) => {
          return <Panel header={data} content={<Column />} />;
        })} */}
        <Panel
          header={"武汉各区今日出行人口统计"}
          content={
            <ColumnChart {...peopleOutdoorConfig} data={peopleOutdoorData} />
          }
        />
        <Panel
          header={"武汉各区实时公交在线表"}
          content={<RoseChart {...busOnlineConfig} data={busOnlineData} />}
        />
      </div>

      <div className="g2-right">
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
      </div>
    </>
  );
}
