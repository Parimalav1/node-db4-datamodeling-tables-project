// - `GET /api/recipes/`: all recipes (without details about ingredients or steps)
// - `GET /api/recipes/:id/shoppingList`: a list of ingredients and quantites for a single recipe
// - `GET /api/recipes/:id/instructions`: a correctly ordered list of how to prepare a single recipe
// - `GET /api/ingredients/:id/recipes`: all recipes in the system that utilize a single ingredient 

const express = require('express');

const Recipes = require('./recipe-model.js');
const Ingredients = require('./ingredient-model.js');

const router = express.Router();

router.get('/', (req, res) => {
    Recipes.getRecipes()
  .then(recipes => {
    res.json(recipes);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get recipes' });
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Recipes.getRecipesById(id)
  .then(recipe => {
    if (recipe) {
      res.json(recipe);
    } else {
      res.status(404).json({ message: 'Could not find recipe with given id.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get recipes' });
  });
});


router.get('/:id/shoppingList', (req, res) => {
  const { id } = req.params;

  Ingredients.getShoppingList(id)
  .then(ingredients => {
    if (ingredients.length) {
      res.json(ingredients);
    } else {
      res.status(404).json({ message: 'Could not find ingredients for given recipe' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get ingredients' });
  });
});

router.get('/:id/instructions', (req, res) => {
  const { id } = req.params;

  Recipes.getInstructions(id)
  .then(steps => {
    if (steps.length) {
      res.json(steps);
    } else {
      res.status(404).json({ message: 'Could not find steps for given scheme' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get steps' });
  });
});

router.post('/', (req, res) => {
  const recipeData = req.body;

  Recipes.addRecipe(recipeData)
  .then(recipe => {
    res.status(201).json(recipe);
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new recipe' });
  });
});

router.post('/:id/instructions', (req, res) => {
  const stepData = req.body;
  const { id } = req.params; 

  Recipes.getRecipesById(id)
  .then(recipe => {
    if (recipe) {
        Instructions.addInstructions(stepData, id)
      .then(step => {
        res.status(201).json(step);
      })
    } else {
      res.status(404).json({ message: 'Could not find recipe with given id.' })
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new step' });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Recipes.getRecipesById(id)
  .then(recipe => {
    if (recipe) {
        Recipes.update(id, changes)
      .then(updatedRecipe => {
        res.json(updatedRecipe);
      })
      .catch (err => {
        res.status(500).json({ message: 'Failed to update recipe' });
      });
    } else {
      res.status(404).json({ message: 'Could not find recipe with given id' });
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to update recipe' });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Recipes.remove(id)
  .then(deleted => {
    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res.status(404).json({ message: 'Could not find recipe with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete recipe' });
  });
});

module.exports = router;