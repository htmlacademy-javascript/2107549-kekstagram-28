const FX = [
  {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  }
];
const DEFAULT_FX = FX[0];
let chosenEffect = DEFAULT_FX;

const picturePreview = document.querySelector('.img-upload__preview img');
const effectElement = document.querySelector('.effects');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderContainerElement = document.querySelector('.img-upload__effect-level');
const effectLevelElement = document.querySelector('.effect-level__value');

const isDefault = () => chosenEffect === DEFAULT_FX;

const openSlider = () => {
  sliderContainerElement.classList.remove('hidden');
};

const closeSlider = () => {
  sliderContainerElement.classList.add('hidden');
};

const updSlider = () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    step: chosenEffect.step,
    start: chosenEffect.max,
  });

  if (isDefault()) {
    closeSlider();

    return;
  }

  openSlider();
};

const onEffectsChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  chosenEffect = FX.find(({ name }) => name === evt.target.value);
  picturePreview.className = `effects__preview--${chosenEffect.name}`;
  updSlider();
};

const onSliderUpdate = () => {
  const sliderValue = sliderElement.noUiSlider.get();
  picturePreview.style.filter = isDefault()
    ? DEFAULT_FX.style
    : `${chosenEffect.style}(${sliderValue}${chosenEffect.unit})`;
  effectLevelElement.value = sliderValue;
};

const resetEffects = () => {
  chosenEffect = DEFAULT_FX;
  updSlider();
};

noUiSlider.create(sliderElement, {
  range: {
    min: DEFAULT_FX.min,
    max: DEFAULT_FX.max,
  },
  start: DEFAULT_FX.max,
  step: DEFAULT_FX.step,
  connect: 'lower',
});
closeSlider();

effectElement.addEventListener('change', onEffectsChange);
sliderElement.noUiSlider.on('update', onSliderUpdate);

export { resetEffects, picturePreview };
