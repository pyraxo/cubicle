import "./style.css";

import React, { useRef } from "react";
import Spline from "@splinetool/react-spline";

export default function Room() {
  // const noticeBoard = useRef();
  // const character = useRef();

  const onLoad = (spline) => {
    spline.setZoom(1);
  };

  const handleTap = (e) => {};

  return (
    <div className="spline-view">
      <Spline
        onLoad={onLoad}
        onTouchStart={handleTap}
        scene="https://prod.spline.design/rYazmrGbQvWSWoUE/scene.splinecode"
      />
    </div>
  );
}
