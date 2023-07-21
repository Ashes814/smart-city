import React, { useContext, useEffect } from "react";
import MapContext from "../../store/map-context";
export default function Header() {
  const ctx = useContext(MapContext);
  console.log(ctx);

  return <div></div>;
}
