module.exports = {
  pwa: {
    name: 'Charlie Chatlin',
    themeColor: '#6000FF',
    msTileColor: '#000000',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'public/service-worker.js'
    }
  }
};
