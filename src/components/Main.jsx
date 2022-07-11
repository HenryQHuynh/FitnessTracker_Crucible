import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import "../css/Main.css";
import "../css/Title.css";
import CrucibleD2 from "../images/CrucibleD2.jpeg";

import {
  NavBar,
  Register,
  Login,
  Routines,
  MyRoutines,
  Home,
  Activities,
  Footer,
} from "./index";
import { getUser } from "../api";

const Main = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  // check local storage for token, if there is one, log in the associated user
  useEffect(() => {
    const checkUser = async () => {
      try {
        const localStorageToken = localStorage.getItem("token");
        if (localStorageToken) {
          setToken(localStorageToken);
          setIsLoggedIn(true);
          const response = await getUser(localStorageToken);
          setUser(response);
        }
      } catch (error) {
        throw error;
      }
    };

    checkUser();
  }, []);

  return (
    <div className="main-container">

      <header>
        <div className="title-container">
          <h1 className="main-title">Crucible Tracker</h1>
          <a href='https://crucible.report/' target='_blank' rel="noreferrer">
            <img className="crucibleIcon" src={CrucibleD2} alt="Guardians clashing" />
          </a>
          {/* Add a Span image here! */}
          {user.username ? <small>Logged in as: {user.username}</small> : null}
        </div>
        <NavBar
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setToken={setToken}
          setUser={setUser}
        />
      </header>

      <Switch>
        <Route exact path={"/"}>
          <Home />
        </Route>
        <Route path={"/routines"}>
          <Routines />
        </Route>
        <Route path={"/myroutines"}>
          <MyRoutines isLoggedIn={isLoggedIn} token={token} user={user} />
        </Route>
        <Route path={"/activities"}>
          <Activities isLoggedIn={isLoggedIn} token={token} />
        </Route>
        <Route path={"/login"}>
          <Login
            setUser={setUser}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            setToken={setToken}
          />
        </Route>
        <Route path={"/register"}>
          <Register
            setUser={setUser}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            setToken={setToken}
          />
        </Route>
      </Switch>
      
      <Footer />

    </div>
  );
};

export default Main;