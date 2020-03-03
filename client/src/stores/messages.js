import Actions from '@/constants/actions';
import Mutations from '@/constants/mutations';

const state = {
  messages: []
};

const getters = {
  messages: state =>
    state.messages.sort((a, b) => {
      return a.sentOn - b.sentOn;
    })
};

const actions = {
  [Actions.MESSAGE_RECEIVED]({ commit }, data) {
    commit(Mutations.UPSERT_MESSAGE, data);
  },

  [Actions.CHATHISTORY_RECEIVED]({ commit }, data) {
    data.forEach(message => commit(Mutations.UPSERT_MESSAGE, message));
  },

  [Actions.USER_JOINED]({ commit }, user) {
    commit(Mutations.UPSERT_MESSAGE, {
      id: null,
      text: `${user.username} joined the chat!`,
      sentOn: new Date().toISOString(),
      sender: null
    });
  }
};

const mutations = {
  [Mutations.UPSERT_MESSAGE](state, payload) {
    console.log('payload', payload);
    state.messages.push(payload);
  }
};

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};
