import "./Rooms.css";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";
import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { database } from "../services/Firebase";

const Rooms = () => {
  const [storedUsername, setStoredUsername] = useState("");

  useEffect(() => {
    const getUsernameFromLocalStorage = () => {
      const userDataString = localStorage.getItem("userData");
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        setStoredUsername(userData.username);
      }
    };

    getUsernameFromLocalStorage();
  }, []);
  const location = useLocation();
  const [noDoors, setNoDoors] = useState(0);
  const [data, setData] = useState(0);

  const loadRooms = async () => {
    const snapshot = await get(ref(database, `OFFICES/01/users`));
    console.log(snapshot);
    const fetchedData = snapshot.val();

    setNoDoors(Object.keys(fetchedData).length);
    setData(fetchedData);
    console.log(data);
  };

  const navigate = useNavigate();

  const divs = Array.from({ length: noDoors }, (_, index) => (
    <div
      className="door"
      key={index}
      onClick={() => navigate("/Room", { state: { storedUsername } })}
    >
      {Object.keys(data)[index].toString()}
    </div>
  ));

  useEffect(() => {
    loadRooms();
  }, []);

  return <div className="rectangle-container">{divs}</div>;
};

export default Rooms;
