import json
from datetime import datetime

# Load recipe count
with open('recipes.json', 'r', encoding='utf-8') as f:
    recipes = json.load(f)
    recipe_count = len(recipes)

# Format current month and year
now = datetime.now()
month = now.strftime('%B')
year = now.strftime('%Y')
badge_date = f"{month}_{year}"

# Read README
with open('README.md', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Update lines
for i, line in enumerate(lines):
    if "badge/recipes-" in line:
        lines[i] = f'![Recipes](https://img.shields.io/badge/recipes-{recipe_count}-blue?style=flat-square)\n'
    if "badge/updated-" in line:
        lines[i] = f'![Updated](https://img.shields.io/badge/updated-{badge_date}-brightgreen?style=flat-square)\n'

# Write updated README
with open('README.md', 'w', encoding='utf-8') as f:
    f.writelines(lines)
