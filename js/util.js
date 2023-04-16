export const makeSequence = (step) => {
  let index = 0;
  return () => {
    const prev = index;
    index += step;
    return [prev, index];
  };
};

export const getRandomInteger = (min, max) => Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + min;

export const getUniqueRandomInteger = (min, max) => {
  const previousValues = [];
  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

export const isEscapeKey = (evt) => evt.key === 'Escape';
export const isAcceptKey = (evt) => evt.key === 'Enter' || evt.key === 'Space';

export const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};
