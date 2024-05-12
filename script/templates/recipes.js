import createBlock from './../utils/createBlock.js';

const recipesDOM = document.querySelector('.recipes');
const recipesNumber = document.querySelector('.recipes-number');

/**
 * Crée et affiche les les recettes
 * @param {Array} x - Recettes à afficher
 */
export const createRecipeDOM = (x) => {
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
