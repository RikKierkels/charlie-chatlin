module.exports = {
  pwa: {
    name: 'Charlie Chatlin',
    themeColor: '#4DBA87',
    msTileColor: '#000000',

    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'public/service-worker.js'
      // ...other Workbox options...
    }
  }
};
