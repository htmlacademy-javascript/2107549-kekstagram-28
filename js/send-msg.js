import { isEscapeKey } from './util.js';

const closeMessage = (type, cbKeyDown) => {
  const messageElements = document.querySelectorAll(`.${type}`);

  messageElements.forEach((element) => {
    element.remove();
    element = '';
  });

  if (cbKeyDown) {
    document.removeEventListener('keydown', cbKeyDown);
  }
};

const onEscKeyDown = (event, type) => {
  event.preventDefault();
  if (isEscapeKey(event)) {
    closeMessage(type, onEscKeyDown);
  }
};

const onMessageButtonClick = (event, type) => {
  event.preventDefault();
  closeMessage(type, onEscKeyDown);
};

const renderMessage = (type) => {
  const messageTemplate = document.querySelector(`#${type}`).content.querySelector(`.${type}`);
  const messageButtonElement = messageTemplate.querySelector(`.${type}__button`);

  document.body.append(messageTemplate);

  messageButtonElement.addEventListener('click', (event) => onMessageButtonClick(event, type));
  document.addEventListener('keydown', (event) => onEscKeyDown(event, type));
};

export { renderMessage };
