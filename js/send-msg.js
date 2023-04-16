import { isEscapeKey } from './util.js';

const onEscKeyDown = (evt, element, cb) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (element) {
      cb(element);
    }
  }
};

const closeMessage = (element) => {
  element.remove();
  document.removeEventListener('keydown', onEscKeyDown);
  element = '';
};

const onMessageButtonClick = (evt, element) => {
  evt.preventDefault();
  closeMessage(element);
};

const renderFailMessage = (element) => {
  const failMessageClone = element.cloneNode(true);
  document.body.append(failMessageClone);
  document.addEventListener('keydown', (e) => onEscKeyDown(e, failMessageClone, closeMessage));
  failMessageClone.querySelector('.error__button').addEventListener('click', (e) => onMessageButtonClick(e, failMessageClone));
};

const renderSuccessMessage = (element) => {
  const successMessageClone = element.cloneNode(true);
  document.body.append(successMessageClone);
  document.addEventListener('keydown', (e) => onEscKeyDown(e, successMessageClone, closeMessage));
  successMessageClone.querySelector('.success__button').addEventListener('click', (e) => onMessageButtonClick(e, successMessageClone));
};

export { renderFailMessage, renderSuccessMessage };
