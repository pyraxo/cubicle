import React, { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import Room from "./Room";

import { useNavigate, useLocation } from "react-router-dom";
import portfolioImage from "assets/portfolio.png";
import profileImage from "assets/profile.png";
import coworkersImage from "assets/coworkers.png";

import Portfolio from "./portfolio";

import "./Home.css";
import Blur from "./Blur";

const Home = () => {
  const [userData] = useLocalStorage("userData", {});
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState(null);
  const [portfolioVisible, setPortfolioVisible] = useState(false);

  const handleButtonClick = (route) => {
    navigate(route, { replace: true });
    setActiveButton(route);
  };

  const togglePortfolioVisibility = () => {
    setPortfolioVisible(!portfolioVisible);
  };

  return (
    <>
      <Blur />
      <div className="home">
        <h1 className="welcome">Welcome back, {userData.username}!</h1>
        <Room />
        <div className="image-container">
          <button
            className={`image-button ${activeButton === '/' ? 'active' : ''}`}
            onClick={togglePortfolioVisibility}
          >
            <img src={portfolioImage} alt="" className="image" />
          </button>
          <button
            className={`image-button ${activeButton === "/Rooms" ? "active" : ""}`}
            onClick={() => handleButtonClick("/Rooms")}
          >
            <img src={profileImage} alt="" className="image" />
          </button>
          <button
            className={`image-button ${activeButton === "/Rooms" ? "active" : ""}`}
            onClick={() => handleButtonClick("/Rooms")}
          >
            <img src={coworkersImage} alt="" className="image" />
          </button>
        </div>

        {portfolioVisible && (
          <div className="portfolio-container">
            <Portfolio className="portfolio-view" username={userData.username}/>
          </div>
        )}
        <Room hostName={userData.username} />
        <IconNavBar />
      </div>
    </>
  );
};

export default Home;