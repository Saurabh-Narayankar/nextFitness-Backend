const express = require('express')

const router = express.Router()

const recipeController = require('../controllers/recipeController')


router.get('/recipes/singleRecipe/:cuisine/:course/:id', recipeController.getSinglerecipe)


router.post('/recipes/addRecipe', recipeController.addRecipe)


router.get('/recipes/:cuisine/:course/:dietType', recipeController.filterRecipes)

module.exports = router