import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function Home(props){
    const [users, setUsers] = useState(null);
    useEffect(() => {
      axios
        .get("http://localhost:4500/api/users")
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }, []);
    return (
        <div>HOME</div>
    );
}