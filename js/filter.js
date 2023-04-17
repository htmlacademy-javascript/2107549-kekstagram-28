const PICTURES_COUNT = 10;
const FILTER = {
  default: 'filter-default',
  random: 'filter-random',
  discussed: 'filter-discussed',
};

const filterBlockElement = document.querySelector('.img-filters');

let currentFilter = FILTER.default;
let pictures = [];

const sortRandom = () => Math.random() - 0.5;

const sortByComments = (photo1, photo2) => photo2.comments.length - photo1.comments.length;

const getFilteredPictures = () => {
  switch (currentFilter) {
    case FILTER.random: return [...pictures].sort(sortRandom).slice(0, PICTURES_COUNT);
    case FILTER.discussed: return [...pictures].sort(sortByComments);
    default: return [...pictures];
  }
};

const setOnFilterClick = (cb) => {
  filterBlockElement.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }

    if (evt.target.id === currentFilter) {
      return;
    }

    filterBlockElement.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
    currentFilter = evt.target.id;
    cb(getFilteredPictures());
  });
};

const filter = (gallery, cb) => {
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  pictures = [...gallery];
  setOnFilterClick(cb);
};

export { filter, getFilteredPictures };
