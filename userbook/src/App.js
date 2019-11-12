import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
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
    <Router>
      <Navbar />
    </Router>
  );
}

export default App;
