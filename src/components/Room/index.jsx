import "./style.css";

import React, { Suspense, useRef } from "react";
import { CircularProgress } from "@mui/material";
import { useEffect } from "react";

import { listen, stopListen } from "services/Firebase";
import useLocalStorage from "hooks/useLocalStorage";

const Spline = React.lazy(() => import("@splinetool/react-spline"));

export default function Room() {
  // const noticeBoard = useRef();
  const userType = {
    MALE: "Man Sit",
    FEMALE: "Girl Sit",
  };
  const [userData] = useLocalStorage("userData", {});
  const character = useRef();
  const visitor = useRef();

  const onLoad = (spline) => {
    spline.setZoom(1);
    character.current = spline.findObjectByName(userType.FEMALE);
    visitor.current = spline.findObjectByName(userType.MALE);
  };

  const handleTap = (e) => {};

  useEffect(() => {
    const listener = listen(`visitors/${userData.username}`, (snapshot) => {
      const visitorName = snapshot.val();
      visitor.current.position.x = visitorName ? 0 : 944;
      visitor.current.position.z = visitorName ? 445 : 367;
    });
    return () => {
      stopListen(`visitors/${userData.username}`, listener);
    };
  }, [userData]);

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
