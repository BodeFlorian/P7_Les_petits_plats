/**
 * Permet de créer un élément HTML;
 * @param {string} tag - Tag de l'élément HTML
 * @param {string} content - Contenu de l'élément HTML
 * @param {string} cssClass - Classe de l'élément HTML
 * @returns {HTMLElement} - Élément HTML
 */
const createBlock = (tag, content, cssClass) => {
  const element = document.createElement(tag);
  if (cssClass !== undefined) {
    element.className = cssClass;
  }
  element.innerHTML = content;
  return element;
};

export default createBlock;
