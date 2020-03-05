import axios from 'axios';

export default {
  getSadGiphy() {
    const params = {
      api_key: '6ChSQ3URWceBUT377D11OnMQF1wwPRqR',
      tag: Math.random() > 0.49 ? 'sad' : 'depressed'
    };
    return axios.get('https://api.giphy.com/v1/gifs/random', { params });
  },
  getApplauseGiphy() {
    const params = {
      api_key: '6ChSQ3URWceBUT377D11OnMQF1wwPRqR',
      tag: 'applause' // Math.random() > 0.49 ? 'applause' : 'celebration'
    };
    return axios.get('https://api.giphy.com/v1/gifs/random', { params });
  }
};
