const db = require("../data/dbConfig.js");

module.exports = {
  add,
  findByUsername
};

function add(user) {
  return db("users").insert(user);
}

function findByUsername(username) {
    return db("users").where({ username });
}