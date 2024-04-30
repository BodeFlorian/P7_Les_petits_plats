import recipes from './../../data/recipes.js';

const recipesDOM = document.querySelector('.recipes');
const dropdownDOM = document.querySelectorAll('.dropdown');
const dropdownActiveDOM = document.querySelectorAll('.dropdown__active');
const searchBarForm = document.querySelector('#search');
const recipesNumber = document.querySelector('.recipes-number');
const activeFilterDivDOM = document.querySelector('.active-filter');

let filters = []; // Tableau de filtre actif
let filteredRecipes = recipes.slice(); // Copie des recettes filtrées

/**
 * Permet de créer un élément HTML;
 * @param {string} tag - Tag de l'élément HTML
 * @param {string} content - Contenu de l'élément HTML
 * @param {string} cssClass - Classe de l'élément HTML
 * @returns {HTMLElement} - Élément HTML
 */
const createBlock = function (tag, content, cssClass) {
  const element = document.createElement(tag);
  if (cssClass !== undefined) {
    element.className = cssClass;
  }
  element.innerHTML = content;
  return element;
};

/**
 * Affiche les recettes sur la page d'accueil
 * @param {Array} x - Tableau de recette
 */
const createRecipeDOM = (x) => {
  recipesDOM.innerHTML = '';

  x.forEach((recipe) => {
    const recipeDiv = createBlock('div', '', 'recipe');

    const recipeImg = createBlock('div', '', 'recipe__img');
    const img = createBlock('img', '', '');
    img.src = `./asset/img/recipes/${recipe.image}`;
    img.alt = recipe.name;
    const time = createBlock('div', `${recipe.time} min`, 'recipe__time');
    recipeImg.appendChild(img);
    recipeImg.appendChild(time);

    const recipeContent = createBlock('div', '', 'recipe__content');

    const recipeTitle = createBlock('h3', recipe.name, 'recipe__title');

    const recipeDescription = createBlock('div', '', 'recipe__description');
    const recipeDescriptionTitle = createBlock('h4', 'Recette', '');
    const recipeDescriptionTuto = createBlock('p', recipe.description, '');
    recipeDescription.appendChild(recipeDescriptionTitle);
    recipeDescription.appendChild(recipeDescriptionTuto);

    const recipeIngredients = createBlock('div', '', 'recipe__ingredients');
    const recipeIngredientsTitle = createBlock('h4', 'Ingrédients', '');
    const recipeIngredientsWrapper = createBlock(
      'div',
      '',
      'recipe__ingredients-wrapper'
    );
    recipe.ingredients.forEach((ingredient) => {
      const ingredientDiv = createBlock('div', '', 'recipe__ingredient');
      const ingredientTitle = createBlock('h5', ingredient.ingredient, '');
      const ingredientQuantity = createBlock(
        'p',
        `${ingredient.quantity ? ' ' + ingredient.quantity : ''}${ingredient.unit ? ' ' + ingredient.unit : ''}`,
        ''
      );
      ingredientDiv.appendChild(ingredientTitle);
      ingredientDiv.appendChild(ingredientQuantity);
      recipeIngredientsWrapper.appendChild(ingredientDiv);
    });
    recipeIngredients.appendChild(recipeIngredientsTitle);
    recipeIngredients.appendChild(recipeIngredientsWrapper);

    recipeContent.appendChild(recipeTitle);
    recipeContent.appendChild(recipeDescription);
    recipeContent.appendChild(recipeIngredients);

    recipeDiv.appendChild(recipeImg);
    recipeDiv.appendChild(recipeContent);

    recipesDOM.appendChild(recipeDiv);
  });

  recipesNumber.innerText = `${x.length > 1 ? x.length + ' recettes' : x.length + ' recette'}`;
};

/**
 * Affiche les filtres actuels
 * @param {Array} x - Tableau de filtre
 */
const createFilterDOM = (x) => {
  activeFilterDivDOM.innerHTML = '';
  activeFilterDivDOM.style.display = 'flex';

  x.forEach((filter) => {
    const filterDOM = createBlock('li', filter);
    activeFilterDivDOM.appendChild(filterDOM);
  });
};

/**
 * Supprime le filtre
 * @param {HTMLElement} x - Filtre Actif
 */
