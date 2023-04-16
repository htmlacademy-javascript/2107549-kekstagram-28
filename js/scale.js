const SCALE = { MIN: 25, MAX: 100 };
const SCALE_DEFAULT = 100;
const SCALE_STEP = 25;

const picturePreview = document.querySelector('.img-upload__preview img');
const smallerControl = document.querySelector('.scale__control--smaller');
const biggerControl = document.querySelector('.scale__control--bigger');
const scaleControl = document.querySelector('.scale__control--value');

const scaleImage = (value) => {
  picturePreview.style.transform = `scale(${value / 100})`;
  scaleControl.value = `${value}%`;
};

const onSmallerButtonClick = () => {
  const currentValue = parseInt(scaleControl.value, 10);
  let newValue = currentValue - SCALE_STEP;
  if (newValue < SCALE.MIN) {
    newValue = SCALE.MIN;
  }
  scaleImage(newValue);
};

const onBiggerButtonClick = () => {
  const currentValue = parseInt(scaleControl.value, 10);
  let newValue = currentValue + SCALE_STEP;
  if (newValue > SCALE.MAX) {
    newValue = SCALE.MAX;
  }
  scaleImage(newValue);
};

const resetScale = () => scaleImage(SCALE_DEFAULT);

smallerControl.addEventListener('click', onSmallerButtonClick);
biggerControl.addEventListener('click', onBiggerButtonClick);

export { resetScale };
