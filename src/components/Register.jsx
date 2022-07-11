import React, { useState } from "react";
import { registerUser } from "../api";
import "../css/Register.css";


// see login component for specific notes
const Register = ({
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
      <h2>Welcome to the Crucible</h2>
      <div className="form-container">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              const response = await registerUser(username, password);
              if (response.message === "you're signed up!") {
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
              console.error(
                "There was a problem with your registration.",
                error
              );
            }
          }}
        >
          <label>Username:</label>
          <input
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <label>Password:</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button type="submit">Register</button>
        </form>
        <span className="registration-confirm">
          {clickedSubmit ? <p>{message}</p> : null}
        </span>
      </div>
    </div>
  );
};

export default Register;