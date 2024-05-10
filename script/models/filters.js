/**
 * Filtre les recettes en fonction des demandes de l'utilisateur
 * @param {Array} x - Tableau de filtres
 * @param {Array} filteredRecipes - Tableau des recettes filtrées
 * @returns {Array} - Tableau des recettes filtrées
 */
export const searchRecipes = (x, filteredRecipes) => {
  return filteredRecipes.filter((recipe) => {
    return x.every((filter) => {
      filter = filter.toLowerCase();
      return (
        recipe.name.toLowerCase().includes(filter) ||
        recipe.description.toLowerCase().includes(filter) ||
        recipe.appliance.toLowerCase().includes(filter) ||
        recipe.ustensils.some((ustensil) => ustensil.toLowerCase().includes(filter)) ||
        recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(filter))
      );
    });
  });
};
