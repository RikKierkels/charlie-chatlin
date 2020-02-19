import Vue from 'vue';
import Vuex from 'vuex';

import Connection from '@/stores/connection';
import Avatars from '@/stores/avatars';
import User from '@/stores/user';
import Messages from '@/stores/messages';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Connection,
    Avatars,
    User,
    Messages
  }
});
