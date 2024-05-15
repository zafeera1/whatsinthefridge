import React, { useState, useEffect } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';

function Fridge() {
  const [searchIngredients, setSearchIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fridgeItems, setFridgeItems] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem('fridgeItems'));
    if (savedItems) {
      setFridgeItems(savedItems);
    }
  }, []);

  const { loading: queryLoading, error: queryError, data } = useQuery(GET_RECIPES, {
    variables: { ingredients: fridgeItems },
    skip: !fridgeItems.length, 
    onCompleted: (data) => {
      setRecipes(data.searchRecipesByIngredients);
      setLoading(false);
    },
    onError: (error) => {
      setError('Failed to fetch recipes. Please try again.');
      setLoading(false);
    }
  });

  useEffect(() => {
    if (queryError) {
      setError('Failed to fetch recipes. Please try again.');
      setLoading(false);
    }
  }, [queryError]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddToFridge = () => {
    if (inputValue.trim() !== '') {
      const newItem = inputValue.trim();
      setFridgeItems([...fridgeItems, newItem]);
      setInputValue('');
      localStorage.setItem('fridgeItems', JSON.stringify([...fridgeItems, newItem]));
    }
  };

  const handleSearch = () => {
    setLoading(true);
    setError('');
  };

  return (
    <div className="RecipeFinder">
      <h2>Recipe Finder</h2>
      <div className="fridge-section">
        <h3>My Fridge</h3>
        <div className="ingredient-input">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter ingredients..."
          />
          <button onClick={handleAddToFridge}>Add to Fridge</button>
        </div>
        <div id="fridge" className="ingredient-box">
          {fridgeItems.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </div>
      </div>
      <div className="search-section">
        <h3>Search for Recipes</h3>
        <div className="ingredient-input">
          <input
            type="text"
            value={searchIngredients}
            onChange={(e) => setSearchIngredients(e.target.value)}
            placeholder="Enter ingredients..."
          />
          <button onClick={handleSearch} disabled={!searchIngredients || loading || queryLoading}>
            {loading || queryLoading ? 'Searching...' : 'Search for Recipes'}
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
    </div>
  );
}

export default Fridge;
