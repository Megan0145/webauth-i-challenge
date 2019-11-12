import React, { useRef } from 'react';
import axios from 'axios';

export default function Register(props){
    const username = useRef("");
    const password = useRef("");
    const submit = e => {
      e.preventDefault();
      axios
        .post("/api/register", {
          username: username.current.value,
          password: password.current.value
        })
        .then(res => {
          props.history.push("/login");
        })
        .catch(err => {
          console.log(err);
        });
    };
    return (
      <div>
        REGISTER
        <form>
          <input placeholder="Username" ref={username} />
          <input placeholder="Password" ref={password} />
          <button onClick={submit}>Go</button>
        </form>
      </div>
    );
}