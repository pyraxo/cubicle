import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import React, { useEffect, useState } from "react";

import Login from "./components/Login";
import CharCreate from "./components/CharCreate";
import Rooms from "./components/Rooms";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/CharCreate" element={<CharCreate />} />
        <Route path="/Rooms" element={<Rooms />} />
      </Routes>
    </Router>
  );
}

export default App;
