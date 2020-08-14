const ingredientsDb = require('../db-config.js');
const { returning } = require("../db-config.js");

// above the fold
module.exports = {
    getShoppingList,
    getShoppingListById,
    // getShoppingList(recipe_id),
    addIngredient,
    update,
    remove
};

function getShoppingList(id) {
    return ingredientsDb('ingredients');
};

function getShoppingListById(id) {
    return ingredientsDb('ingredients').where({ id }).first();
};

function addIngredient(ingredient) {
    return (
        ingredientsDb('ingredients')
            .insert(ingredient)
            // .returning("id")
            .then(ids => {
                const id = ids[0];

                return getShoppingListById(id);
            })
    );
};

function update(id, changes) {
    return ingredientsDb("ingredients")
        .where({ id })
        .update(changes)
        .then((count) => {
            return getShoppingListById(id);
        });
};

function remove(id) {
    return ingredientsDb("ingredients").where({ id }).del();
};

