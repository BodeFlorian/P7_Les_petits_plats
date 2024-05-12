/**
 * Filtre les recettes en fonction des demandes de l'utilisateur
 * @param {Array} x - Tableau de filtres
 * @param {Array} filteredRecipes - Tableau des recettes filtrées
 * @returns {Array} - Tableau des recettes filtrées
 */
export const searchRecipes = (x, filteredRecipes) => {
  return filteredRecipes.filter((recipe) => {
    return x.every((filter) => {
      const decodedFilter = decodeURIComponent(filter).toLowerCase();
      return (
        recipe.name.toLowerCase().includes(decodedFilter) ||
        recipe.description.toLowerCase().includes(decodedFilter) ||
        recipe.appliance.toLowerCase().includes(decodedFilter) ||
        recipe.ustensils.some((ustensil) => ustensil.toLowerCase().includes(decodedFilter)) ||
        recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(decodedFilter))
      );
    });
  });
};
