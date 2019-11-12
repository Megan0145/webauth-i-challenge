import React, { useRef } from "react";
import axios from "axios";
import { StyledForm } from '../styles';

export default function Login(props) {
  const username = useRef("");
  const password = useRef("");
  const submit = e => {
    e.preventDefault();
    axios
      .post("/api/login", {
        username: username.current.value,
        password: password.current.value
      })
      .then(res => {
        props.history.push("/");
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <StyledForm>
      <h1> Login</h1>
      <form>
        <input placeholder="Username" ref={username} type="text"/>
        <input placeholder="Password" ref={password} type="password"/>
        <button onClick={submit}>Go</button>
      </form>
    </StyledForm>
  );
}
