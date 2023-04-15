import { isEscapeKey } from './util.js';

const failMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
let failMessageClone;
let successMessageClone;

const closeFailMessage = () => {
  failMessageClone.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  failMessageClone = '';
};

const closeSuccessMessage = () => {
  successMessageClone.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  successMessageClone = '';
};

const onFailMessageButtonClick = (evt) => {
  evt.preventDefault();
  closeFailMessage();
};

const onSuccessMessageButtonClick = (evt) => {
  evt.preventDefault();
  closeSuccessMessage();
};

const renderFailMessage = () => {
  failMessageClone = failMessageTemplate.cloneNode(true);
  document.body.append(failMessageClone);
  document.addEventListener('keydown', onDocumentKeydown);
  failMessageClone.querySelector('.error__button').addEventListener('click', onFailMessageButtonClick);
};

const renderSuccessMessage = () => {
  successMessageClone = successMessageTemplate.cloneNode(true);
  document.body.append(successMessageClone);
  document.addEventListener('keydown', onDocumentKeydown);
  successMessageClone.querySelector('.success__button').addEventListener('click', onSuccessMessageButtonClick);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (failMessageClone) {
      closeFailMessage();
      return;
    }
    closeSuccessMessage();
  }
}

export { renderFailMessage, renderSuccessMessage };
