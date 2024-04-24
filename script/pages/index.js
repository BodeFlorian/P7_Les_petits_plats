import recipes from './../../data/recipes.js';

const recipesDOM = document.querySelector('.recipes');
const dropdownDOM = document.querySelectorAll('.dropdown');
const dropdownActiveDOM = document.querySelectorAll('.dropdown__active');
const searchBar = document.querySelector('#search');
const recipesNumber = document.querySelector('.recipes-number');

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
    console.log(recipe);
    const recipeDiv = createBlock('div', '', 'recipe');

    const recipeImg = createBlock('div', '', 'recipe__img');
    const img = createBlock('img', '', '');
    img.src = `./asset/img/recipes/${recipe.image}`;
    img.alt = recipe.name;
    recipeImg.appendChild(img);

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
 * Retourne tous les ingrédients existants
 * @returns {Array} - Ingrédients disponibles
 */
const allIngredients = () => {
  let ingredients = [];

  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((item) => {
      if (ingredients.indexOf(item.ingredient) === -1) {
        // Si l'ingrédient n'est pas encore dans le tableau
        ingredients.push(item.ingredient);
      }
    });
  });

  return ingredients;
};

/**
 * Retourne tous les appareils exitants
 * @returns {Array} - Appareils disponibles
 */
const allAppliance = () => {
  let appliances = [];

  recipes.forEach((recipe) => {
    if (appliances.indexOf(recipe.appliance) === -1) {
      // Si l'appareil n'est pas encore dans le tableau
      appliances.push(recipe.appliance);
    }
  });

  return appliances;
};

/**
 * Retourne tous les ustensiles existants
 * @returns {Array} - Ustensiles disponibles
 */
const allUstensils = () => {
  let ustensils = [];

  recipes.forEach((recipe) => {
    recipe.ustensils.forEach((item) => {
      if (ustensils.indexOf(item) === -1) {
        // Si l'ustensile n'est pas encore dans le tableau
        ustensils.push(item);
      }
    });
  });

  return ustensils;
};

/**
 * Initialise les dropdown avec leur item associé
 */
const dropdownInit = () => {
  dropdownDOM.forEach((dropdown) => {
    const suggest = dropdown.querySelector('.dropdown__suggest');

    switch (dropdown.firstElementChild.innerText) {
      case 'Ingrédients':
        const ingredients = allIngredients();
        ingredients.forEach((i) => {
          const el = createBlock('li', i, 'dropdown__suggest-item');
          suggest.appendChild(el);
        });
        break;
      case 'Appareils':
        const appareils = allAppliance();
        appareils.forEach((i) => {
          const el = createBlock('li', i, 'dropdown__suggest-item');
          suggest.appendChild(el);
        });
        break;
      case 'Ustensiles':
        const ustensiles = allUstensils();
        ustensiles.forEach((i) => {
          const el = createBlock('li', i, 'dropdown__suggest-item');
          suggest.appendChild(el);
        });
        break;
    }
  });
};

/**
 * Retourne le résultat de la recherche d'un utilisateur
 * @param {string} query - Recherche d'un utilisateur
 * @returns {Array} - Tableau des résultats
 */
const searchRecipes = (query) => {
  query = query.toLowerCase(); // On va travailler avec le lowerCase

  return recipes.filter((recipe) => {
    return (
      recipe.name.toLowerCase().includes(query) ||
      recipe.description.toLowerCase().includes(query) ||
      recipe.ingredients.some((ingredient) => {
        ingredient.ingredient.toLowerCase().includes(query);
      })
    );
  });
};

const init = () => {
  createRecipeDOM(recipes.slice(0, 6)); //Initialisation du site avec 6 recettes sans filtre.
  dropdownInit();
};

init();

dropdownDOM.forEach((dropdown) => {
  dropdown.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.querySelector('.dropdown__active').style.display = 'flex';
  });
});

document.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
  closeDropdowns();
});

searchBar.addEventListener('keyup', (e) => {
  const query = searchRecipes(e.currentTarget.value);
  recipesNumber.innerText = `${query.length > 1 ? query.length + ' recettes' : query.length + ' recette'}`;
  createRecipeDOM(query);
});
