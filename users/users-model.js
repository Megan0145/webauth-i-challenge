const db = require("../data/dbConfig.js");

module.exports = {
  add
};

function add(user) {
  return db("users").insert(user);
}
