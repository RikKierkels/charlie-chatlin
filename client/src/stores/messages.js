import Vue from 'vue';
import Actions from '@/constants/actions';
import Mutations from '@/constants/mutations';

const state = {
  messages: {}
};

const getters = {
  messages: state =>
    Object.values(state.messages).sort((a, b) => {
      return a.sentOn - b.sentOn;
    })
};

const actions = {
  [Actions.MESSAGE_RECEIVED]({ commit }, data) {
    commit(Mutations.UPSERT_MESSAGE, data);
  },

  [Actions.CHATHISTORY_RECEIVED]({ commit }, data) {
    data.forEach(message => commit(Mutations.UPSERT_MESSAGE, message));
  }
};

const mutations = {
  [Mutations.UPSERT_MESSAGE](state, payload) {
    // eslint-disable-next-line no-prototype-builtins
    if (state.messages[payload.id] != null) {
      //      console.error('message', payload, 'already exists');
    } else {
      Vue.set(state.messages, payload.id, payload);
    }
  }
};

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};
