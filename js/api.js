import { URLS } from './constants.js';

const getData = (url) => fetch(url)
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


export { getData, sendData };
