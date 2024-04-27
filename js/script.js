function getRecipes() {
    const ingredients = document.getElementById('ingredientInput').value.split('\n').filter(Boolean);
    fetch('/api/get_recipes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ingredients })
    })
    .then(response => response.json())
    .then(data => {
        displayRecipes(data.recipes);
    })
    .catch(error => console.error('Error:', error));
}

function displayRecipes(recipes) {
    const recipeList = document.getElementById('recipeList');
    recipeList.innerHTML = '';
    recipes.forEach(recipe => {
        const recipeItem = document.createElement('div');
        recipeItem.classList.add('recipe-item');
        recipeItem.textContent = recipe;
        recipeList.appendChild(recipeItem);
    });
}
