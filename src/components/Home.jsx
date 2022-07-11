import React from "react";
import crucible2 from "../images/crucible2.jpg";
import "../css/Main.css";

const Home = () => {
  return (
    <body>
      <a href='https://destinytracker.com/' target='_blank' rel="noreferrer">
        <img id="crucible" src={crucible2} alt="Guardians clashing" />
      </a>
    </body>
  )
};

export default Home;