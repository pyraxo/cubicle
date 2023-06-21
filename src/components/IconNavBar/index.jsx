import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import portfolioImage from "assets/portfolio.png";
import profileImage from "assets/profile.png";
import coworkersImage from "assets/coworkers.png";

import "./style.css";

const IconNavBar = ({ active }) => {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (route) => {
    navigate(route, { replace: true });
    setActiveButton(route);
  };

  return (
    <div className="image-container">
      <button
        className={`image-button ${active === "portfolio" ? "active" : ""}`}
        onClick={() => handleButtonClick("/portfolio")}
      >
        <img src={portfolioImage} alt="" className="image" />
      </button>

      <button
        className={`image-button ${activeButton === "home" ? "active" : ""}`}
        onClick={() => handleButtonClick("/")}
      >
        <img src={profileImage} alt="" className="image" />
      </button>

      <button
        className={`image-button ${activeButton === "rooms" ? "active" : ""}`}
        onClick={() => handleButtonClick("/rooms")}
      >
        <img src={coworkersImage} alt="" className="image" />
      </button>
    </div>
  );
};
export default IconNavBar;
