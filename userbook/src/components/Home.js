import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function Home(props){
    const [users, setUsers] = useState(null);
    useEffect(() => {
      axios
        .get("/api/users")
        .then(res => {
          setUsers(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }, []);
    if(!users){
        return <p> Login to see users </p>
    }
    return (
        <div>
            {
                users.map(user => {
                    return <p>{user.username}</p>
                })
            }
        </div>
    );
}