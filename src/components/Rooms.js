import "./Rooms.css";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";
import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const firebaseConfig = {
  databaseURL:
    "https://cubicle-b4654-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const Rooms = () => {
  const location = useLocation();
  const { username, officeId } = location.state;
  const [noDoors, setNoDoors] = useState(0);
  const [data, setData] = useState(0);

  const loadRooms = async () => {
    const snapshot = await get(ref(database, `OFFICES/${officeId}/users`));
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
      onClick={() => navigate("/Room", { state: { username } })}
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
