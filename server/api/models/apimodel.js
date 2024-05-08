const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
    name: String,
    amount: Number,
    unit: String
});

const apiRecipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ingredients: [ingredientSchema],
    instructions: { type: String, required: true },
    sourceURL: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const ApiRecipe = mongoose.model('ApiRecipe', apiRecipeSchema);

module.exports = ApiRecipe;
