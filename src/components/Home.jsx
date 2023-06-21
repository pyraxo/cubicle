import "./Home.css";
import React, { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import Room from "./Room";
import Blur from "./Blur";
import IconNavBar from "./IconNavBar";

const Home = () => {
  const [userData] = useLocalStorage("userData", {});

  return (
    <>
      <Blur />
      <div className="home">
        <h1 className="welcome">Welcome back, {userData.username}!</h1>
        <Room hostName={userData.username} />
        <IconNavBar username={userData.username} />
      </div>
    </>
  );
};

export default Home;
