import Vue from 'vue';
import Vuex from 'vuex';

import Connection from '@/stores/connection';
import Avatars from '@/stores/avatars';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Connection,
    Avatars
  }
});
