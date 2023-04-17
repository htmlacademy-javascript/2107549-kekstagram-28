const SCALE = { min: 25, max: 100 };
const SCALE_DEFAULT = 100;
const SCALE_STEP = 25;

const picturePreviewElement = document.querySelector('.img-upload__preview img');
const smallerControlElement = document.querySelector('.scale__control--smaller');
const biggerControlElement = document.querySelector('.scale__control--bigger');
const scaleControlElement = document.querySelector('.scale__control--value');

const scaleImage = (value) => {
  picturePreviewElement.style.transform = `scale(${value / 100})`;
  scaleControlElement.value = `${value}%`;
};

const onSmallerButtonClick = () => {
  const currentValue = parseInt(scaleControlElement.value, 10);
  let newValue = currentValue - SCALE_STEP;
  if (newValue < SCALE.min) {
    newValue = SCALE.min;
  }
  scaleImage(newValue);
};

const onBiggerButtonClick = () => {
  const currentValue = parseInt(scaleControlElement.value, 10);
  let newValue = currentValue + SCALE_STEP;
  if (newValue > SCALE.max) {
    newValue = SCALE.max;
  }
  scaleImage(newValue);
};

const resetScale = () => scaleImage(SCALE_DEFAULT);

smallerControlElement.addEventListener('click', onSmallerButtonClick);
biggerControlElement.addEventListener('click', onBiggerButtonClick);

export { resetScale };
