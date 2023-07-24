import React, { useContext, useEffect, useState } from "react";
import MapContext from "../../store/map-context";
import axios from "axios";
import {
  CityBuildingLayer,
  LayerSwitch,
  LineLayer,
  PolygonLayer,
  PointLayer,
  HeatmapLayer,
} from "@antv/l7";
export default function SmartCity() {
  const ctx = useContext(MapContext);
  const { map, scene } = ctx;
  const [buildData, setBuildData] = useState(null);
  const [roadData, setRoadData] = useState(null);
  const [shAreaData, setShAreaData] = useState(null);
  const [shLanduseData, setShLanduseData] = useState(null);
  const [shDistrictData, setShDistrictData] = useState(null);
  const [shBuildingData, setShBuildingData] = useState(null);
  const [shRoadData, setShRoadData] = useState(null);
  const [shRailwayData, setShRailwayData] = useState(null);
  const [dotPointData, setDotPointData] = useState(null);
  const [flyData, setFlytData] = useState(null);
  const [shSubwayData, setShSubwayData] = useState(null);
  const [layerSwitchAdded, setLayerSwitchAdded] = useState(false);
  const [roadLayerAdded, setRoadLayerAdded] = useState(false);
  const [cityLayerAdded, setCityLayerAdded] = useState(false);
  const [shAreaLayerAdded, setShAreaLayerAdded] = useState(false);
  const [shLanduseAdded, setShLanduseAdded] = useState(false);
  const [shDistrictAdded, setShDistrictAdded] = useState(false);
  const [shBuildingAdded, setShBuildingAdded] = useState(false);
  const [shRoadAdded, setShRoadAdded] = useState(false);
  const [shRailwayAdded, setShRailwayAdded] = useState(false);
  const [dotPointAdded, setDotPointAdded] = useState(false);
  const [flyLineAdded, setFlyLineAdded] = useState(false);
  const [shSubwayAdded, setShSubwayAdded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const buildRes = await axios("http://localhost:8080/wuhan_building");
        const buildRes = await axios(
          "http://localhost:8080/geoserver/sh/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=sh%3AWuhan_Buildings&outputFormat=application%2Fjson"
        );
        setBuildData(buildRes.data);
        const roadRes = await axios(
          "http://localhost:8080/geoserver/sh/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=sh%3AWuhan_roads&outputFormat=application%2Fjson"
        );
        setRoadData(roadRes.data);

        const shAreaRes = await axios(
          "http://localhost:8080/geoserver/sh/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=sh%3Ash_area&outputFormat=application%2Fjson"
        );
        setShAreaData(shAreaRes.data);
        const shDistrictRes = await axios(
          "http://localhost:8080/geoserver/sh/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=sh%3Ash_district&outputFormat=application%2Fjson"
        );
        setShDistrictData(shDistrictRes.data);
        const shLanduseRes = await axios(
          "http://localhost:8080/geoserver/sh/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=sh%3Ash_landuse&outputFormat=application%2Fjson"
        );
        setShLanduseData(shLanduseRes.data);
        const shBuildingRes = await axios(
          "http://localhost:8080/geoserver/sh/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=sh%3Ash_buildings&outputFormat=application%2Fjson"
        );
        setShBuildingData(shBuildingRes.data);
        const shRoadRes = await axios(
          "http://localhost:8080/geoserver/sh/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=sh%3Ash_roads&outputFormat=application%2Fjson"
        );
        setShRoadData(shRoadRes.data);
        const shRailwayRes = await axios(
          "http://localhost:8080/geoserver/sh/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=sh%3Ash_railways&outputFormat=application%2Fjson"
        );
        setShRailwayData(shRailwayRes.data);
        const shSubwayRes = await axios(
          "http://localhost:8080/geoserver/sh/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=sh%3AshSubway&outputFormat=application%2Fjson"
        );
        setShSubwayData(shSubwayRes.data);

        console.log("数据加载成功");
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (map && scene) {
      // add wuhan citylayer
      const cityLayer = new CityBuildingLayer({
        name: "武汉市建筑",
      });
      cityLayer
        .source(buildData)
        .size("Elevation", (h) => h)
        .color("rgb(242, 246, 250)")
        .animate({
          enable: true,
        })
        .active({
          color: "#0ff",
          mix: 0.5,
        })
        .style({
          opacity: 0.7,
          baseColor: "rgb(16,16,16)",
          windowColor: "rgb(30,30,30)",
          brightColor: "rgb(255, 176, 38)",
          sweep: {
            enable: true,
            sweepRadius: 2,
            sweepColor: "#1990fF",
            sweepSpeed: 0.3,
            sweepCenter: [114.3, 30.5],
          },
        })
        .filter("Elevation", (h) => h > 10);
      if (!cityLayerAdded && buildData) {
        console.log("cityLayer added");

        scene.addLayer(cityLayer);

        setCityLayerAdded(true);
      }

      // add wuhan road layer
      const colors = [
        "#87CEFA",
        "#00BFFF",
        "#7FFFAA",
        "#00FF7F",
        "#32CD32",
        "#F0E68C",
        "#FFD700",
        "#FF7F50",
        "#FF6347",
        "#FF0000",
        "#FF2D51",
        "#333",
      ];
      const roadLayer = new LineLayer({
        name: "武汉市道路",
      });
      roadLayer
        .source(roadData)
        .size(1)
        .shape("line")
        .color("name", colors)
        .animate({
          interval: 1,
          duration: 2,
          trailLength: 2,
        })
        .active({
          color: "#0ff",
          mix: 0.5,
        })
        .filter("coordinates", (evt) => evt.length > 5);

      if (!roadLayerAdded && roadData) {
        console.log("roadLayer added");
        scene.addLayer(roadLayer);
        setRoadLayerAdded(true);
      }

      // add shanghai area layer control
      const shAreaLayer = new PolygonLayer({
        name: "上海市行政边界",
      });
      shAreaLayer
        .source(shAreaData)
        .shape("fill")
        .color("#888")
        .active({
          color: "#0ff",
          mix: 0.5,
        })
        .style({ opacity: 0.6 });
      if (!shAreaLayerAdded && shAreaData) {
        console.log("shAreaLayer added");
        // scene.addLayer(shAreaLayer);
        setShAreaLayerAdded(true);
      }
      // add shanghai district control
      const shDistrictLayer = new PolygonLayer({
        name: "上海市区县行政边界",
        zIndex: 3,
      });
      shDistrictLayer
        .source(shDistrictData)
        .shape("fill")
        .color("name", colors)
        .active({
          color: "#0ff",
          mix: 0.5,
        })
        .style({ opacity: 0.6 });
      if (!shDistrictAdded && shDistrictData) {
        console.log("SH DISTRICT ADDED");
        // scene.addLayer(shDistrictLayer);
        setShDistrictAdded(true);
      }
      // add shanghai landuse control
      const shLanduseLayer = new PolygonLayer({
        name: "上海市土地利用",
        zIndex: 4,
      });
      shLanduseLayer
        .source(shLanduseData)
        .shape("fill")
        .color("fclass", colors)
        .active({
          color: "#0ff",
          mix: 0.5,
        })
        .style({ opacity: 0.6 });
      if (!shLanduseAdded && shLanduseData) {
        console.log("SH LANDUSE ADDED");
        // scene.addLayer(shLanduseLayer);
        setShLanduseAdded(true);
      }

      // add sh building layer
      const shBuildingLayer = new CityBuildingLayer({
        name: "上海市建筑",
      });
      shBuildingLayer
        .source(shBuildingData)
        .size(100)
        .color("rgb(242, 246, 250)")
        .animate({
          enable: true,
        })
        .active({
          color: "#0ff",
          mix: 0.5,
        })
        .style({
          opacity: 0.7,
          baseColor: "rgb(16,16,16)",
          windowColor: "rgb(30,30,30)",
          brightColor: "rgb(255, 176, 38)",
          sweep: {
            enable: true,
            sweepRadius: 2,
            sweepColor: "#1990fF",
            sweepSpeed: 0.3,
            sweepCenter: [121.3, 31.0],
          },
        });
      if (!shBuildingAdded && shBuildingData) {
        console.log("SH BUILDING added");

        // scene.addLayer(shBuildingLayer);

        setShBuildingAdded(true);
      }

      // add sh road layer

      const shRoadLayer = new LineLayer({
        name: "上海市道路",
      });
      shRoadLayer
        .source(shRoadData)
        .size(1)
        .shape("line")
        // .color("name", colors)
        .animate({
          interval: 1,
          duration: 2,
          trailLength: 2,
        })
        .active({
          color: "#0ff",
          mix: 0.5,
        })
        .filter("coordinates", (evt) => evt.length > 5);

      if (!shRoadAdded && shRoadData) {
        console.log("SH ROAD ADDED");
        // scene.addLayer(shRoadLayer);
        setShRoadAdded(true);
      }
      // add sh road layer

      const shRailwayLayer = new LineLayer({
        name: "上海市轨道交通",
      });
      shRailwayLayer
        .source(shRailwayData)
        .size(1)
        .shape("line")
        .color("fclass", colors)
        .animate({
          interval: 1,
          duration: 2,
          trailLength: 2,
        })
        .active({
          color: "#0ff",
          mix: 0.5,
        })
        .style({
          lineType: "dash",
          dashArray: [5, 5],
        });

      if (!shRailwayAdded && shRailwayData) {
        console.log("SH RAILWAY ADDED");
        // scene.addLayer(shRailwayLayer);
        setShRailwayAdded(true);
      }
      // add flyLine
      const flyline = [
        {
          from: "121.808318, 31.140456",
          to: "100.992541, 15.870032",
        },
        {
          from: "121.808318, 31.140456",
          to: "114.727669, 4.535277",
        },
        {
          from: "121.808318, 31.140456",
          to: "9.501785, 56.26392",
        },
        {
          from: "121.808318, 31.140456",
          to: "-66.590149, 18.220833",
        },
        {
          from: "121.808318, 31.140456",
          to: "174.885971, -40.900557",
        },
        {
          from: "121.808318, 31.140456",
          to: "104.990963, 12.565679",
        },
        {
          from: "121.808318, 31.140456",
          to: "6.129582999999999, 49.815273",
        },
        {
          from: "121.808318, 31.140456",
          to: "8.468945999999999, 60.47202399999999",
        },
        {
          from: "121.808318, 31.140456",
          to: "108.277199, 14.058324",
        },
        {
          from: "121.808318, 31.140456",
          to: "-95.712891, 37.09024",
        },
        {
          from: "121.808318, 31.140456",
          to: "121.49917, 25.12653",
        },
        {
          from: "121.808318, 31.140456",
          to: "-9.429499000000002, 6.428055",
        },
        {
          from: "121.808318, 31.140456",
          to: "127.766922, 35.907757",
        },
        {
          from: "121.808318, 31.140456",
          to: "10.451526, 51.165691",
        },
        {
          from: "121.808318, 31.140456",
          to: "23.881275, 55.169438",
        },
        {
          from: "121.808318, 31.140456",
          to: "34.851612, 31.046051",
        },
        {
          from: "121.808318, 31.140456",
          to: "53.847818, 23.424076",
        },
        {
          from: "121.808318, 31.140456",
          to: "102.495496, 19.85627",
        },
        {
          from: "121.808318, 31.140456",
          to: "21.824312, 39.074208",
        },
        {
          from: "121.808318, 31.140456",
          to: "25.48583, 42.733883",
        },
        {
          from: "121.808318, 31.140456",
          to: "15.472962, 49.81749199999999",
        },
        {
          from: "121.808318, 31.140456",
          to: "78.96288, 20.593684",
        },
        {
          from: "121.808318, 31.140456",
          to: "-3.435973, 55.378051",
        },
        {
          from: "121.808318, 31.140456",
          to: "33.429859, 35.126413",
        },
        {
          from: "121.808318, 31.140456",
          to: "8.227511999999999, 46.818188",
        },
        {
          from: "121.808318, 31.140456",
          to: "114.066662, 22.588638",
        },
        {
          from: "121.808318, 31.140456",
          to: "14.550072, 47.516231",
        },
        {
          from: "121.808318, 31.140456",
          to: "2.213749, 46.227638",
        },
        {
          from: "121.808318, 31.140456",
          to: "12.56738, 41.87194",
        },
        {
          from: "121.808318, 31.140456",
          to: "105.318756, 61.52401",
        },
        {
          from: "121.808318, 31.140456",
          to: "80.77179699999999, 7.873053999999999",
        },
        {
          from: "121.808318, 31.140456",
          to: "5.291265999999999, 52.132633",
        },
        {
          from: "121.808318, 31.140456",
          to: "35.243322, 38.963745",
        },
        {
          from: "121.808318, 31.140456",
          to: "18.643501, 60.12816100000001",
        },
        {
          from: "121.808318, 31.140456",
          to: "25.748151, 61.92410999999999",
        },
        {
          from: "121.808318, 31.140456",
          to: "-3.74922, 40.46366700000001",
        },
        {
          from: "121.808318, 31.140456",
          to: "113.551538, 22.109432",
        },
        {
          from: "121.808318, 31.140456",
          to: "4.469936, 50.503887",
        },
        {
          from: "121.333876, 31.196933",
          to: "-106.346771, 56.130366",
        },
        {
          from: "121.333876, 31.196933",
          to: "138.252924, 36.204824",
        },
        {
          from: "121.333876, 31.196933",
          to: "17.679076, 43.915886",
        },
        {
          from: "121.333876, 31.196933",
          to: "-88.49765, 17.189877",
        },
        {
          from: "121.333876, 31.196933",
          to: "25.013607, 58.595272",
        },
        {
          from: "121.333876, 31.196933",
          to: "101.975766, 4.210484",
        },
        {
          from: "121.333876, 31.196933",
          to: "-8.24389, 53.41291",
        },
        {
          from: "121.333876, 31.196933",
          to: "-8.224454, 39.39987199999999",
        },
        {
          from: "121.333876, 31.196933",
          to: "133.775136, -25.274398",
        },
        {
          from: "121.333876, 31.196933",
          to: "121.774017, 12.879721",
        },
      ];

      const dot = [
        {
          area: "泰国",
          entryAmount: "0.02",
          outboundAmount: "485.21",
          dotid: 0,
          value: 0.02,
          info: "泰国 入境金额：$0.02万, 出境金额：$485.21万",
          name: "泰国",
          lng: 100.992541,
          lat: 15.870032,
          type: "ok",
        },
        {
          area: "文莱",
          entryAmount: "0.00",
          outboundAmount: "0.21",
          dotid: 2,
          value: 0,
          info: "文莱 入境金额：$0.00万, 出境金额：$0.21万",
          name: "文莱",
          lng: 114.727669,
          lat: 4.535277,
          type: "ok",
        },
        {
          area: "丹麦",
          entryAmount: "0.00",
          outboundAmount: "2.33",
          dotid: 4,
          value: 0,
          info: "丹麦 入境金额：$0.00万, 出境金额：$2.33万",
          name: "丹麦",
          lng: 9.501785,
          lat: 56.26392,
          type: "ok",
        },
        {
          area: "波多黎各",
          entryAmount: "0.00",
          outboundAmount: "0.00",
          dotid: 5,
          value: 0,
          info: "波多黎各 入境金额：$0.00万, 出境金额：$0.00万",
          name: "波多黎各",
          lng: -66.590149,
          lat: 18.220833,
          type: "ok",
        },
        {
          area: "新西兰",
          entryAmount: "0.20",
          outboundAmount: "50.50",
          dotid: 6,
          value: 0.2,
          info: "新西兰 入境金额：$0.20万, 出境金额：$50.50万",
          name: "新西兰",
          lng: 174.885971,
          lat: -40.900557,
          type: "ok",
        },
        {
          area: "柬埔寨",
          entryAmount: "0.00",
          outboundAmount: "39.73",
          dotid: 7,
          value: 0,
          info: "柬埔寨 入境金额：$0.00万, 出境金额：$39.73万",
          name: "柬埔寨",
          lng: 104.990963,
          lat: 12.565679,
          type: "ok",
        },
        {
          area: "卢森堡",
          entryAmount: "0.00",
          outboundAmount: "47.70",
          dotid: 8,
          value: 0,
          info: "卢森堡 入境金额：$0.00万, 出境金额：$47.70万",
          name: "卢森堡",
          lng: 6.129582999999999,
          lat: 49.815273,
          type: "ok",
        },
        {
          area: "挪威",
          entryAmount: "0.00",
          outboundAmount: "0.14",
          dotid: 10,
          value: 0,
          info: "挪威 入境金额：$0.00万, 出境金额：$0.14万",
          name: "挪威",
          lng: 8.468945999999999,
          lat: 60.47202399999999,
          type: "ok",
        },
        {
          area: "越南",
          entryAmount: "0.00",
          outboundAmount: "0.37",
          dotid: 11,
          value: 0,
          info: "越南 入境金额：$0.00万, 出境金额：$0.37万",
          name: "越南",
          lng: 108.277199,
          lat: 14.058324,
          type: "ok",
        },
        {
          area: "美国",
          entryAmount: "0.86",
          outboundAmount: "344.87",
          dotid: 12,
          value: 0.86,
          info: "美国 入境金额：$0.86万, 出境金额：$344.87万",
          name: "美国",
          lng: -95.712891,
          lat: 37.09024,
          type: "ok",
        },
        {
          area: "中国台湾",
          entryAmount: "98.24",
          outboundAmount: "78.17",
          dotid: 13,
          value: 98.24,
          info: "中国台湾 入境金额：$98.24万, 出境金额：$78.17万",
          name: "中国台湾",
          lng: 121.49917,
          lat: 25.12653,
          type: "ok",
        },
        {
          area: "利比里亚",
          entryAmount: "0.00",
          outboundAmount: "17.12",
          dotid: 14,
          value: 0,
          info: "利比里亚 入境金额：$0.00万, 出境金额：$17.12万",
          name: "利比里亚",
          lng: -9.429499000000002,
          lat: 6.428055,
          type: "ok",
        },
        {
          area: "韩国",
          entryAmount: "1.59",
          outboundAmount: "1079.88",
          dotid: 15,
          value: 1.59,
          info: "韩国 入境金额：$1.59万, 出境金额：$1079.88万",
          name: "韩国",
          lng: 127.766922,
          lat: 35.907757,
          type: "ok",
        },
        {
          area: "德国",
          entryAmount: "0.15",
          outboundAmount: "76.47",
          dotid: 17,
          value: 0.15,
          info: "德国 入境金额：$0.15万, 出境金额：$76.47万",
          name: "德国",
          lng: 10.451526,
          lat: 51.165691,
          type: "ok",
        },
        {
          area: "立陶宛",
          entryAmount: "0.00",
          outboundAmount: "0.00",
          dotid: 18,
          value: 0,
          info: "立陶宛 入境金额：$0.00万, 出境金额：$0.00万",
          name: "立陶宛",
          lng: 23.881275,
          lat: 55.169438,
          type: "ok",
        },
        {
          area: "以色列",
          entryAmount: "0.00",
          outboundAmount: "0.02",
          dotid: 20,
          value: 0,
          info: "以色列 入境金额：$0.00万, 出境金额：$0.02万",
          name: "以色列",
          lng: 34.851612,
          lat: 31.046051,
          type: "ok",
        },
        {
          area: "阿联酋",
          entryAmount: "0.00",
          outboundAmount: "35.26",
          dotid: 22,
          value: 0,
          info: "阿联酋 入境金额：$0.00万, 出境金额：$35.26万",
          name: "阿联酋",
          lng: 53.847818,
          lat: 23.424076,
          type: "ok",
        },
        {
          area: "老挝",
          entryAmount: "0.00",
          outboundAmount: "3.12",
          dotid: 23,
          value: 0,
          info: "老挝 入境金额：$0.00万, 出境金额：$3.12万",
          name: "老挝",
          lng: 102.495496,
          lat: 19.85627,
          type: "ok",
        },
        {
          area: "希腊",
          entryAmount: "0.00",
          outboundAmount: "1.21",
          dotid: 24,
          value: 0,
          info: "希腊 入境金额：$0.00万, 出境金额：$1.21万",
          name: "希腊",
          lng: 21.824312,
          lat: 39.074208,
          type: "ok",
        },
        {
          area: "保加利亚",
          entryAmount: "0.00",
          outboundAmount: "0.00",
          dotid: 25,
          value: 0,
          info: "保加利亚 入境金额：$0.00万, 出境金额：$0.00万",
          name: "保加利亚",
          lng: 25.48583,
          lat: 42.733883,
          type: "ok",
        },
        {
          area: "捷克共和国",
          entryAmount: "0.00",
          outboundAmount: "0.26",
          dotid: 26,
          value: 0,
          info: "捷克共和国 入境金额：$0.00万, 出境金额：$0.26万",
          name: "捷克共和国",
          lng: 15.472962,
          lat: 49.81749199999999,
          type: "ok",
        },
        {
          area: "印度",
          entryAmount: "0.00",
          outboundAmount: "0.28",
          dotid: 27,
          value: 0,
          info: "印度 入境金额：$0.00万, 出境金额：$0.28万",
          name: "印度",
          lng: 78.96288,
          lat: 20.593684,
          type: "ok",
        },
        {
          area: "英国",
          entryAmount: "0.39",
          outboundAmount: "474.14",
          dotid: 28,
          value: 0.39,
          info: "英国 入境金额：$0.39万, 出境金额：$474.14万",
          name: "英国",
          lng: -3.435973,
          lat: 55.378051,
          type: "ok",
        },
        {
          area: "塞浦路斯",
          entryAmount: "0.00",
          outboundAmount: "6.46",
          dotid: 30,
          value: 0,
          info: "塞浦路斯 入境金额：$0.00万, 出境金额：$6.46万",
          name: "塞浦路斯",
          lng: 33.429859,
          lat: 35.126413,
          type: "ok",
        },
        {
          area: "瑞士",
          entryAmount: "0.00",
          outboundAmount: "29.56",
          dotid: 31,
          value: 0,
          info: "瑞士 入境金额：$0.00万, 出境金额：$29.56万",
          name: "瑞士",
          lng: 8.227511999999999,
          lat: 46.818188,
          type: "ok",
        },
        {
          area: "中国香港",
          entryAmount: "693.53",
          outboundAmount: "1742.08",
          dotid: 32,
          value: 693.53,
          info: "中国香港 入境金额：$693.53万, 出境金额：$1742.08万",
          name: "中国香港",
          lng: 114.066662,
          lat: 22.588638,
          type: "ok",
        },
        {
          area: "奥地利",
          entryAmount: "0.01",
          outboundAmount: "2.84",
          dotid: 33,
          value: 0.01,
          info: "奥地利 入境金额：$0.01万, 出境金额：$2.84万",
          name: "奥地利",
          lng: 14.550072,
          lat: 47.516231,
          type: "ok",
        },
        {
          area: "法国",
          entryAmount: "0.08",
          outboundAmount: "80.97",
          dotid: 34,
          value: 0.08,
          info: "法国 入境金额：$0.08万, 出境金额：$80.97万",
          name: "法国",
          lng: 2.213749,
          lat: 46.227638,
          type: "ok",
        },
        {
          area: "意大利",
          entryAmount: "0.00",
          outboundAmount: "91.06",
          dotid: 36,
          value: 0,
          info: "意大利 入境金额：$0.00万, 出境金额：$91.06万",
          name: "意大利",
          lng: 12.56738,
          lat: 41.87194,
          type: "ok",
        },
        {
          area: "俄罗斯",
          entryAmount: "0.00",
          outboundAmount: "3.97",
          dotid: 37,
          value: 0,
          info: "俄罗斯 入境金额：$0.00万, 出境金额：$3.97万",
          name: "俄罗斯",
          lng: 105.318756,
          lat: 61.52401,
          type: "ok",
        },
        {
          area: "斯里兰卡",
          entryAmount: "0.00",
          outboundAmount: "0.40",
          dotid: 38,
          value: 0,
          info: "斯里兰卡 入境金额：$0.00万, 出境金额：$0.40万",
          name: "斯里兰卡",
          lng: 80.77179699999999,
          lat: 7.873053999999999,
          type: "ok",
        },
        {
          area: "荷兰",
          entryAmount: "0.32",
          outboundAmount: "199.02",
          dotid: 39,
          value: 0.32,
          info: "荷兰 入境金额：$0.32万, 出境金额：$199.02万",
          name: "荷兰",
          lng: 5.291265999999999,
          lat: 52.132633,
          type: "ok",
        },
        {
          area: "土耳其",
          entryAmount: "0.00",
          outboundAmount: "1.17",
          dotid: 40,
          value: 0,
          info: "土耳其 入境金额：$0.00万, 出境金额：$1.17万",
          name: "土耳其",
          lng: 35.243322,
          lat: 38.963745,
          type: "ok",
        },
        {
          area: "瑞典",
          entryAmount: "0.01",
          outboundAmount: "1.87",
          dotid: 41,
          value: 0.01,
          info: "瑞典 入境金额：$0.01万, 出境金额：$1.87万",
          name: "瑞典",
          lng: 18.643501,
          lat: 60.12816100000001,
          type: "ok",
        },
        {
          area: "芬兰",
          entryAmount: "0.00",
          outboundAmount: "4.47",
          dotid: 42,
          value: 0,
          info: "芬兰 入境金额：$0.00万, 出境金额：$4.47万",
          name: "芬兰",
          lng: 25.748151,
          lat: 61.92410999999999,
          type: "ok",
        },
        {
          area: "西班牙",
          entryAmount: "0.00",
          outboundAmount: "13.85",
          dotid: 43,
          value: 0,
          info: "西班牙 入境金额：$0.00万, 出境金额：$13.85万",
          name: "西班牙",
          lng: -3.74922,
          lat: 40.46366700000001,
          type: "ok",
        },
        {
          area: "中国澳门",
          entryAmount: "0.01",
          outboundAmount: "274.62",
          dotid: 44,
          value: 0.01,
          info: "中国澳门 入境金额：$0.01万, 出境金额：$274.62万",
          name: "中国澳门",
          lng: 113.551538,
          lat: 22.109432,
          type: "ok",
        },
        {
          area: "比利时",
          entryAmount: "0.00",
          outboundAmount: "0.00",
          dotid: 45,
          value: 0,
          info: "比利时 入境金额：$0.00万, 出境金额：$0.00万",
          name: "比利时",
          lng: 4.469936,
          lat: 50.503887,
          type: "ok",
        },
        {
          area: "加拿大",
          entryAmount: "0.31",
          outboundAmount: "90.66",
          dotid: 47,
          value: 0.31,
          info: "加拿大 入境金额：$0.31万, 出境金额：$90.66万",
          name: "加拿大",
          lng: -106.346771,
          lat: 56.130366,
          type: "ok",
        },
        {
          area: "日本",
          entryAmount: "0.78",
          outboundAmount: "1221.59",
          dotid: 48,
          value: 0.78,
          info: "日本 入境金额：$0.78万, 出境金额：$1221.59万",
          name: "日本",
          lng: 138.252924,
          lat: 36.204824,
          type: "ok",
        },
        {
          area: "波斯尼亚和黑塞哥维那",
          entryAmount: "0.00",
          outboundAmount: "0.01",
          dotid: 49,
          value: 0,
          info: "波斯尼亚和黑塞哥维那 入境金额：$0.00万, 出境金额：$0.01万",
          name: "波斯尼亚和黑塞哥维那",
          lng: 17.679076,
          lat: 43.915886,
          type: "ok",
        },
        {
          area: "伯利兹",
          entryAmount: "0.00",
          outboundAmount: "0.01",
          dotid: 50,
          value: 0,
          info: "伯利兹 入境金额：$0.00万, 出境金额：$0.01万",
          name: "伯利兹",
          lng: -88.49765,
          lat: 17.189877,
          type: "ok",
        },
        {
          area: "爱沙尼亚",
          entryAmount: "0.00",
          outboundAmount: "1.68",
          dotid: 51,
          value: 0,
          info: "爱沙尼亚 入境金额：$0.00万, 出境金额：$1.68万",
          name: "爱沙尼亚",
          lng: 25.013607,
          lat: 58.595272,
          type: "ok",
        },
        {
          area: "马来西亚",
          entryAmount: "23.98",
          outboundAmount: "113.45",
          dotid: 53,
          value: 23.98,
          info: "马来西亚 入境金额：$23.98万, 出境金额：$113.45万",
          name: "马来西亚",
          lng: 101.975766,
          lat: 4.210484,
          type: "ok",
        },
        {
          area: "爱尔兰",
          entryAmount: "0.00",
          outboundAmount: "2028.42",
          dotid: 54,
          value: 0,
          info: "爱尔兰 入境金额：$0.00万, 出境金额：$2028.42万",
          name: "爱尔兰",
          lng: -8.24389,
          lat: 53.41291,
          type: "ok",
        },
        {
          area: "葡萄牙",
          entryAmount: "0.00",
          outboundAmount: "0.05",
          dotid: 57,
          value: 0,
          info: "葡萄牙 入境金额：$0.00万, 出境金额：$0.05万",
          name: "葡萄牙",
          lng: -8.224454,
          lat: 39.39987199999999,
          type: "ok",
        },
        {
          area: "澳大利亚",
          entryAmount: "0.35",
          outboundAmount: "251.50",
          dotid: 59,
          value: 0.35,
          info: "澳大利亚 入境金额：$0.35万, 出境金额：$251.50万",
          name: "澳大利亚",
          lng: 133.775136,
          lat: -25.274398,
          type: "ok",
        },
        {
          area: "菲律宾",
          entryAmount: "0.00",
          outboundAmount: "23.39",
          dotid: 61,
          value: 0,
          info: "菲律宾 入境金额：$0.00万, 出境金额：$23.39万",
          name: "菲律宾",
          lng: 121.774017,
          lat: 12.879721,
          type: "ok",
        },
      ];

      setDotPointData(dot);
      const flydata = flyline.map((item) => {
        // @ts-ignore
        const latlng1 = item.from.split(",").map((e) => {
          return e * 1;
        });
        // @ts-ignore
        const latlng2 = item.to.split(",").map((e) => {
          return e * 1;
        });
        return { coord: [latlng1, latlng2] };
      });
      setFlytData(flydata);

      const dotPointLayer = new PointLayer({
        name: "dot",
      })
        .source(dotPointData, {
          parser: {
            type: "json",
            x: "lng",
            y: "lat",
          },
        })
        .shape("circle")
        .color("#ffed11")
        .animate(true)
        .active({
          color: "#0ff",
        })
        .size(40);
      if (!dotPointAdded && dotPointData) {
        console.log("DOT POINT ADDED");
        // ADD Flyline
        scene.addImage(
          "plane",
          "https://gw.alipayobjects.com/zos/bmw-prod/0ca1668e-38c2-4010-8568-b57cb33839b9.svg"
        );
        // scene.addLayer(dotPointLayer);
        dotPointLayer.on("click", (e) => {
          console.log("hoverdot");
          console.log(e);
        });
        setDotPointAdded(true);
      }

      const flyLine = new LineLayer({
        name: "航线",
        blend: "normal",
      })
        .source(flyData, {
          parser: {
            type: "json",
            coordinates: "coord",
          },
        })
        .color("#ff6b34")
        .texture("plane")
        .shape("arc")
        .size(10)
        .animate({
          duration: 1,
          interval: 0.5,
          trailLength: 0.05,
        })
        .active({
          color: "#0ff",
        })
        .style({
          // lineType: "dash",
          // dashArray: [5, 5],
          // opacity: 0.5,
          textureBlend: "replace",
          lineTexture: true, // 开启线的贴图功能
          iconStep: 10, // 设置贴图纹理的间距
        });
      if (!flyLineAdded && flyData) {
        console.log("FLY LINE1 ADDED");
        // scene.addLayer(flyLine);
        setFlyLineAdded(true);
      }

      // ADD SHANGHAI SUBWAY DATA
      const shSubwayLayer = new HeatmapLayer({
        name: "上海地铁站客流量",
      })
        .source(shSubwayData)
        .size("capacity", [0, 1])
        .shape("heatmap")
        // weight映射通道
        .style({
          intensity: 5,
          radius: 10,
          rampColors: {
            colors: [
              "#2E8AE6",
              "#69D1AB",
              "#DAF291",
              "#FFD591",
              "#FF7A45",
              "#CF1D49",
            ],
            positions: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
          },
        });
      if (!shSubwayAdded && shSubwayData) {
        console.log("SH SUBWAY ADDED");
        // scene.addLayer(shSubwayLayer);
        setShSubwayAdded(true);
      }

      // add layer control

      if (
        !layerSwitchAdded &&
        roadLayerAdded &&
        cityLayerAdded &&
        shAreaLayerAdded &&
        shDistrictAdded &&
        shLanduseAdded &&
        shBuildingAdded &&
        shRoadAdded &&
        shRailwayAdded &&
        shSubwayAdded
      ) {
        const layerSwitch = new LayerSwitch({
          layers: [],
        });

        scene.addControl(layerSwitch);
        setLayerSwitchAdded(true);
      }
    }
  }, [
    buildData,
    roadData,
    shAreaData,
    shDistrictData,
    shLanduseData,
    shBuildingData,
    shRoadAdded,
    shRailwayData,
    shSubwayData,
  ]);

  return <div></div>;
}
