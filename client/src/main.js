import Vue from 'vue';
import App from '@/App';
import './registerServiceWorker';
import router from '@/router';
import store from '@/store';
import Chat from '@/utils/chat';
import { subscribe, register } from './utils/web-push';

// TODO: Move to chat register handler.
(async function() {
  await register();
  const subscription = await subscribe();
  Chat.pushSubscription(subscription);
})();

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* library.add(fab); */
library.add(fas);
/* library.add(far); */
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
