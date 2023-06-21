import React, { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import Room from "./Room";
import IconNavBar from "./IconNavBar";

import "./Home.css";
import Blur from "./Blur";

const Home = () => {
  const [userData] = useLocalStorage("userData", {});

  return (
    <>
      <Blur />
      <div className="home">
        <h1 className="welcome">Welcome back, {userData.username}!</h1>
        <Room hostName={userData.username} />
        <IconNavBar />
      </div>
    </>
  );
};

export default Home;
