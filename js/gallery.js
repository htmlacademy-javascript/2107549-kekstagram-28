import { isEscapeKey } from './util.js';
import { bigPictureImage, likesCount, socialCaption } from './big-pic.js';
import { renderMiniatures, photosContainer } from './miniature.js';

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

const openBigPhoto = (url, description, likes, comments) => {
  bigPictureImage.src = url;
  bigPictureImage.alt = description;
  likesCount.textContent = likes;
  socialCaption.textContent = description;

  document.body.classList.add('modal-open');
  commentsCount.classList.add('hidden');
  commentsLoaderButton.classList.add('hidden');
  bigPicture.classList.remove('hidden');

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
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');

  document.removeEventListener('keydown', onDocumentKeydown);
};

bigPictureClose.addEventListener('click', closeBigPhoto);

export { openBigPhoto };
