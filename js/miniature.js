import { createPhotos } from './data.js';

const photosContainer = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

const miniatures = createPhotos();
const miniaturesListFragment = document.createDocumentFragment();

miniatures.forEach(({ url, likes, comments }) => {
  const miniature = photoTemplate.cloneNode(true);
  miniature.querySelector('.picture__img').src = url;
  miniature.querySelector('.picture__likes').textContent = likes;
  miniature.querySelector('.picture__comments').textContent = comments.length;
  miniaturesListFragment.appendChild(miniature);
});

photosContainer.appendChild(miniaturesListFragment);
