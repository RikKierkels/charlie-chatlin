self.addEventListener('push', function(event) {
  const payload = event.data ? event.data.text() : 'no payload';
  event.waitUntil(
    clients
      .matchAll({
        type: 'window'
      })
      .then(function(clientList) {
        if (clientList.every(client => client.visibilityState !== 'visible')) {
          event.waitUntil(
            self.registration.showNotification('Charlie Chatlin', {
              body: payload
            })
          );
        }
      })
  );
});
