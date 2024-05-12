import createBlock from './../utils/createBlock.js';

import {
  allAppliance,
  allIngredients,
  allUstensils
} from './../models/recipes.js';
import { searchRecipes } from './../models/filters.js';

import { createRecipeDOM } from './recipes.js';
import { createFilterDOM } from './filters.js';

const dropdownDOM = document.querySelectorAll('.dropdown');
const dropdownActiveDOM = document.querySelectorAll('.dropdown__active');

/**
 * Initialise les dropdowns avec les suggestions en fonction des recettes filtrées et des filtres appliqués
 * @param {Array} filteredRecipes - Recettes filtrées
 * @param {Array} filters - Filtres appliqués
 */
export const dropdownInit = (filteredRecipes, filters) => {
  dropdownDOM.forEach((dropdown) => {
    const suggest = dropdown.querySelector('.dropdown__suggest');
    let items = [];

    switch (dropdown.firstElementChild.innerText) {
      case 'Ingrédients':
        items = allIngredients(filteredRecipes);
        break;
      case 'Appareils':
        items = allAppliance(filteredRecipes);
        break;
      case 'Ustensiles':
        items = allUstensils(filteredRecipes);
        break;
    }

    items.forEach((i) => {
      const el = createBlock('li', i, 'dropdown__suggest-item');
      el.addEventListener('click', (e) => {
        const query = e.target.innerText;
        filters.push(query.toLowerCase());
        const queryResult = searchRecipes(filters, filteredRecipes);
        createRecipeDOM(queryResult);
        createFilterDOM(filters);
        filteredRecipes = queryResult.slice();
        updateDropdownOptions(filteredRecipes, filters);
      });
      suggest.appendChild(el);
    });
  });

  dropdownActiveDOM.forEach((dropdownActive) => {
    const searchInput = dropdownActive.querySelector('input[type="search"]');
    searchInput.addEventListener('input', () => {
      const searchTerm = searchInput.value.toLowerCase();
      const dropdownList = dropdownActive.querySelector('.dropdown__suggest');
      const dropdownItems = dropdownList.querySelectorAll(
        '.dropdown__suggest-item'
      );
      dropdownItems.forEach((item) => {
        const itemName = item.innerText.toLowerCase();
        if (itemName.includes(searchTerm)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
};

/**
 * Ferme tous les dropdowns actifs
 */
export const closeDropdowns = () => {
  dropdownActiveDOM.forEach((dropdown) => {
    dropdown.style.display = 'none';
  });
};

/**
 * Met à jour les options des dropdowns avec les nouvelles données filtrées
 * @param {Array} filteredRecipes - Recettes filtrées
 * @param {Array} filters - Filtres appliqués
 */
export const updateDropdownOptions = (filteredRecipes, filters) => {
  dropdownDOM.forEach((dropdown) => {
    const suggest = dropdown.querySelector('.dropdown__suggest');
    const searchTerm = dropdown
      .querySelector('input[type="search"]')
      .value.toLowerCase();
    let items = [];

    switch (dropdown.firstElementChild.innerText) {
      case 'Ingrédients':
        items = allIngredients(filteredRecipes);
        break;
      case 'Appareils':
        items = allAppliance(filteredRecipes);
        break;
      case 'Ustensiles':
        items = allUstensils(filteredRecipes);
        break;
    }

    suggest.innerHTML = '';

    items.forEach((i) => {
      if (i.toLowerCase().includes(searchTerm)) {
        const el = createBlock('li', i, 'dropdown__suggest-item');
        // Si un filtre dans le dropdown est cliqué.
        el.addEventListener('click', (e) => {
          const query = e.target.innerText;
          filters.push(query.toLowerCase());
          const queryResult = searchRecipes(filters, filteredRecipes);
          createRecipeDOM(queryResult);
          createFilterDOM(filters);
          filteredRecipes = queryResult.slice();
          updateDropdownOptions(filteredRecipes, filters);
        });
        suggest.appendChild(el);
      }
    });
  });
};