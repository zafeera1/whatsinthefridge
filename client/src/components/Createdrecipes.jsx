import React, { useState, useEffect } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';

const GET_USER_RECIPES = gql`
  query GetUserRecipes($userId: ID!) {
    getUserRecipes(userId: $userId) {
      id
      title
      ingredients
      instructions
      image
    }
  }
`;

const CREATE_RECIPE = gql`
  mutation CreateRecipe($userId: ID!, $title: String!, $ingredients: [String!]!, $instructions: String!, $image: String) {
    createRecipe(userId: $userId, title: $title, ingredients: $ingredients, instructions: $instructions, image: $image) {
      id
      title
      ingredients
      instructions
      image
    }
  }
`;

function Profile({ userId }) {
  const { loading, error, data } = useQuery(GET_USER_RECIPES, {
    variables: { userId },
  });

  const [createRecipe] = useMutation(CREATE_RECIPE, {
    refetchQueries: [{ query: GET_USER_RECIPES, variables: { userId } }],
  });

  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [image, setImage] = useState('');

  const handleCreateRecipe = async () => {
    await createRecipe({
      variables: {
        userId,
        title,
        ingredients: ingredients.split(',').map(ing => ing.trim()),
        instructions,
        image,
      },
    });
    setTitle('');
    setIngredients('');
    setInstructions('');
    setImage('');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="Profile">
      <h2>My Recipes</h2>
      <div className="recipe-form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Recipe title"
        />
        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Ingredients (comma separated)"
        />
        <textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          placeholder="Instructions"
        />
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Image URL"
        />
        <button onClick={handleCreateRecipe}>Create Recipe</button>
      </div>
      <div className="recipe-list">
        {data.getUserRecipes.map((recipe) => (
          <div key={recipe.id} className="recipe">
            <h3>{recipe.title}</h3>
            <img src={recipe.image} alt={recipe.title} />
            <p>{recipe.instructions}</p>
            <ul>
              {recipe.ingredients.map((ing, index) => (
                <li key={index}>{ing}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;
