import axios from 'axios';
axios.defaults.timeout = 10000;

import config from './_configs';
const API = config.API;

export const getHomeData = callBack => {
  axios
    .get(API + 'todos', {})
    .then(response => {
      return callBack({
        data: response.data,
      });
    })
    .catch(e => {
      return callBack({error: e});
    });
};
