import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import uuid from "react-uuid";

import useLocalStorage from "../hooks/useLocalStorage";
import { fetchValue, saveValue } from "../services/Firebase";

import "./Login.css";

const Login = () => {
  const { state } = useLocation();
  const { from } = state || {};
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    const data = await fetchValue(`users/${username}`);

    if (data && data.password.toString() === password) {
      const { userId } = data;
      localStorage.setItem("userData", JSON.stringify({ username, userId }));
      console.log("login");
      navigate("/", { replace: true });
    }
  };

  const handleSignUp = async () => {
    const dbpath = `users/${username}`;
    const data = await fetchValue(dbpath);
    // TODO: Sanitise inputs and throw error if non-alphanumerical
    if (!data || !data.userId) {
      const userId = uuid();
      await saveValue(dbpath, { password, userId });
      localStorage.setItem("userData", JSON.stringify({ username, userId }));
      navigate("/", { replace: true });
      console.log("inv");
    }
  };

  return (
    <div className="login">
      <h1>Cubicle!</h1>
      <div>
        <div>
          <div>Login</div>
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSignIn()}
            />
          </div>
          <div>
            <button onClick={handleSignIn}>Login</button>
          </div>
          <div>Signup</div>
          <div>
            <input
              type="text"
              placeholder="New username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSignUp()}
            />
          </div>
          <div>
            <button onClick={handleSignUp}>Sign up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
