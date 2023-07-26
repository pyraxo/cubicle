import "./Rooms.css";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";
import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useLocalStorage from "hooks/useLocalStorage";
import useFirebase from "hooks/useFirebase";

const Rooms = () => {
  const [userData] = useLocalStorage("userData", {});
  const [storedUsers] = useFirebase("users", {});

  const navigate = useNavigate();

  return (
    <div className="rectangle-container">
      {storedUsers &&
        Object.keys(storedUsers)
          .filter((u) => u !== userData.username)
          .map((idx) => (
            <div
              className="door"
              key={idx}
              onClick={() => navigate(`/room/${idx}`, { replace: true })}
            >
              {idx}
            </div>
          ))}
    </div>
  );
};

export default Rooms;
