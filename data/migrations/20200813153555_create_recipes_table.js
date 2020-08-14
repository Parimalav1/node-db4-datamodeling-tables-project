
exports.up = function(knex) {
  return knex.schema 
    .createTable('recipes', recipes => {
        recipes.increments('id');
        recipes.string('name', 128).notNullable().unique().index();
    })
    .createTable('ingredients', items => {
        items.increments('id');
        items.string('ingredient', 128).notNullable();
        items.float('quantity').notNullable();
        items.text('unit').notNullable();
    })
    .createTable('instructions', steps => {
        steps.increments('id');
        // items.integer('step_no').notNullable().unsigned();
        steps.text('description', 255).notNullable();

        steps.integer('recipe_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('recipes')
            .onDelete("RESTRICT") // CASCADE, RESTRICT, SET NULL, DO NOTHING, SET DEFAULT
            .onUpdate("CASCADE");
    })
    .createTable('recipes_ingredients', tbl => {
        tbl.increments('id');
        tbl.integer('recipe_id')
             .notNullable()
            .unsigned()
            .references('id')
            .inTable('recipes')
            .onDelete("RESTRICT") // CASCADE, RESTRICT, SET NULL, DO NOTHING, SET DEFAULT
            .onUpdate("CASCADE");
        tbl.integer('ingredient_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('ingredients')
            .onDelete("RESTRICT") // CASCADE, RESTRICT, SET NULL, DO NOTHING, SET DEFAULT
            .onUpdate("CASCADE");
    })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('recipes_ingredients')
        .dropTableIfExists('instructions')
        .dropTableIfExists('ingredients')
        .dropTableIfExists('recipes');
};
