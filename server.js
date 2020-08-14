const express = require('express');

const recipeRouter = require('./recipes/recipe-router.js');
const ingredientRouter = require('./recipes/ingredient-router.js');

const server = express();

server.use(express.json());
server.use('/api/recipes', recipeRouter);
server.use('/api/ingredients', ingredientRouter);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

// module.exports = server;