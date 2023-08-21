import React, { useEffect, useState, useContext } from "react";
import { Table, Modal } from "antd";
import MapContext from "../../store/map-context";
import { PointLayer, PolygonLayer } from "@antv/l7";
import { buffer, point } from "@turf/turf";
import "./index.css";

interface EventData {
  geometry: {
    coordinates: [number, number];
  };
  properties: {
    event_num: number;
    name: string;
    detail: {
      area: string;
      car_num: string;
      level: string;
      phone: string;
    };
  };
}

interface DisplayCardProps {
  eventData: EventData[];
}

let pointLayer: PointLayer | null = null;
let markLayer: PointLayer | null = null;
let bufferLayer: PolygonLayer | null = null;
const DisplayCard: React.FC<DisplayCardProps> = ({ eventData }) => {
  const [tableData, setTableData] = useState([]);
  const [detailData, setDetailData] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { scene, map } = useContext(MapContext);

  useEffect(() => {
    if (map && scene) {
      scene.addImage("crash", "/src/assets/images/c.png");
    }
  }, [scene]);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleExpand = (key) => {
    console.log(key);
    setDetailData([
      {
        key: key.event_num,
        event_num: key.event_num,
        name: key.name,
        area: key.detail.area,
        car_num: key.detail.car_num,
        level: key.detail.level,
        phone: key.detail.phone,
      },
    ]);
    showModal();
  };
  const columns = [
    {
      align: "center",
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      align: "center",
      title: "Event_Num",
      dataIndex: "event_num",
      key: "event_num",
    },
    {
      align: "center",
      title: "Detail",
      key: "detail",
      render: (text, record) => {
        return (
          <span>
            <a onClick={() => handleExpand(record)}>详细信息</a>
          </span>
        );
      },
    },
  ];
  const detailColumns = [
    {
      title: "编号",
      dataIndex: "event_num",
      key: "event_num",
    },
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "区域",
      dataIndex: "area",
      key: "area",
    },
    {
      title: "车牌",
      dataIndex: "car_num",
      key: "car_num",
    },
    {
      title: "等级",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "电话",
      dataIndex: "phone",
      key: "phone",
    },
  ];

  const renderData = () => {
    const pointData = [];
    if (pointLayer) {
      scene.removeLayer(pointLayer);
      setPointLayer(null);
    }
    if (markLayer) {
      scene.removeLayer(markLayer);
      markLayer = null;
    }
    const tabData = eventData.map((item) => {
      const {
        geometry,
        properties: { event_num, name, ...rest },
      } = item;
      pointData.push({
        lng: geometry.coordinates[0],
        lat: geometry.coordinates[1],
        name,
      });
      return {
        geometry,
        event_num,
        name,
        rest,
      };
    });
    setTableData(
      tabData.map((t) => {
        return {
          geometry: t.geometry,
          key: t.event_num,
          event_num: t.event_num,
          name: t.name,
          detail: t.rest,
        };
      })
    );
    pointLayer = new PointLayer()
      .source(pointData, {
        parser: {
          type: "json",
          x: "lng",
          y: "lat",
        },
      })
      .shape("crash")
      .size(16);

    scene.addLayer(pointLayer);
  };
  const featureToFeatures = (feature) => {
    return { type: "FeatureCollection", features: [feature] };
  };

  const handleRowClick = (record) => {
    map.flyTo({
      center: record.geometry.coordinates,
      zoom: 15,
      speed: 0.4,
    });

    const markData = [
      {
        lng: record.geometry.coordinates[0],
        lat: record.geometry.coordinates[1],
      },
    ];
    const pointTurf = point(record.geometry.coordinates);
    let res = false;
    if (bufferLayer) {
      scene.removeLayer(bufferLayer);
      bufferLayer = null;
    } else {
      res = confirm("是否建立缓冲区");
    }

    if (res) {
      const input = +prompt("缓冲区距离（米：空值取消）");
      if (!input) {
        alert("取消建立缓冲区");
      } else {
        const buffered = buffer(pointTurf, input, {
          units: "meters",
        });

        bufferLayer = new PolygonLayer({
          name: "缓冲区",
        })
          .source(featureToFeatures(buffered))
          .shape("fill")
          .color("orange")
          .style({ opacity: 0.1 });
        scene.addLayer(bufferLayer);
      }
    }

    if (markLayer) {
      scene.removeLayer(markLayer);
      markLayer = null;
    }

    markLayer = new PointLayer()
      .source(markData, {
        parser: {
          type: "json",
          x: "lng",
          y: "lat",
        },
      })
      .shape("radar")
      .size(60)
      .color("#f00")
      .animate(true);
    scene.addLayer(markLayer);
  };
  useEffect(() => {
    if (pointLayer) {
      scene.removeLayer(pointLayer);
      pointLayer = null;
    }

    if (markLayer) {
      scene.removeLayer(markLayer);
      markLayer = null;
    }
    if (bufferLayer) {
      scene.removeLayer(bufferLayer);
      bufferLayer = null;
    }

    if (eventData != null && eventData.length != 0) {
      renderData();
    } else {
      setTableData(null);
    }
  }, [eventData]);

  const btnClick = () => {
    setShowTable(!showTable);
  };
  return (
    <>
      <button className="btn-events" onClick={btnClick}>
        {showTable ? "关闭表格" : "开启表格"}
      </button>

      <div
        className="displayCard"
        style={{ visibility: `${showTable ? "visible" : "hidden"}` }}
      >
        <Table
          title={() => {
            return "事故查询结果";
          }}
          showHeader={false}
          pagination={false}
          dataSource={tableData}
          columns={columns}
          className="eventTable"
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
          style={{ background: "rgba(255, 255, 255, 0)" }}
          rowClassName={() => {
            return "transparent-row";
          }}
        />
      </div>
      <Modal
        title="事故详情"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
      >
        <Table
          dataSource={detailData}
          columns={detailColumns}
          pagination={false}
        />
      </Modal>
    </>
  );
};
export default DisplayCard;
