exports.seed = function(knex) {
  return knex('recipes').insert([ // or return knex('schemes').truncate()
    {id: 1, name: 'Pasta'},
    {id: 2,name: 'Chicken Chalupa'},
    {id: 3,name: 'Lasagna'},
    {id: 4,name: 'Pulao'},
    {id: 5,name: 'Tuna Sandwich'},
    {id: 6,name: 'Biryani'}
  ]);
};
