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
    commit(Mutations.ADD_MESSAGE, data);
  },

  [Actions.CHATHISTORY_RECEIVED]({ commit }, data) {
    data.forEach(message => commit(Mutations.ADD_MESSAGE, message));
  },

  [Actions.USER_JOINED]({ commit }, user) {
    commit(Mutations.ADD_MESSAGE, {
      id: null,
      text: `${user.username} joined the chat!`,
      sentOn: new Date().toISOString(),
      sender: null,
      type: 'user-joined'
    });
  },

  [Actions.USER_LEFT]({ commit }, user) {
    commit(Mutations.ADD_MESSAGE, {
      id: -2,
      text: `${user.username} left the chat :(`,
      sendOn: new Date().toISOString(),
      sender: null,
      type: 'user-left'
    });
  }
};

const mutations = {
  [Mutations.ADD_MESSAGE](state, payload) {
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
