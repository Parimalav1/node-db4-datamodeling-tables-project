// - `getRecipes()`: should return a list of all recipes in the database.
// - `getShoppingList(recipe_id)`: should return a list of all ingredients and quantities for a given recipe
// - `getInstructions(recipe_id)`: should return a list of step by step instructions for preparing a recipe
// - `any additional data access helpers`

// Organize and name your files anyway you see fit.

const recipesDb = require("../db-config.js");
const instructionsDb = require("../db-config.js");

// above the fold
module.exports = {
    getRecipes,
    getRecipesById,
    // getInstructions(recipe_id),
    getInstructions,
    addRecipe,
    // addInstructions,
    update,
    remove
};

// implementation
function getRecipes() {
    return recipesDb("recipes");
};

function getRecipesById(id) {
    return recipesDb('recipes').where({ id }).first();
};
  
function getInstructions(id) {
    return getRecipesById(id)
        .then(recipe => {
            if(recipe) {
                return instructionsDb('instructions').where({recipe_id: id})
            }
        })
        .catch(err => console.log('ERROR'));
};

function addRecipe(recipe) {
    return (
        recipesDb('recipes')
            .insert(recipe)
            // .returning("id")
            .then(ids => {
                const id = ids[0];

                return getRecipesById(id);
            })
    );
};

// function addInstructions(step, recipe_id) {
//     let newStep = { ...step, recipe_id };
//     return (
//         recipesDb('recipes')
//             .insert(newStep)
//             // .returning('id')
//             .then(stepIds => {
//                 const id = stepIds[0]
//                 return (id);
//             })
//     )
// };

function update(id, changes) {
    return recipesDb("recipes")
        .where({ id })
        .update(changes)
        .then((count) => {
            return findById(id);
        });
};

function remove(id) {
    return recipesDb("recipes").where({ id }).del();
};


