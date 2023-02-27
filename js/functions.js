//проверка длины строки.
const checkLength = (string, stringLength) => string.length <= stringLength;
checkLength('проверяемая строка', 10);


//проверка строки палиндрома.
const isPalindrome = (string) => {
  const word = string.toLowerCase().replaceAll(' ', '');
  const wordReverse = word.split('').reverse().join('');
  return word === wordReverse;
};
isPalindrome('Лёша на полке клопа нашёл ');


//извлечение цифр из строки.
const getNumber = (type) => {
  const string = (String(type)).replaceAll(' ', '');
  let elementNumber = '';
  for (const element of string) {
    if (!isNaN(Number(element))) {
      elementNumber += element;
    }
  }
  return elementNumber.length === 0 ? NaN : Number(elementNumber);
};
getNumber(('1 кефир, 0.5 батона'));


//добавление символов перед строкой для ее увеличения до нужной длины.
const padStart = (originalString, minLength, padString) => {
  const padStringLength = minLength - originalString.length;
  if (padStringLength <= 0) {
    return originalString;
  }
  let repeatString = '';
  while (repeatString.length < padStringLength) {
    repeatString += padString;
  }
  if (repeatString.length > padStringLength) {
    const shortElement = padString.slice(0, padStringLength - repeatString.length);
    const shortString = repeatString.slice(0, repeatString.length - padString.length);
    return `${shortElement}${shortString}${originalString}`;
  }
  return `${repeatString}${originalString}`;
};
padStart('1', 4, '0');
