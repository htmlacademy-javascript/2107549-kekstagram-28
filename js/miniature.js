import { openBigPhoto } from './gallery.js';

const photosContainerElement = document.querySelector('.pictures');
const photoTemplateElement = document.querySelector('#picture').content.querySelector('.picture');

const createMiniature = (data) => {
  const miniature = photoTemplateElement.cloneNode(true);
  const pictureImgElement = miniature.querySelector('.picture__img');

  pictureImgElement.src = data.url;
  pictureImgElement.alt = data.description;
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
  data.forEach((item) => photosContainerElement.append(createMiniature(item)));
};

export { renderMiniatures };
