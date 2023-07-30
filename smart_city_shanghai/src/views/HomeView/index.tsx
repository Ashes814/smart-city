import React, { useState } from "react";
import SmartCity from "../SmartCity";
import MapControl from "../MapControl";
import G2Chart from "../G2Chart";
import BottomControl from "../BottomControl";
import School from "../School";
const HomeView: React.FC = () => {
  const [isShowG2, setIsShowG2] = useState<boolean>(true);
  const showControlHandler = (show: boolean) => {
    setIsShowG2(show);
  };

  return (
    <div>
      <SmartCity />
      <MapControl />
      <School />
      {isShowG2 ? <G2Chart /> : ""}
      <BottomControl showControlHandler={showControlHandler} />
    </div>
  );
};

export default HomeView;
