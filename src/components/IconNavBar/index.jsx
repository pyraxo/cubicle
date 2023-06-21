import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import portfolioImage from "assets/portfolio.png";
import profileImage from "assets/profile.png";
import coworkersImage from "assets/coworkers.png";

const IconNavBar = () => {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (route) => {
    navigate(route, { replace: true });
    setActiveButton(route);
  };

  return (
    <div className="image-container">
      <button
        className={`image-button ${activeButton === "/" ? "active" : ""}`}
        onClick={() => handleButtonClick("/")}
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
  );
};
export default IconNavBar;
