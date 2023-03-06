exports.up = function (knex) {
  return knex.schema.createTable("palletes", function (table) {
    table.increments("id");
    table.json("colors", 255).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("palletes");
};
