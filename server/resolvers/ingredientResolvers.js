const fetch = require('node-fetch');
const apiKey = process.env.SPOONACULAR_API_KEY;

const ingredientResolvers = {
  Query: {
    searchIngredients: async (_, { query }) => {
      const url = `https://api.spoonacular.com/food/ingredients/search?query=${query}&apiKey=${apiKey}`;
      
      try {
        const response = await fetch(url);
        const data = await response.json();
        return data.results;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch ingredient data');
      }
    },
  },
};

module.exports = ingredientResolvers;
