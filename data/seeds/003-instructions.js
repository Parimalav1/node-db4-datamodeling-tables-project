
exports.seed = function (knex) {
  return knex('instructions').insert([
    {
      id: 1,
      description: 'Boil pasta in water for 11min',
      recipe_id: 1
    },
    {
      id: 2,
      description: 'Fry onions, chicken and other veggies',
      recipe_id: 1
    },
    {
      id: 3,
      description: 'Add chicken and spices',
      recipe_id: 1
    },
    {
      id: 4,
      description: 'Fry chalupas for few min on each side',
      recipe_id: 2
    },
    {
      id: 5,
      description: 'Fry onions, chicken and other veggies',
      recipe_id: 2
    },
    {
      id: 6,
      description: 'Put chicken, sour cream and sopices into chalupa',
      recipe_id: 2
    },
    {
      id: 7,
      description: 'Toast bread',
      recipe_id: 5
    },
    {
      id: 8,
      description: 'Add canned tuna and spices in a bowl',
      recipe_id: 5
    },
    {
      id: 9,
      description: 'Put tuna into bread and grill',
      recipe_id: 5
    }
  ]);
};
