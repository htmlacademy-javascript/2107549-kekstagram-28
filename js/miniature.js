import { openBigPhoto } from './gallery.js';
import { getData } from './api.js';
import { getFail } from './get-msg.js';

const GET_URL = 'https://28.javascript.pages.academy/kekstagram/data';

const photosContainer = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createMiniature = (data) => {
  const miniature = photoTemplate.cloneNode(true);
  miniature.querySelector('.picture__img').src = data.url;
  miniature.querySelector('.picture__img').alt = data.description;
  miniature.querySelector('.picture__comments').textContent = data.comments.length;
  miniature.querySelector('.picture__likes').textContent = data.likes;

  miniature.addEventListener('click', (event) => {
    event.preventDefault();
    openBigPhoto({
      comments: data.comments,
      description: data.description,
      url: data.url,
      likes: data.likes
    });
  });

  return miniature;
};

const renderMiniatures = (data) => {
  data.forEach((item) => photosContainer.append(createMiniature(item)));
};

const onGetSuccess = (data) => renderMiniatures(data);

const getPicturesData = () => getData(GET_URL, onGetSuccess, getFail);

export { getPicturesData };
