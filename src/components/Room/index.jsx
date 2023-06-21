import "./style.css";

import React, { Suspense } from "react";
import { CircularProgress } from "@mui/material";

const Spline = React.lazy(() => import("@splinetool/react-spline"));

export default function Room() {
  // const noticeBoard = useRef();
  // const character = useRef();

  const onLoad = (spline) => {
    spline.setZoom(1);
  };

  const handleTap = (e) => {};

  return (
    <div className="spline-view">
      <Suspense fallback={<CircularProgress />}>
        <Spline
          onLoad={onLoad}
          onTouchStart={handleTap}
          scene="https://prod.spline.design/rYazmrGbQvWSWoUE/scene.splinecode"
        />
      </Suspense>
    </div>
  );
}
