const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
    name: String,
    amount: Number,
    unit: String
});

const aiRecipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ingredients: [ingredientSchema],
    instructions: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const AiRecipe = mongoose.model('AiRecipe', aiRecipeSchema);

module.exports = AiRecipe;
