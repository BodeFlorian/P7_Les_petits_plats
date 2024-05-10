import createBlock from './../utils/createBlock.js';

import { searchRecipes } from './../models/filters.js';

import { createRecipeDOM } from './recipes.js';
import { updateDropdownOptions } from './dropdowns.js';

let activeFilterDivDOM;
let filteredRecipes;
let filters;

/**
 * Définit l'élément DOM utilisé pour afficher les filtres actifs
 * @param {HTMLElement} element - Élément DOM
 */
export const setActiveFilterDiv = (element) => {
  activeFilterDivDOM = element;
};

/**
 * Crée et affiche les filtres actifs dans le DOM
 * @param {Array} x - Filtres actifs
 * @param {Array} recipes - Recettes complètes
 * @param {Array} filtersArray - Filtres à afficher
 */
export const createFilterDOM = (x, recipes, filtersArray) => {
  filteredRecipes = recipes;
  filters = filtersArray;

  activeFilterDivDOM.innerHTML = '';
  activeFilterDivDOM.style.display = 'flex';

  x.forEach((filter) => {
    const filterDOM = createBlock('li', filter);
    activeFilterDivDOM.appendChild(filterDOM);
  });
};

/**
 * Supprime un filtre actif, met à jour les recettes affichées et les dropdowns en conséquence
 * @param {HTMLElement} x - Filtre à supprimer
 * @param {Array} filteredRecipes - Recettes filtrées
 * @param {Array} filters - Filtres actifs
 * @param {Array} recipes - Recettes complètes
 */
export const removeFilter = (x, filteredRecipes, filters, recipes) => {
  const filterText = x.innerText.toLowerCase();
  const index = filters.indexOf(filterText);
  filters.splice(index, 1);
  x.parentNode.removeChild(x);
  if (filters.length === 0) {
    activeFilterDivDOM.style.display = 'none';
    createRecipeDOM(recipes);
    filteredRecipes = recipes.slice();
  } else {
    filteredRecipes = recipes.slice();
    const data = searchRecipes(filters, filteredRecipes);
    createRecipeDOM(data);
    filteredRecipes = data.slice();
  }
  updateDropdownOptions(filteredRecipes, filters);
};
