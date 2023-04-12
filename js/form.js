import { resetScale } from './scale.js';
import { resetEffects } from './effects.js';
import { isEscapeKey } from './util.js';

const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const ERROR_MESSAGE = 'Неверный хэштег';
const HASHTAG_AMOUNT = 5;

const formImgUpload = document.querySelector('.img-upload__form');
const uploadControl = document.querySelector('.img-upload__start');
const uploadPicture = document.querySelector('.img-upload__overlay');
const uploadFormClose = document.querySelector('.img-upload__cancel');
const fieldHashtag = uploadPicture.querySelector('.text__hashtags');

const pristine = new Pristine(formImgUpload, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

const isValidTag = (tag) => VALID_SYMBOLS.test(tag);
const hasValidCount = (tags) => tags.length <= HASHTAG_AMOUNT;
const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateTags = (value) => {
  const tags = value
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter((tag) => tag.trim().length);
  return hasValidCount(tags) && hasUniqueTags(tags) && tags.every(isValidTag);
};

pristine.addValidator(
  fieldHashtag,
  validateTags,
  ERROR_MESSAGE
);

const openModal = () => {
  uploadPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
};

const closeModal = () => {
  uploadPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  resetScale();
  resetEffects();
  pristine.reset();

  document.removeEventListener('keydown', onDocumentKeydown);
};

uploadControl.addEventListener('change', () => {
  openModal();
});

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    uploadFormClose.click();
  }
}

const onCloseButtonClick = closeModal;
const onCloseButtonKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

uploadFormClose.addEventListener('click', onCloseButtonClick);
uploadFormClose.addEventListener('keydown', onCloseButtonKeydown);
