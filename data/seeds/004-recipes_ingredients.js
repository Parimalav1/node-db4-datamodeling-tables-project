
exports.seed = function(knex) {
  return knex('recipes_ingredients').insert([
    {
      id: 1,
      recipe_id: 1,
      ingredient_id: 1
    },
    {
      id: 2,
      recipe_id: 1,
      ingredient_id: 3
    },
    {
      id: 3,
      recipe_id: 1,
      ingredient_id: 4
    },
    {
      id: 4,
      recipe_id: 1,
      ingredient_id: 5
    },
    {
      id: 5,
      recipe_id: 2,
      ingredient_id: 2
    },
    {
      id: 6,
      recipe_id: 2,
      ingredient_id: 4
    },
    {
      id: 7,
      recipe_id: 2,
      ingredient_id: 5
    }
  ]);
};
