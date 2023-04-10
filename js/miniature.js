// Отрисовка миниатюр

import { openBigPhoto } from './gallery.js';

const photosContainer = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderMiniature = (({ url, description, likes, comments }) => {
  const miniature = photoTemplate.cloneNode(true);
  miniature.querySelector('.picture__img').src = url;
  miniature.querySelector('.picture__img').alt = description;
  miniature.querySelector('.picture__likes').textContent = likes;
  miniature.querySelector('.picture__comments').textContent = comments.length;

  miniature.addEventListener('click', () => openBigPhoto(url, likes, comments, description));

  return miniature;
});

const createMiniaturesList = (miniatures) => {
  photosContainer.append(...miniatures.map((miniature) => renderMiniature(miniature)));
};

export { createMiniaturesList };