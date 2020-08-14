const express = require('express');

const Ingredients = require('./recipe-model.js');
const ingredientsDb = require('../db-config.js');

const router = express.Router();

router.get('/', (req, res) => {
    Ingredients.getShoppingList()
        .then(ingredients => {
            res.json(ingredients);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get ingredients' });
        });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    Ingredients.getShoppingListById(id)
        .then(ingredient => {
            if (ingredient) {
                res.json(ingredient);
            } else {
                res.status(404).json({ message: 'Could not find ingredient with given id.' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get ingredient' });
        });
});

router.post('/', (req, res) => {
    const ingredientData = req.body;

    Ingredients.addIngredient(ingredientData)
        .then(ingredient => {
            res.status(201).json(ingredient);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to create new ingredient' });
        });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    Ingredients.getShoppingListById(id)
        .then(ingredient => {
            if (ingredient) {
                Ingredients.update(id, changes)
                    .then(updatedIngredient => {
                        res.json(updatedIngredient);
                    })
                    .catch(err => {
                        res.status(500).json({ message: 'Failed to update ingredient' });
                    });
            } else {
                res.status(404).json({ message: 'Could not find ingredient with given id' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to update ingredient' });
        });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Ingredients.remove(id)
        .then(deleted => {
            if (deleted) {
                res.json({ removed: deleted });
            } else {
                res.status(404).json({ message: 'Could not find ingredient with given id' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to delete ingredient' });
        });
});

module.exports = router;

