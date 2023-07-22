import React, { useContext, useEffect, useState } from "react";
import MapContext from "../../store/map-context";
import SmartCity from "../SmartCity";
import MapControl from "../MapControl";
import G2Chart from "../G2Chart";
import BottomControl from "../BottomControl";
export default function HomeView() {
  const ctx = useContext(MapContext);
  const [isShowG2, setIsShowG2] = useState(false);
  const showControlHandler = (show) => {
    setIsShowG2(show);
    //////
  };

  return (
    <div>
      <SmartCity />
      <MapControl />
      {isShowG2 ? <G2Chart /> : ""}

      <BottomControl showControlHandler={showControlHandler} />
    </div>
  );
}
