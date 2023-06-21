import React from "react";
import { useNavigate, useParams } from "react-router";

import useLocalStorage from "../hooks/useLocalStorage";
import Room from "./Room";

import "./Home.css";
import Blur from "./Blur";
import IconNavBar from "./IconNavBar";

const VisitingRoom = () => {
  const [userData] = useLocalStorage("userData", {});
  const { hostName } = useParams();

  return (
    <>
      <Blur />
      <div className="home">
        <h1 className="welcome">You are now visiting {hostName}!</h1>
        <Room hostName={hostName} visitor={userData} />
        <IconNavBar />
      </div>
    </>
  );
};

export default VisitingRoom;
