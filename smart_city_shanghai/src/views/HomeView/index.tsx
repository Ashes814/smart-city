import React, { useContext, useEffect } from "react";
import MapContext from "../../store/map-context";
import SmartCity from "../SmartCity";
import MapControl from "../MapControl";
import G2Chart from "../G2Chart";
export default function HomeView() {
  const ctx = useContext(MapContext);

  return (
    <div>
      <SmartCity />
      <MapControl />
      <G2Chart />
    </div>
  );
}
