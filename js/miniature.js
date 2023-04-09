import { createPhotos } from './data.js';

const photosContainer = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');


const renderMiniature = (({ url, description, likes, comments, id }) => {
  const miniature = photoTemplate.cloneNode(true);
  miniature.querySelector('.picture__img').src = url;
  miniature.querySelector('.picture__img').alt = description;
  miniature.querySelector('.picture__likes').textContent = likes;
  miniature.querySelector('.picture__comments').textContent = comments.length;
  miniature.dataset.id = id;

  return miniature;
});

const createMiniaturesList = (miniatures) => {
  const miniaturesListFragment = document.createDocumentFragment();

  miniatures.forEach((miniature) => {
    miniaturesListFragment.append(renderMiniature(miniature));
  });
  photosContainer.append(miniaturesListFragment);
};

const renderMiniatures = createPhotos();
createMiniaturesList(renderMiniatures);

export { renderMiniatures, photosContainer };
