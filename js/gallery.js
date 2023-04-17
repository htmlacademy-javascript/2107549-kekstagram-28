import { isEscapeKey, isAcceptKey, makeSequence } from './util.js';

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureCloseElement = bigPictureElement.querySelector('.big-picture__cancel');
const bigPictureImageElement = document.querySelector('.big-picture__img img');
const likesCountElement = document.querySelector('.likes-count');
const socialCaptionElement = document.querySelector('.social__caption');
const showedCommentsCountElement = bigPictureElement.querySelector('.social__showed-comment-count');
const commentsCountElement = bigPictureElement.querySelector('.social__comment-count .comments-count');
const commentsContainerElement = bigPictureElement.querySelector('.social__comments');
const commentTemplateElement = document.querySelector('#social__comment').content.querySelector('.social__comment');

const closeBigPhoto = () => {
  document.body.classList.remove('modal-open');
  bigPictureElement.classList.add('hidden');

  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPictureCloseElement.click();
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

const renderComments = (comments) => commentsContainerElement.append(...comments.map(createComment));

const clearComments = () => (commentsContainerElement.innerHTML = '');

const makeCommentsLoaderElement = () => {
  const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
  const newCommentsLoaderElement = commentsLoaderElement.cloneNode(true);
  newCommentsLoaderElement.classList.remove('hidden');
  commentsLoaderElement.replaceWith(newCommentsLoaderElement);

  return newCommentsLoaderElement;
};

const renderMoreComments = (commentsLoaderElement, stepSequence, comments) => {
  const [prev, index] = stepSequence();

  renderComments(comments.slice(prev, index));

  if (index >= comments.length) {
    showedCommentsCountElement.textContent = comments.length;
    commentsLoaderElement.classList.add('hidden');

    return;
  }

  showedCommentsCountElement.textContent = index;
};

const initCommentsLoader = (comments) => {
  const commentsLoaderElement = makeCommentsLoaderElement();
  commentsCountElement.textContent = comments.length;
  const stepSequence = makeSequence(5);
  renderMoreComments(commentsLoaderElement, stepSequence, comments);
  commentsLoaderElement.addEventListener('click', () => renderMoreComments(commentsLoaderElement, stepSequence, comments));
};

const openBigPhoto = ({ url, description, likes, comments }) => {
  bigPictureImageElement.src = url;
  bigPictureImageElement.alt = description;
  likesCountElement.textContent = likes;
  socialCaptionElement.textContent = description;

  clearComments();
  initCommentsLoader(comments);

  document.body.classList.add('modal-open');
  bigPictureElement.classList.remove('hidden');

  document.addEventListener('keydown', onDocumentKeydown);
};

bigPictureCloseElement.addEventListener('click', onCloseButtonClick);
bigPictureCloseElement.addEventListener('keydown', onCloseButtonKeydown);

export { openBigPhoto };
