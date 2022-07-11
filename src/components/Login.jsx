import React, { useState } from "react";
import { loginUser } from "../api";

// Shown in Main.jsx; Similar structure as Register.jsx
const Login = ({
  setUser,
  username,
  setUsername,
  password,
  setPassword,
  setIsLoggedIn,
  setToken,
}) => {
  const [message, setMessage] = useState("");
  const [clickedSubmit, setClickedSubmit] = useState(false);

  return (
    <div className="registration-page">
      <h2>The Crucible is open</h2>
      <div className="form-container">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              const response = await loginUser(username, password);
              if (response.message === "you're logged in!") {
                setIsLoggedIn(true);
                setToken(response.token);
                localStorage.setItem("token", response.token);
                setUser(response.user);
              }
              setMessage(response.message);
              setClickedSubmit(true);
              setUsername("");
              setPassword("");
            } catch (error) {
              console.error("There was a problem with your login.", error);
            }
          }}
        >
          <label>Username: </label>
          <input
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <label>Password: </label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button type="submit">Login</button>
        </form>
        <span className="registration-confirm">
          {clickedSubmit ? <p>{message}</p> : null}
        </span>
      </div>
    </div>
  );
};

export default Login;