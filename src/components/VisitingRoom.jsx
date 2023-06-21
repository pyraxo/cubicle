import React from "react";
import { Navigate, useParams } from "react-router";

import useLocalStorage from "../hooks/useLocalStorage";
import Room from "./Room";

import portfolioImage from "../assets/portfolio.png";
import profileImage from "../assets/profile.png";
import coworkersImage from "../assets/coworkers.png";

import "./Home.css";
import Blur from "./Blur";
import useFirebase from "hooks/useFirebase";

const VisitingRoom = () => {
  const [userData] = useLocalStorage("userData", {});
  const { hostName } = useParams();
  const [hostData] = useFirebase(`/users/${hostName}`, {});

  return (
    <>
      {hostData ? (
        <>
          <Blur />
          <div className="home">
            <h1 className="welcome">You are now visiting {hostName}!</h1>
            <Room />
            <div className="image-container">
              <img src={portfolioImage} alt="" className="image" />
              <img src={profileImage} alt="" className="image" />
              <img src={coworkersImage} alt="" className="image" />
            </div>
          </div>
        </>
      ) : (
        <Navigate to="/" replace={true} />
      )}
    </>
  );
};

export default VisitingRoom;
