import axios from 'axios';

export default {
  getSadGiphy() {
    const params = {
      api_key: process.env.VUE_APP_GIPHY_API_KEY,
      tag: Math.random() > 0.49 ? 'boo' : 'sad'
    };
    return axios.get('https://api.giphy.com/v1/gifs/random', { params });
  },
  getApplauseGiphy() {
    const params = {
      api_key: process.env.VUE_APP_GIPHY_API_KEY,
      tag: 'applause' // Math.random() > 0.49 ? 'applause' : 'celebration'
    };
    return axios.get('https://api.giphy.com/v1/gifs/random', { params });
  }
};
