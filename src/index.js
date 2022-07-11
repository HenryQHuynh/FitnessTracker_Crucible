import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Main } from "./components";

ReactDom.render(
  <Router>
    <Main />
  </Router>,
  document.getElementById("app")
);

// Username: Starside
// Password: Gemini12!