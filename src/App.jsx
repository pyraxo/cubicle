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
import CharCreate from "./components/CharCreate";
import Rooms from "./components/Rooms";
import Home from "./components/Home";

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
          <Route path="/room/:hostName" element={<Rooms />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
