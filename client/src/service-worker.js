self.addEventListener('push', function(event) {
  console.log(event);
  const payload = event.data ? event.data.text() : 'no payload';
  event.waitUntil(
    self.registration.showNotification('ServiceWorker Cookbook', {
      body: payload
    })
  );
});
