// Отрисовка и загрузка комментариев, открытие и закрытие полноразмерных изображений

import { isEscapeKey, isAcceptKey } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImage = document.querySelector('.big-picture__img img');
const likesCount = document.querySelector('.likes-count');
const socialCaption = document.querySelector('.social__caption');
const showedCommentsCountElement = bigPicture.querySelector('.social__showed-comment-count');
const commentsCount = bigPicture.querySelector('.social__comment-count .comments-count');
const commentsContainer = bigPicture.querySelector('.social__comments');
const commentTemplateElement = document.querySelector('.social__comment');

const closeBigPhoto = () => {
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');

  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPictureClose.click();
  }
}

const onCloseButtonClick = closeBigPhoto;
const onCloseButtonKeydown = (evt) => {
  if (isAcceptKey(evt)) {
    evt.preventDefault();
    closeBigPhoto();
  }
};

const createComment = ({ name, avatar, message }) => {
  const commentElement = commentTemplateElement.cloneNode(true);
  const pictureElement = commentElement.querySelector('.social__picture');
  pictureElement.src = avatar;
  pictureElement.alt = name;
  commentElement.querySelector('.social__text').textContent = message;

  return commentElement;
};

const renderComments = (comments) => commentsContainer.append(...comments.map(createComment));

const makeSequence = (step) => {
  let index = 0;
  return () => {
    const prev = index;
    index += step;
    return [prev, index];
  };
};

const renderMoreComments = (commentsLoaderElement, stepSequence, comments) => {
  const [prev, index] = stepSequence();
  renderComments(comments.slice(prev, index));
  showedCommentsCountElement.textContent = index;
  if (comments.length <= index) {
    commentsLoaderElement.classList.add('hidden');
  }
};

const makeCommentsLoaderElement = () => {
  const commentsLoaderElement = bigPicture.querySelector('.comments-loader');
  const newCommentsLoaderElement = commentsLoaderElement.cloneNode(true);
  newCommentsLoaderElement.classList.remove('hidden');
  commentsLoaderElement.replaceWith(newCommentsLoaderElement);

  return newCommentsLoaderElement;
};

const initCommentsLoader = (comments) => {
  const commentsLoaderElement = makeCommentsLoaderElement();
  commentsCount.textContent = comments.length;
  const stepSequence = makeSequence(5);
  renderMoreComments(commentsLoaderElement, stepSequence, comments);
  commentsLoaderElement.addEventListener('click', () => renderMoreComments(commentsLoaderElement, stepSequence, comments));
};

const clearComments = () => (commentsContainer.innerHTML = '');

const openBigPhoto = (url, description, likes, comments) => {
  bigPictureImage.src = url;
  bigPictureImage.alt = description;
  likesCount.textContent = likes;
  socialCaption.textContent = description;

  clearComments();
  initCommentsLoader(comments);

  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');

  document.addEventListener('keydown', onDocumentKeydown);
};

bigPictureClose.addEventListener('click', onCloseButtonClick);
bigPictureClose.addEventListener('keydown', onCloseButtonKeydown);

export { openBigPhoto };
