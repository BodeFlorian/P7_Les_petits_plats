import recipes from './../data/recipes.js';

import { createRecipeDOM } from './../templates/recipes.js';
import { createFilterDOM, removeFilter, setActiveFilterDiv } from '../templates/filters.js';
import { dropdownInit, closeDropdowns, updateDropdownOptions } from '../templates/dropdowns.js';

import { searchRecipes } from '../models/filters.js';

const dropdownDOM = document.querySelectorAll('.dropdown');
const searchBarForm = document.querySelector('#search');
const activeFilterDivDOM = document.querySelector('.active-filter');

let filters = [];
let filteredRecipes = recipes.slice();

const init = () => {
  createRecipeDOM(filteredRecipes);
  dropdownInit(filteredRecipes, filters);
};

document.addEventListener('DOMContentLoaded', () => {
  setActiveFilterDiv(activeFilterDivDOM);
  init();
});

dropdownDOM.forEach((dropdown) => {
  dropdown.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.querySelector('.dropdown__active').style.display = 'flex';
  });
});

document.addEventListener('click', (e) => {
  e.stopPropagation();
  closeDropdowns();
});

searchBarForm.addEventListener('submit', (e) => {
  e.preventDefault();
  e.stopPropagation();
  const query = e.currentTarget.querySelector('input').value;
  if (query.length <= 2) return;
  filters.push(query.toLowerCase());
  const queryResult = searchRecipes(filters, filteredRecipes);
  createRecipeDOM(queryResult);
  createFilterDOM(filters);
  filteredRecipes = queryResult.slice();
  updateDropdownOptions(filteredRecipes, filters);
});

activeFilterDivDOM.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
  if (e.target.tagName === 'LI') {
    removeFilter(e.target, filteredRecipes, filters, recipes);
  } else {
    closeDropdowns();
  }
});
