const express = require("express");
const server = express();
const bcrypt = require("bcryptjs");

const users = require("./users/users-model");

server.use(express.json());

server.get("/", (req, res) => {
  res.json("Welcome!");
});

server.post("/api/register", (req, res) => {
  const { username, password } = req.body;
  const hashedpw = bcrypt.hashSync(password, 11);
  const newUser = {
    username,
    password: hashedpw
  };

  users
    .add(newUser)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.json(500).json({ message: "Could not add new user: " + err.message });
    });
});

module.exports = server;
