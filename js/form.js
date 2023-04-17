import { resetScale } from './scale.js';
import { resetEffects } from './effects.js';
import { isEscapeKey } from './util.js';
import { sendData } from './api.js';

const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const ERROR_MESSAGE = 'Неверный хэштег';
const HASHTAG_AMOUNT = 5;

const formImgUploadElement = document.querySelector('.img-upload__form');
const uploadControlElement = document.querySelector('.img-upload__start');
const uploadPictureElement = document.querySelector('.img-upload__overlay');
const uploadFormCloseElement = document.querySelector('.img-upload__cancel');
const fieldHashtagElement = document.querySelector('.text__hashtags');
const commentFieldElement = document.querySelector('.text__description');
const uploadSubmitElement = uploadPictureElement.querySelector('.img-upload__submit');
const sendSuccessElement = document.querySelector('#success').content.querySelector('.success');
const sendErrorElement = document.querySelector('#error').content.querySelector('.error');

const pristine = new Pristine(formImgUploadElement, {
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
    .split(' ')
    .filter((tag) => tag.trim().length);

  return hasValidCount(tags) && hasUniqueTags(tags) && tags.every(isValidTag);
};

pristine.addValidator(
  fieldHashtagElement,
  validateTags,
  ERROR_MESSAGE
);

const openModal = () => {
  uploadPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

uploadControlElement.addEventListener('change', () => {
  openModal();
});

const closeModal = () => {
  uploadPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  resetScale();
  resetEffects();
  pristine.reset();
  formImgUploadElement.reset();
};

uploadFormCloseElement.addEventListener('click', () => {
  closeModal();
});

const showMessage = (message) => {
  const messageElement = message.cloneNode(true);
  document.body.appendChild(messageElement);
  messageElement.classList.add('message');
  window.addEventListener('click', (evt) => {
    if (evt.target.matches('.message')) {
      document.body.querySelectorAll('.message').forEach((element) => element.remove());
    }
  });

  if (messageElement.contains(messageElement.querySelector('button'))) {
    messageElement.querySelector('button').addEventListener('click', () => {
      document.body.querySelectorAll('.message').forEach((element) => element.remove());
    });
  }
};

const isTextFieldFocused = () => document.activeElement === fieldHashtagElement || document.activeElement === commentFieldElement;

document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt) && !isTextFieldFocused()) {
    evt.preventDefault();
    closeModal();
    document.body.querySelectorAll('.message').forEach((element) => element.remove());
  }
});

const blockUploadSubmit = () => {
  uploadSubmitElement.disabled = true;
  uploadSubmitElement.style.opacity = 0.2;
};

const unblockUploadSubmit = () => {
  uploadSubmitElement.disabled = false;
  uploadSubmitElement.style.opacity = 1;
};

const onFormSubmit = (onSuccess) => {
  formImgUploadElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockUploadSubmit();
      sendData(new FormData(evt.target))
        .then((Response) => {
          if (Response.ok) {
            onSuccess();
            closeModal();
            unblockUploadSubmit();
            showMessage(sendSuccessElement);
          } else {
            showMessage(sendErrorElement);
            unblockUploadSubmit();
          }
        })
        .catch(() => {
          unblockUploadSubmit();
          showMessage(sendErrorElement);
        });
    }
  });
};

export { onFormSubmit, closeModal };
