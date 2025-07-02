# 🍽️ RecipeViewer

A simple, responsive web app for browsing, filtering, and viewing a collection of easy 3–5 ingredient recipes.

This tool was created to help plan weekly meals using a rotating JSON-based recipe list, with filters like cooking method (Blackstone, Grill, No-cook), health tags (Healthy, Spicy), and estimated prep time. It also supports light/dark mode and mobile responsiveness.

---

## 🌟 Features

- 🔍 **Tag-Based Filtering**: Dynamically filter recipes by any combination of tags (e.g., Cold, No-cook, Healthy, Spicy).
- 🌓 **Light/Dark Mode Toggle**: Saves your preference across visits.
- 🧭 **Estimated Prep Time**: Easily pick meals based on how much time you have.
- 🍴 **Responsive Grid View**: View all recipes in a simple grid, adaptable to screen size.
- 📄 **Recipe Details**: Click any recipe to see ingredients, optional items, instructions, and tags.
- ⚙️ **Data-Driven**: All recipes are managed via a single `recipes.json` file you can update as needed.

---

## 🚀 Getting Started

This site is hosted using [GitHub Pages](https://pages.github.com/). To view or modify:

### 1. Clone or fork this repo

```bash
git clone https://github.com/bsvatos24/RecipeViewer.git
```

### 2. Update your recipe list

- Edit the `recipes.json` file in the root directory.
- Follow the existing format — each recipe includes:
  - `name`
  - `tags`
  - `ingredients`
  - `optionalIngredients`
  - `instructions`
  - `estimatedTime`

### 3. View your site

- Push changes to the `main` branch.
- Then visit:  
  `https://bsvatos24.github.io/RecipeViewer/`

---

## 🧪 Supported Tags (Examples)

- `Cold` ❄️
- `Warm` 🔥
- `No-cook` ⏱️
- `Healthy` 🥗
- `Grill` 🍖
- `Spicy` 🌶️
- `Vegetarian`, `Quick`, `Kid`, `Dairy-Free`, `Breakfast`, `Dinner`, `Dessert`, etc.

New tags are automatically detected and displayed as filter buttons.

---

## 📁 Project Structure

```
📦 RecipeViewer/
├── index.html          # Main HTML layout
├── viewer.js           # JavaScript logic (theme, filters, rendering)
├── recipes.json        # The full list of recipes
├── README.md           # This file
```

---

## 🧠 Planned Enhancements

- ✅ Weekly recipe randomizer + grocery list email (via Python script)
- 📅 Weekly planner mode with checkboxes or drag-and-drop
- 🛒 Auto-generated grocery list for selected recipes
- ❤️ Save and favorite recipes (browser storage or file-based)
- 🔍 Search bar for quick filtering

---

## 📬 Feedback & Contributions

Have an idea or recipe to add?  
Open an issue or submit a PR to contribute:

- New recipe JSON entries
- Styling enhancements
- Accessibility improvements
- Tag suggestions or logic fixes

---

## 🛠️ Built With

- [Bootstrap 5.3](https://getbootstrap.com/)
- Vanilla JavaScript (no frameworks)
- [GitHub Pages](https://pages.github.com/) for free hosting

---

## ✨ Maintainer

**Ben Svatos**  
[https://github.com/bsvatos24](https://github.com/bsvatos24)
