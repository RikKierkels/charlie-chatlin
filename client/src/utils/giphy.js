import axios from 'axios';

export default {
  getGiphyWithTag(tag) {
    const params = {
      api_key: process.env.VUE_APP_GIPHY_API_KEY,
      tag: tag
    };
    return axios.get('https://api.giphy.com/v1/gifs/random', { params });
  }
};
