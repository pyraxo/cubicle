import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import uuid from "react-uuid";
import { TextField, Button } from "@mui/material";

import cubicleLogo from "assets/cubicle_logo.png";
import { fetchValue, saveValue } from "../services/Firebase";

import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleTogglePage = () => {
    setIsLogin((prevState) => !prevState);
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
                    id="outlined-basic"
                    label="New Username"
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div className="field_container">
                  <TextField
                    id="outlined-basic"
                    label="New Password"
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
            {isLogin ? (
              <div className="button_container">
                <Button variant="contained" onClick={handleTogglePage}>
                  New here? Click me!
                </Button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
