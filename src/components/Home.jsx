import React, { useEffect } from "react";

import useLocalStorage from "../hooks/useLocalStorage";
import Room from "./Room";

import portfolioImage from "../assets/portfolio.png";
import profileImage from "../assets/profile.png";
import coworkersImage from "../assets/coworkers.png";

import "./Home.css";
import Blur from "./Blur";

const Home = () => {
  const [userData] = useLocalStorage("userData", {});

  return (
    <>
      <Blur />
      <div className="home">
        <h1 className="welcome">Welcome back, {userData.username}!</h1>
        <Room />
        <div className="image-container">
          <img src={portfolioImage} alt="" className="image" />
          <img src={profileImage} alt="" className="image" />
          <img src={coworkersImage} alt="" className="image" />
        </div>
      </div>
    </>
  );
};

export default Home;
