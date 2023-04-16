import { isEscapeKey, isAcceptKey, makeSequence } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImage = document.querySelector('.big-picture__img img');
const likesCount = document.querySelector('.likes-count');
const socialCaption = document.querySelector('.social__caption');
const showedCommentsCountElement = bigPicture.querySelector('.social__showed-comment-count');
const commentsCount = bigPicture.querySelector('.social__comment-count .comments-count');
const commentsContainer = bigPicture.querySelector('.social__comments');
const commentTemplateElement = document.querySelector('#social__comment').content.querySelector('.social__comment');

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

const clearComments = () => (commentsContainer.innerHTML = '');

const makeCommentsLoaderElement = () => {
  const commentsLoaderElement = bigPicture.querySelector('.comments-loader');
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
  commentsCount.textContent = comments.length;
  const stepSequence = makeSequence(5);
  renderMoreComments(commentsLoaderElement, stepSequence, comments);
  commentsLoaderElement.addEventListener('click', () => renderMoreComments(commentsLoaderElement, stepSequence, comments));
};

const openBigPhoto = ({ url, description, likes, comments }) => {
  console.log(url)
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
