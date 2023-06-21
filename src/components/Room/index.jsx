import "./style.css";

import React, { Suspense, useRef, useState } from "react";
import { CircularProgress } from "@mui/material";
import { useEffect } from "react";

import { listen, saveValue, stopListen } from "services/Firebase";
import useLocalStorage from "hooks/useLocalStorage";

const Spline = React.lazy(() => import("@splinetool/react-spline"));

export default function Room({ hostName }) {
  // const noticeBoard = useRef();
  const userType = {
    MALE: "Man Sit",
    FEMALE: "Girl Sit",
  };
  const [userData] = useLocalStorage("userData", {});
  const character = useRef();
  const visitor = useRef();
  const [loaded, setLoaded] = useState(false);
  const [visitorRef, setVisitorRef] = useState(null);

  const onLoad = (spline) => {
    spline.setZoom(1);
    character.current = spline.findObjectByName(userType.FEMALE);
    visitor.current = spline.findObjectByName(userType.MALE);
    setVisitorRef(visitor);
    setLoaded(true);
  };

  const handleTap = (e) => {};

  useEffect(() => {
    if (loaded && visitorRef) {
      if (hostName === userData.username) {
        const listener = listen(`visitors/${userData.username}`, (snapshot) => {
          const visitorName = snapshot.val();
          if (visitorRef.current && visitorRef.current.position) {
            visitorRef.current.position.x = visitorName ? 0 : 944;
            visitorRef.current.position.z = visitorName ? 445 : 367;
          }
        });
        return () => {
          stopListen(`visitors/${userData.username}`, listener);
          setLoaded(false);
        };
      } else {
        if (visitorRef.current) {
          visitorRef.current.position.x = 0;
          visitorRef.current.position.z = 445;
          saveValue(`visitors/${hostName}`, userData.username);
          return () => {
            saveValue(`visitors/${hostName}`, "");
          };
        }
      }
    }
  }, [userData, loaded, hostName, visitorRef]);

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
