const ITEMS = 25;
const COMMENTS_MAX = 5;

const NAMES = [
  'Рахмет',
  'Тофик',
  'Адам',
  'Малик',
  'Хасбулла',
  'Самад',
  'Мухтар',
  'Касим',
  'Заур',
  'Фархад'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTIONS = [
  'Меня трудно найти, легко потерять и невозможно забыть.',
  'Предупреждаю: не смотрите на это фото больше 5 секунд. А то непременно влюбитесь!',
  'Хорошо там, где нас нет и намазано маслом.',
  'Сомневайтесь в ком угодно, только не в себе.',
  'Уметь наслаждаться прожитой жизнью – значит жить дважды.',
  'В мире 7 миллиардов улыбок, а твоя — моя любимая.',
  'Красота и мудрость — в простоте.',
  'Мне кажется, теперь я знаю, как пахнет счастье.',
  'Просто наслаждаюсь чашкой позитив-чая.',
  'Никто не замечает, что я делаю, пока не забуду это сделать.',
  'Любите меня, от этого я буду сиять еще ярче.',
  'Каждому своё красиво.'
];

const getRandomInteger = (min, max) => Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + min;

const getUniqueRandomInteger = (min, max) => {
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

const generateUrl = getUniqueRandomInteger(1, ITEMS);
let generateId = 0;
let generateCommentId = 0;

const createComment = () => {
  const generateAvatarId = getRandomInteger(1, 6);
  const generateAvatar = `img/avatar-${generateAvatarId}.svg`;
  const generateName = NAMES[generateAvatarId];
  generateCommentId++;
  return {
    id: generateCommentId,
    avatar: generateAvatar,
    message: MESSAGES[getRandomInteger(0, MESSAGES.length - 1)],
    name: generateName,
  };
};

const createObject = () => {
  generateId++;
  return {
    id: generateId,
    url: `photos/${generateUrl()}.jpg`,
    description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
    likes: getRandomInteger(15, 200),
    comments: Array.from({ length: getRandomInteger(1, COMMENTS_MAX) }, createComment),
  };
};

// eslint-disable-next-line
const objects = Array.from({ length: ITEMS }, createObject);
