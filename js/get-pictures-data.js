import { getData } from './api.js';
import { getFail } from './get-msg.js';
import { URLS } from './constants.js';
import { renderMiniatures } from './miniature.js';

const onGetSuccess = (data) => renderMiniatures(data);
const getPicturesData = () => getData(URLS.get, onGetSuccess, getFail);

export { getPicturesData };
