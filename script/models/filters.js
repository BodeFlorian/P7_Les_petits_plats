/**
 * Filtre les recettes en fonctions des demandes de l'utilisateur
 * @param {Array} x - Tableau de filtres
 * @param {Array} filteredRecipes - Tableau des recettes filtrées
 * @returns {Array} - Tableau des recettes filtrées
 */
export const searchRecipes = (x, filteredRecipes) => {
  const filtered = [];
  const filtersLowerCase = x.map((filter) =>
    decodeURIComponent(filter.toLowerCase())
  ); //On utilise lowercase pour filtrer sans problème.

  for (let i = 0; i < filteredRecipes.length; i++) {
    const recipe = filteredRecipes[i];
    let match = true;

    for (let j = 0; j < filtersLowerCase.length; j++) {
      const filter = filtersLowerCase[j];

      if (
        !recipe.name.toLowerCase().includes(filter) &&
        !recipe.description.toLowerCase().includes(filter) &&
        !recipe.appliance.toLowerCase().includes(filter)
      ) {
        let hasIngredient = false;
        let hasUstensil = false;

        for (let k = 0; k < recipe.ingredients.length; k++) {
          if (recipe.ingredients[k].ingredient.toLowerCase().includes(filter)) {
            hasIngredient = true;
            break;
          }
        }

        if (!hasIngredient) {
          for (let l = 0; l < recipe.ustensils.length; l++) {
            if (recipe.ustensils[l].toLowerCase().includes(filter)) {
              hasUstensil = true;
              break;
            }
          }
        }

        if (!hasIngredient && !hasUstensil) {
          match = false;
          break;
        }
      }
    }

    if (match) {
      filtered.push(recipe);
    }
  }

  return filtered;
};
