import { getFail } from './util.js';
import { URLS } from './constants.js';
import { renderMiniatures } from './miniature.js';

const getData = () => fetch(URLS.get)
  .then((Response) => {
    if (!Response.ok) {
      throw new Error(`${Response.status} ${Response.statusText}`);
    }

    return Response.json();
  });

const sendData = (body) => fetch(
  URLS.post,
  {
    method: 'POST',
    body,
  },
);

const onGetSuccess = (data) => renderMiniatures(data);
const getPicturesData = () => getData(URLS.get, onGetSuccess, getFail);

export { getData, sendData, getPicturesData };
