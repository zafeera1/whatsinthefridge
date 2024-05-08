const ApiRecipe = require('./models/apimodel');
const recipesData = require('./data/data.js')

recipesData.forEach(async (recipeData) => {
    try {
        const newRecipe = new ApiRecipe({
            name: recipeData.strMeal,
            ingredients: [], 
            instructions: recipeData.strInstructions,
            sourceURL: recipeData.strSource,
            createdAt: new Date()
        });

        for (let i = 1; i <= 20; i++) {
            const ingredient = recipeData[`strIngredient${i}`];
            const measure = recipeData[`strMeasure${i}`];
            if (ingredient && measure) {
                newRecipe.ingredients.push({ name: ingredient, amount: measure });
            }
        }

        await newRecipe.save();
        console.log(`Recipe "${newRecipe.name}" saved to the database.`);
    } catch (error) {
        console.error(`Error saving recipe: ${error.message}`);
    }
});
