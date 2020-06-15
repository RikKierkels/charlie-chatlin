const dotenv = require('dotenv');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  throw new Error("Couldn't find the ..env file.️");
}

module.exports = {
  port: parseInt(process.env.PORT, 10),
  api: {
    prefix: '/api'
  },
  session: {
    maxDisconnectTime: parseInt(process.env.MAX_DISCONNECT_TIME, 10)
  },
  vapid: {
    url: process.env.URL,
    keys: {
      public: process.env.VAPID_KEY_PUBLIC,
      private: process.env.VAPID_KEY_PRIVATE
    }
  }
};
