import React, { useState } from 'react';
import './styles/style.css';
import { savedIngredients } from './components/Fridge';
function ApiPage({ savedIngredients }) {
    const [searchIngredients, setSearchIngredients] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
  
    const handleSearch = async () => {
      setLoading(true);
      setError('');
  
      try {
        const allIngredients = [...savedIngredients, ...searchIngredients.split(',')];
        const ingredientsString = allIngredients.join(',');
        //EDIT THE API LINK
        const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsString}`);
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }
        const data = await response.json();
        const sortedRecipes = data.sort((a, b) => (a.usedIngredientCount + a.missedIngredientCount) - (b.usedIngredientCount + b.missedIngredientCount));
        setRecipes(sortedRecipes);
      } catch (error) {
        setError('Failed to fetch recipes. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="ApiPage">
        <h2>Search for Recipe</h2>
        <div className="ingredient-input">
          <input
            type="text"
            value={searchIngredients}
            onChange={(e) => setSearchIngredients(e.target.value)}
            placeholder="Enter ingredients..."
          />
          <button onClick={handleSearch} disabled={!searchIngredients || loading}>
            {loading ? 'Searching...' : 'Search for Recipe'}
          </button>
        </div>
        {error && <p className="error">{error}</p>}
        {recipes.length > 0 && (
          <div className="recipe-list">
            <h3>Recipes:</h3>
            {recipes.map((recipe) => (
              <div key={recipe.id} className="recipe">
                <img src={recipe.image} alt={recipe.title} />
                <h4>{recipe.title}</h4>
                <p>Total ingredients: {recipe.usedIngredientCount + recipe.missedIngredientCount}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
  
  export default ApiPage;