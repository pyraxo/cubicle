import React from "react";
import { useParams } from "react-router";

import useLocalStorage from "../hooks/useLocalStorage";
import Room from "./Room";

import "./Home.css";
import Blur from "./Blur";
import IconNavBar from "./IconNavBar";
import { useState } from "react";

const VisitingRoom = () => {
  const [userData] = useLocalStorage("userData", {});
  const { hostName } = useParams();

  const [hideWelcome, setHideWelcome] = useState(false);
  const toggleWelcome = () => setHideWelcome(!hideWelcome);

  return (
    <>
      <Blur />
      <div className="home">
        <h1 className="welcome">You are now visiting {hostName}!</h1>
        <Room hostName={hostName} visitor={userData} />
        <IconNavBar toggleWelcome={toggleWelcome} />
      </div>
    </>
  );
};

export default VisitingRoom;
