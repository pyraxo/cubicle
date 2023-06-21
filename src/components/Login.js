import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import uuid from "react-uuid";
import cubicleLogo from "../assets/cubicle_logo.png";

import useLocalStorage from "../hooks/useLocalStorage";
import { fetchValue, saveValue } from "../services/Firebase";
import { TextField, Button } from "@mui/material";

import "./Login.css";

const validUsername = new RegExp("^[a-zA-Z0-9]+$");

const Login = () => {
  const { state } = useLocation();
  const { from } = state || {};
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleTogglePage = () => {
    setIsLogin((prevState) => !prevState);
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
    setUsernameError(!validUsername.test(e.target.value));
  };

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
    <div className="login_container">
      <div className="login">
        <h1>Cubicle</h1>
        <div>
          <div>
            <img src={cubicleLogo} alt="" id="cubicle_logo" />
            <h2 className="login_header1">
              Bridge the Distance <br></br>
              Revive the Buzz
            </h2>
            {/* <h2 className="login_header2">Revive the Buzz</h2> */}

            {isLogin ? (
              // Render login section
              <div>
                <div className="field_container">
                  <TextField
                    id="outlined-basic"
                    label="Username"
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="field_container">
                  <TextField
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSignIn()}
                  />
                </div>
                <div className="button_container">
                  <Button variant="contained" onClick={handleSignIn}>
                    Login
                  </Button>
                </div>
              </div>
            ) : (
              // Render signup section
              <div>
                <div className="field_container">
                  <TextField
                    error={usernameError}
                    id={usernameError ? "outlined-error" : "outlined-basic"}
                    label="Username"
                    variant="outlined"
                    value={username}
                    helperText={
                      usernameError ? "Username must be alphanumeric" : ""
                    }
                    onChange={handleUsername}
                  />
                </div>

                <div className="field_container">
                  <TextField
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSignUp()}
                  />
                </div>
                <div className="button_container">
                  <Button variant="contained" onClick={handleSignUp}>
                    Sign up
                  </Button>
                </div>
              </div>
            )}
            <div className="button_container">
              <Button variant="contained" onClick={handleTogglePage}>
                {isLogin ? "New here? Click me!" : "Have an account?"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
