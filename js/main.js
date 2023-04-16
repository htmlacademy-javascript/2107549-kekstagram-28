import './form.js';
import { onFormSubmit, closeModal } from './form.js';
import './effects.js';
import './scale.js';
import { getFail, debounce, connectionErrorMessage } from './util.js';
import { getData } from './api.js';
import { filter, getFilteredPictures } from './filter.js';
import { renderMiniatures } from './miniature.js';
import { URLS } from './constants.js';
import './load-picture.js';

try {
  const data = await getData(URLS.get);
  const debouncedCreatePreviews = debounce(renderMiniatures);
  filter(data, debouncedCreatePreviews);
  renderMiniatures(getFilteredPictures());
} catch {
  getFail(connectionErrorMessage);
}

onFormSubmit(closeModal);
