
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: "John", password: "lambda"},
        {username: "Grace", password: "lambda"},
        {username: "Sarah", password: "lambda"},
        {username: "Tony", password: "lambda"},
        {username: "Tim", password: "lambda"},
        {username: "Shannon", password: "lambda"},
      ]);
    });
};
