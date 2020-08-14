
exports.seed = function(knex) {
  return knex('ingredients').insert([
    {
      id: 1,
      ingredient: 'bowtie pasta',
      quantity: 3,
      unit: 'cup'
    },
    {
      id: 2,
      ingredient: 'chalupas',
      quantity: 2,
      unit: 'no' 
    },
    {
      id: 3,
      ingredient: 'butter',
      quantity: 2,
      unit: 'tbsps'
    },
    {
      id: 4,
      ingredient: 'chicken',
      quantity: 2,
      unit: 'cup'
    },
    {
      id: 5,
      ingredient: 'onions',
      quantity: 1,
      unit: 'cup'
    },
    {
      id: 6,
      ingredient: 'mixed veggies',
      quantity: 3,
      unit: 'cup'
    }
  ]);
};
