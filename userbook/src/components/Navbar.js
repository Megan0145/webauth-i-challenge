import React from "react";
import { NavLink, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import axios from "axios";
import { StyledNav } from "../styles";

export default function Navbar(props) {
  function logout() {
    axios
      .get("/api/logout")
      .then(res => {
        props.history.push("/");
      })
      .catch(err => {
        console.log(err);
      });
  }
  return (
    <div>
      <StyledNav>
        <div>
          <NavLink exact to="/">
            Home
          </NavLink>
        </div>
        <div>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
          <button onClick={logout}>Logout</button>
        </div>
      </StyledNav>
      <main>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </main>
    </div>
  );
}
