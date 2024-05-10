/**
 * Retourne tous les ingrédients existants
 * @param {Array} recipes - Recettes à considérer
 * @returns {Array} - Ingrédients disponibles
 */
export const allIngredients = (recipes) => {
  let ingredients = [];

  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((item) => {
      if (ingredients.indexOf(item.ingredient.toLowerCase()) === -1) {
        ingredients.push(item.ingredient.toLowerCase());
      }
    });
  });

  return ingredients;
};

/**
 * Retourne tous les appareils existants
 * @param {Array} recipes - Recettes à considérer
 * @returns {Array} - Appareils disponibles
 */
export const allAppliance = (recipes) => {
  let appliances = [];

  recipes.forEach((recipe) => {
    if (appliances.indexOf(recipe.appliance.toLowerCase()) === -1) {
      appliances.push(recipe.appliance.toLowerCase());
    }
  });

  return appliances;
};

/**
 * Retourne tous les ustensiles existants
 * @param {Array} recipes - Recettes à considérer
 * @returns {Array} - Ustensiles disponibles
 */
export const allUstensils = (recipes) => {
  let ustensils = [];

  recipes.forEach((recipe) => {
    recipe.ustensils.forEach((item) => {
      if (ustensils.indexOf(item.toLowerCase()) === -1) {
        ustensils.push(item.toLowerCase());
      }
    });
  });

  return ustensils;
};
