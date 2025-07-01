let activeTags = new Set();
let allRecipes = [];

function createTagButtons(recipes) {
  const allTags = new Set(recipes.flatMap(r => r.tags));
  const tagFiltersDiv = document.getElementById('tagFilters');

  allTags.forEach(tag => {
    const btn = document.createElement('button');
    btn.className = 'btn btn-outline-primary btn-sm tag-button';
    btn.textContent = tag;
    btn.dataset.tag = tag;
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      if (activeTags.has(tag)) {
        activeTags.delete(tag);
      } else {
        activeTags.add(tag);
      }
      renderRecipeList();
    });
    tagFiltersDiv.appendChild(btn);
  });
}

function renderRecipeList() {
  const list = document.getElementById('recipeList');
  list.innerHTML = '';

  const filtered = [...allRecipes].filter(r => {
    return activeTags.size === 0 || [...activeTags].every(tag => r.tags.includes(tag));
  });

  filtered.forEach(r => {
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.href = `?name=${encodeURIComponent(r.name)}`;
    link.textContent = r.name;
    li.appendChild(link);
    list.appendChild(li);
  });
}

async function loadRecipes() {
  const res = await fetch('recipes.json');
  allRecipes = await res.json();

  createTagButtons(allRecipes);
  renderRecipeList();

  const params = new URLSearchParams(window.location.search);
  const selectedName = params.get('name');
  if (selectedName) {
    const recipe = allRecipes.find(r => r.name === selectedName);
    if (recipe) {
      const div = document.getElementById('recipeDetails');
      div.innerHTML = `
        <h2>${recipe.name}</h2>
        <p><strong>Estimated Time:</strong> ${recipe.estimatedTime}</p>
        <p><strong>Tags:</strong> ${recipe.tags.join(', ')}</p>
        <h3>Ingredients</h3>
        <ul>${recipe.ingredients.map(i => `<li>${i}</li>`).join('')}</ul>
        ${recipe.optionalIngredients?.length ? `<h4 class="optional">Optional Ingredients</h4><ul class="optional">${recipe.optionalIngredients.map(i => `<li>${i}</li>`).join('')}</ul>` : ''}
        <h3>Instructions</h3>
        <p>${recipe.instructions}</p>
      `;
      div.scrollIntoView({ behavior: "smooth" });
    }
  }
}

window.addEventListener('DOMContentLoaded', loadRecipes);
