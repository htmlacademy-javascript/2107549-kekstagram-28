import { isEscapeKey } from './util.js';
import { renderMiniatures, photosContainer } from './miniature.js';
import { renderBigPicture } from './big-pic.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const commentsCount = document.querySelector('.social__comment-count');
const commentsLoaderButton = document.querySelector('.comments-loader');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPictureClose.click();
  }
};

const openBigPhoto = (element) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  commentsCount.classList.add('hidden');
  commentsLoaderButton.classList.add('hidden');
  renderBigPicture(element);

  document.addEventListener('keydown', onDocumentKeydown);
};

photosContainer.addEventListener('click', (evt) => {
  const targetMiniature = evt.target.closest('.picture');
  if (targetMiniature) {
    evt.preventDefault();
    const targetMiniatureId = renderMiniatures[targetMiniature.dataset.id - 1];
    openBigPhoto(targetMiniatureId);
  }
});

const closeBigPhoto = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
};

bigPictureClose.addEventListener('click', closeBigPhoto);
