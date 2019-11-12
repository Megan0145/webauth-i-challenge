const express = require("express");
const server = express();
const bcrypt = require("bcryptjs");
const session = require("express-session");

const users = require("./users/users-model");

server.use(express.json());
server.use(
  session({
    name: "user_sid",
    secret: "bla bla bla ",
    cookie: {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      secure: true,
      httpOnly: true
    },
    resave: false,
    saveUninitialized: false
  })
);

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
        req.session.user = user.id;
        req.session.save();
      } else {
        res.status(401).json({ message: "Bad request. Invalid credentials" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Coud not login: " + err.message });
    });
});

server.get("/api/users", restricted, (req, res) => {
  users
    .find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ message: "Could not get users: " + err.message });
    });
});

server.get("/api/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.send("error logging out");
      } else {
        res.send("good bye");
      }
    });
  }
});

// function restricted(req, res, next) {
//   const { username, password } = req.headers;
//   users
//     .findByUsername(username)
//     .then(user => {
//       if (user && bcrypt.compareSync(password, user.password)) {
//         next();
//       } else {
//         res.status(401).json({ message: "You shall not pass: " });
//       }
//     })
//     .catch(err => {
//       res.status(500).json({ message: err.message });
//     });
// }

function restricted(req, res, next) {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ message: "You shall not pass" });
  }
}

module.exports = server;
