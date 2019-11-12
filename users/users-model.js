const db = require("../data/dbConfig.js");

module.exports = {
  add,
  find,
  findByUsername
};

function add(user) {
  return db("users")
    .insert(user)
    .then(ids => {
      return findById(ids[0]);
    });
}

function find() {
  return db("users");
}

function findById(id) {
  return db("users").where({ id });
}

function findByUsername(username) {
  return db("users")
    .first()
    .where({ username });
}
