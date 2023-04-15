import { resetScale } from './scale.js';
import { resetEffects } from './effects.js';
import { isEscapeKey } from './util.js';
import { sendData } from './api.js';
import { renderFailMessage, renderSuccessMessage } from './send-msg.js';
import { URLS } from './constants.js';

const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const ERROR_MESSAGE = 'Неверный хэштег';
const HASHTAG_AMOUNT = 5;

const formImgUpload = document.querySelector('.img-upload__form');
const uploadControl = document.querySelector('.img-upload__start');
const uploadPicture = document.querySelector('.img-upload__overlay');
const uploadFormClose = document.querySelector('.img-upload__cancel');
const fieldHashtag = uploadPicture.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');

const onSendSuccess = () => {
  renderSuccessMessage();
  closeModal();
};

const onSendFail = () => {
  renderFailMessage();
};

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

function openModal() {
  uploadPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
}

function closeModal() {
  uploadPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  resetScale();
  resetEffects();
  pristine.reset();

  document.removeEventListener('keydown', onDocumentKeydown);
}

const isTextFieldFocused = () =>
  document.activeElement === fieldHashtag ||
  document.activeElement === commentField;

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !isTextFieldFocused()) {
    if (document.querySelector('.error')) {
      return;
    }

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

const onFormSubmit = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    sendData(URLS.post, onSendSuccess, onSendFail, new FormData(evt.target));
  }
};

const addFormAction = () => {
  uploadControl.addEventListener('change', openModal);
  uploadFormClose.addEventListener('click', closeModal);
  formImgUpload.addEventListener('submit', onFormSubmit);
};

export { addFormAction };
