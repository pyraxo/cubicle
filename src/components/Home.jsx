import React, { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import Room from "./Room";
import IconNavBar from "./IconNavBar";

import "./Home.css";

const Home = () => {
  const [userData] = useLocalStorage("userData", {});
  
  return (
    <>
      <div className="home">
        <h1 className="welcome">Welcome back, {userData.username}!</h1>
        <Room />
        <IconNavBar></IconNavBar>
      </div>
    </>
  );
};

export default Home;
