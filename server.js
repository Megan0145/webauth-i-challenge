const express = require("express");
const server = express();
const bcrypt = require("bcryptjs");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);

const users = require("./users/users-model");

const sessionConfig = {
  name: "test",
  secret: "secret value",
  cookie: {
    // 1 hour, needed if cookie is to survive,
    // after the browser will try send a cookie and
    // the server will reject
    maxAge: 1000 * 60 * 60,
    // should come from env
    // eg secure: process.env.NODE_ENV === 'development'
    // cookie only gets set when https!
    secure: false,
    // should cookie be accesible from client JS ?
    // if fasle our React code will not be able to read cookies
    // scenarios where React needs access to cookies set on the client
    // increases risk tho
    httpOnly: false
  },
  // in general should be false,
  // otherwise express is pretty aggressive about resaving session
  // even if nothing has changed
  resave: false,
  saveUninitialized: false,
  store: new KnexSessionStore({
    knex: require("./data/dbConfig"),
    tablename: "sessions",
    sidfieldname: "sid",
    createtable: true,
    clearInterval: 1000 * 60 * 60
  })
};

server.use(express.json());
server.use(session(sessionConfig));

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
        req.session.user = user;
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
  } else {
    res.end();
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
