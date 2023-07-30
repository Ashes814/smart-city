import React, { useContext, useEffect } from "react";
import MapContext from "../../store/map-context";
import "./index.css";
export default function Header() {
  const ctx = useContext(MapContext);

  return (
    <>
      <header className="header">
        <h1>双城智慧管理系统 - 武汉-上海 </h1>
      </header>
    </>
  );
}
