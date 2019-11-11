const db = require("../data/dbConfig.js");

module.exports = {
  add,
  find,
  findByUsername
};

function add(user) {
  return db("users").insert(user);
}

function find() {
  return db("users");
}

function findByUsername(username) {
  return db("users")
    .first()
    .where({ username });
}
