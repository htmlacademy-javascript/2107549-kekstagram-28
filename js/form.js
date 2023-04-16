import { resetScale } from './scale.js';
import { resetEffects } from './effects.js';
import { isEscapeKey } from './util.js';
import { sendData } from './api.js';

const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const ERROR_MESSAGE = 'Неверный хэштег';
const HASHTAG_AMOUNT = 5;

const formImgUpload = document.querySelector('.img-upload__form');
const uploadControl = document.querySelector('.img-upload__start');
const uploadPicture = document.querySelector('.img-upload__overlay');
const uploadFormClose = document.querySelector('.img-upload__cancel');
const fieldHashtag = uploadPicture.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const uploadSubmit = uploadPicture.querySelector('.img-upload__submit');
const sendSuccess = document.querySelector('#success').content.querySelector('.success');
const sendError = document.querySelector('#error').content.querySelector('.error');

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
    .split(' ')
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
};

uploadControl.addEventListener('change', () => {
  openModal();
});

const closeModal = () => {
  uploadPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  resetScale();
  resetEffects();
  pristine.reset();
  formImgUpload.reset();
};

uploadFormClose.addEventListener('click', () => {
  closeModal();
});

const isTextFieldFocused = () =>
  document.activeElement === fieldHashtag ||
  document.activeElement === commentField;

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

document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
    document.body.querySelectorAll('.message').forEach((element) => element.remove());
  }
});

uploadPicture.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt) && !isTextFieldFocused()) {
    evt.preventDefault();
    closeModal();
  }
});

const blockUploadSubmit = () => {
  uploadSubmit.disabled = true;
  uploadSubmit.style.opacity = 0.2;
};

const unblockUploadSubmit = () => {
  uploadSubmit.disabled = false;
  uploadSubmit.style.opacity = 1;
};

const onFormSubmit = (onSuccess) => {
  formImgUpload.addEventListener('submit', (evt) => {
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
            showMessage(sendSuccess);
          } else {
            showMessage(sendError);
            unblockUploadSubmit();
          }
        })
        .catch(() => {
          unblockUploadSubmit();
          showMessage(sendError);
        });
    }
  });
};

export { onFormSubmit, closeModal };
