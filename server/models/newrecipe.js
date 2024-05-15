const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
    name: String,
    amount: Number,
    unit: String
});

const recipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ingredients: [ingredientSchema],
    instructions: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    source: String
});

const Newrecipe = mongoose.model('Recipe', recipeSchema);

module.exports = Newrecipe;
