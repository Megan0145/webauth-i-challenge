import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import UserCard from "./UserCard";
import { StyledHome } from "../styles";

export default function Home(props) {
  const [users, setUsers] = useState(null);
  const user = useRef("");
  const mockusers = [
    { id: 1, username: "Sarah" },
    { id: 2, username: "Megan" },
    { id: 3, username: "Tony" },
    { id: 4, username: "Zach" },
    { id: 5, username: "Caolan" },
    { id: 6, username: "Pat" }
  ];
  
  const search = (e) => {
      e.preventDefault();
      axios.get("/api/users/:username")
      .then(res => {
          setUsers(res.data)
      })
      .catch(err => {
          console.log(err)
      })
  }

    useEffect(() => {
      axios
        .get("/api/users")
        .then(res => {
          setUsers(res.data);
        })
        .catch(err => {
          setUsers(mockusers);
        });
    }, [users]);
  if (!users) {
    return <p> Login to see users </p>;
  }
  return (
    <StyledHome>
      <div className="jumbo">
        <h1>Meet thousands of users with mutual interests</h1>
      </div>
      <div className='searchbar'>
        <input placeholder='Search by Username' ref={user}/>
        <button onClick={search}>Go</button>
      </div>
      {users.map(user => {
        return <UserCard key={user.id} user={user} />;
      })}
    </StyledHome>
  );
}
