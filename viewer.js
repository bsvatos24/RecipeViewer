// viewer.js

let activeTags = new Set();
let allRecipes = [];

const tagStyles = {
  cold:         { color: '#b0e0ff', icon: '❄️' },
  warm:         { color: '#ffd966', icon: '🔥' },
  grill:        { color: '#ff8c42', icon: '🍖' },
  healthy:      { color: '#8fbc8f', icon: '🥗' },
  "no-cook":    { color: '#ffffff', icon: '⏱️' },
  spicy:        { color: '#ff6961', icon: '🌶️' },
  quick:        { color: '#e0e0e0', icon: '⚡' },
  "dairy-free": { color: '#f5deb3', icon: '🥛🚫' },
  vegetarian:   { color: '#20b2aa', icon: '🥦' },
  kid:          { color: '#ffc0cb', icon: '🧒' },
  breakfast:    { color: '#f4e285', icon: '🍳' },
  dinner:       { color: '#deb887', icon: '🍽️' },
  dessert:      { color: '#dda0dd', icon: '🍩' }
};

function getCurrentTheme() {
  return document.documentElement.getAttribute('data-bs-theme') || 'light';
}

function createTagButtons(recipes) {
  const allTags = new Set(recipes.flatMap(r => r.tags.map(tag => tag.toLowerCase())));
  const tagFiltersDiv = document.getElementById('tagFilters');
  tagFiltersDiv.innerHTML = '';

  const theme = getCurrentTheme();

  allTags.forEach(tag => {
    const btn = document.createElement('button');
    let { color = '#ccc', icon = '🏷️' } = tagStyles[tag] || {};

    // Adjust "no-cook" color based on theme
    if (tag === 'no-cook') {
  btn.style.backgroundColor = '#ffffff';
  btn.style.color = '#000000';
} else {
  btn.style.color = 'black';
}




    btn.className = 'btn btn-sm rounded-pill me-2 mb-2 border tag-button';
    btn.style.backgroundColor = color;
    btn.style.color = 'black';
    btn.innerHTML = `${icon} ${tag.charAt(0).toUpperCase() + tag.slice(1)}`;
    btn.dataset.tag = tag;

    btn.addEventListener('click', () => {
      btn.classList.toggle('border-dark');
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

  const theme = getCurrentTheme();

  const filtered = allRecipes.filter(r => {
    const normalizedTags = r.tags.map(tag => tag.toLowerCase());
    return activeTags.size === 0 || [...activeTags].every(tag => normalizedTags.includes(tag));
  });

  filtered.forEach(r => {
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.href = `?name=${encodeURIComponent(r.name)}`;
    link.textContent = r.name;
    link.style.color = theme === 'dark' ? 'white' : 'black';
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
      div.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-bs-theme', savedTheme);
  }

  loadRecipes();

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = getCurrentTheme();
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-bs-theme', next);
      localStorage.setItem('theme', next);
      createTagButtons(allRecipes);
      renderRecipeList();
    });
  }
});
