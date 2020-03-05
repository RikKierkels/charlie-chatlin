import axios from 'axios';

export default {
  getApplauseGiphy() {
    console.log('proapikey', process.env.GIPHY_API_KEY);
    const params = {
      api_key: '6ChSQ3URWceBUT377D11OnMQF1wwPRqR',
      tag: Math.random() > 0.49 ? 'applause' : 'party'
    };
    console.log('Math', Math.random());
    return axios.get('https://api.giphy.com/v1/gifs/random', { params });
  }
};
