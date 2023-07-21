import React, { useContext, useEffect } from "react";
import MapContext from "../../store/map-context";
import "./index.css";
export default function Header() {
  const ctx = useContext(MapContext);

  return (
    <>
      <header className="header">
        <div className="timer">
          <p>2023-09-10</p>
          <p>09:20</p>
        </div>
        <span>智慧城市-武汉</span>
      </header>
    </>
  );
}
