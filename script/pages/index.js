import recipes from './../../data/recipes.js';

const recipesDOM = document.querySelector('.recipes');

const createBlock = function (tag, content, cssClass) {
  const element = document.createElement(tag);
  if (cssClass !== undefined) {
    element.className = cssClass;
  }
  element.innerHTML = content;
  return element;
};

const createRecipeDOM = () => {
  recipes.slice(0, 6).forEach((recipe) => {
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
    const recipeDescriptionTuto = createBlock(
      'p',
      "Mettre les glaçons à votre goût dans le blender, Ajouter le lait la crème de coco, le jus de 2 citrons et le sucre ensemble. Mixer jusqu'à obtenir la consistance désirée.",
      ''
    );
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

createRecipeDOM();
