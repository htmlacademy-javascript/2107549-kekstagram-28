import { getFail } from './get-msg.js';
import { URLS } from './constants.js';
import { renderMiniatures } from './miniature.js';

const getData = (url, onSuccess, onFail) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch((err) => {
      onFail(err);
    });
};

const sendData = (url, onSuccess, onFail, body) => {
  fetch(url, {
    method: 'POST',
    body,
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

const onGetSuccess = (data) => renderMiniatures(data);
const getPicturesData = () => getData(URLS.get, onGetSuccess, getFail);

export { getData, sendData, getPicturesData };
