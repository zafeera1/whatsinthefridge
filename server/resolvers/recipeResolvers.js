const apiKey = process.env.SPOONACULAR_API_KEY;

const recipeResolvers = {
    Query: {
      searchRecipesByIngredients: async (_, { ingredients }) => {
        const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients.join(',')}&apiKey=${apiKey}`;
        
        try {
          const response = await fetch(url);
          const data = await response.json();
          return data;
        } catch (error) {
          console.error(error);
          throw new Error('Failed to fetch recipe data');
        }
      },
    },
  };
  
  module.exports = recipeResolvers;