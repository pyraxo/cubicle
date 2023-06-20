import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import useLocalStorage from "../hooks/useLocalStorage";
import Cubicle from "./Cubicle";

import "./Home.css";

const Home = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useLocalStorage("userData", {});

  return (
    <>
      <Cubicle />
    </>
  );
};

export default Home;
