import React, { useContext, useEffect } from "react";
import MapContext from "../../store/map-context";
import SmartCity from "../SmartCity";
import MapControl from "../MapControl";
export default function HomeView() {
  const ctx = useContext(MapContext);

  return (
    <div>
      <SmartCity />
      <MapControl />
    </div>
  );
}
