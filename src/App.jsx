import "./App.css";

import {
  Navigate,
  Outlet,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import React, { useEffect, useState } from "react";

import useLocalStorage from "./hooks/useLocalStorage";

import Login from "./components/Login";
import Rooms from "./components/Rooms";
import Home from "./components/Home";
import VisitingRoom from "components/VisitingRoom";

const AuthWrapper = () => {
  const [userData] = useLocalStorage("userData", {});
  console.log(userData.userId ? "OK" : "redirect");
  return userData.userId ? <Outlet /> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AuthWrapper />}>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/room/:hostName" element={<VisitingRoom />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