const removeFilter = (x) => {
  const filterText = x.innerText.toLowerCase();
  const index = filters.indexOf(filterText);
  filters.splice(index, 1);
  x.parentNode.removeChild(x);
  if (filters.length === 0) {
    activeFilterDivDOM.style.display = 'none';
    createRecipeDOM(recipes.slice(0, 6)); // Reset filtre;
    filteredRecipes = recipes.slice();
  } else {
    filteredRecipes = recipes.slice();
    const data = searchRecipes(filters);
    createRecipeDOM(data);
    filteredRecipes = data.slice();
  }
  updateDropdownOptions();
};

/**
 * Ferme les dropdown menus
 */
const closeDropdowns = () => {
  dropdownActiveDOM.forEach((dropdown) => {
    dropdown.style.display = 'none';
  });
};

/**
 * Initialise les dropdown avec leur item associé
 */
const dropdownInit = () => {
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
        filters.push(query.toLowerCase()); // Ajout de la requete dans le tableau des filtres
        const queryResult = searchRecipes(filters);
        createRecipeDOM(queryResult);
        createFilterDOM(filters);
        filteredRecipes = queryResult.slice();
        updateDropdownOptions();
      });
      suggest.appendChild(el);
    });
  });

  // Filtrage dans les dropdowns
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
 * Met à jour les options des dropdowns en fonction des recettes filtrées
 */
const updateDropdownOptions = () => {
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

    suggest.innerHTML = ''; // Efface les options actuelles

    items.forEach((i) => {
      if (i.toLowerCase().includes(searchTerm)) {
        const el = createBlock('li', i, 'dropdown__suggest-item');
        el.addEventListener('click', (e) => {
          const query = e.target.innerText;
          filters.push(query.toLowerCase());
          const queryResult = searchRecipes(filters);
          createRecipeDOM(queryResult);
          createFilterDOM(filters);
          filteredRecipes = queryResult.slice();
          updateDropdownOptions();
        });
        suggest.appendChild(el);
      }
    });
  });
};

/**
 * Retourne tous les ingrédients existants
 * @param {Array} recipes - Recettes à considérer
 * @returns {Array} - Ingrédients disponibles
 */
const allIngredients = (recipes) => {
  let ingredients = [];

  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((item) => {
      if (ingredients.indexOf(item.ingredient.toLowerCase()) === -1) {
        // Si l'ingrédient n'est pas encore dans le tableau
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
const allAppliance = (recipes) => {
  let appliances = [];

  recipes.forEach((recipe) => {
    if (appliances.indexOf(recipe.appliance.toLowerCase()) === -1) {
      // Si l'appareil n'est pas encore dans le tableau
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
const allUstensils = (recipes) => {
  let ustensils = [];

  recipes.forEach((recipe) => {
    recipe.ustensils.forEach((item) => {
      if (ustensils.indexOf(item.toLowerCase()) === -1) {
        // Si l'ustensile n'est pas encore dans le tableau
        ustensils.push(item.toLowerCase());
      }
    });
  });

  return ustensils;
};

/**
 * Filtre les recettes en fonctions des demandes de l'utilisateur
 * @param {Array} x - Tableau de filtres
 * @returns {Array} - Tableau des recettes filtrées
 */
const searchRecipes = (filters) => {
  const filtered = [];
  const filtersLowerCase = filters.map((filter) => filter.toLowerCase()); //On utilise lowercase pour filtrer sans problème.

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

const init = () => {
  createRecipeDOM(recipes.slice(0, 6)); //Initialisation du site avec 6 recettes sans filtre -> Ajouter un bouton 'Load More' par la suite.
  dropdownInit();
};

document.addEventListener('DOMContentLoaded', () => {
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
  filters.push(query.toLowerCase()); // Ajout de la requete dans le tableau des filtres
  //console.time('filtre');
  const queryResult = searchRecipes(filters);
  //console.timeEnd('filtre');
  createRecipeDOM(queryResult);
  createFilterDOM(filters);
  filteredRecipes = queryResult.slice();
  updateDropdownOptions();
});

activeFilterDivDOM.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
  if (e.target.tagName === 'LI') {
    removeFilter(e.target);
  } else {
    closeDropdowns();
  }
});
