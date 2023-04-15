const TIMEOUT_ERROR = 5000;

const getFail = () => {
  const errorBlock = document.createElement('div');
  errorBlock.style.position = 'fixed';
  errorBlock.style.top = '0';
  errorBlock.style.left = '0';
  errorBlock.style.width = '100%';
  errorBlock.style.height = '60px';
  errorBlock.style.color = 'black';
  errorBlock.style.textAlign = 'center';
  errorBlock.style.padding = '20px';
  errorBlock.style.backgroundColor = 'red';
  errorBlock.textContent = 'Ошибка';
  document.body.append(errorBlock);

  setTimeout(() => {
    errorBlock.remove();
  }, TIMEOUT_ERROR);
};

export { getFail };
