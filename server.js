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

server.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  users
    .findByUsername(username)
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        res
          .status(200)
          .json({ message: `Welcome ${user.username}!`, id: user.id });
      } else {
        res.status(401).json({ message: "Bad request. Invalid credentials" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Coud not login: " + err.message });
    });
});

server.get("/api/users", (req, res) => {
  users
    .find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ message: "Could not get users: " + err.message });
    });
});

module.exports = server;
