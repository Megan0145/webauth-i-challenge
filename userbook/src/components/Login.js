import React, { useRef } from "react";
import axios from "axios";

export default function Login(props) {
  const username = useRef("");
  const password = useRef("");
  const submit = e => {
    e.preventDefault();
    axios
      .post("http://localhost:4500/api/login", {
        username: username.current.value,
        password: password.current.value
      })
      .then(res => {
        console.log(props.history.push("/"));
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <div>
      LOGIN
      <form>
        <input placeholder="Username" ref={username} />
        <input placeholder="Password" ref={password} />
        <button onClick={submit}>Go</button>
      </form>
    </div>
  );
}
