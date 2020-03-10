import Chat from '@/utils/chat';
import Actions from '@/constants/actions';
import Mutations from '@/constants/mutations';

const state = {
  messages: [],
  newMessage: null
};

const getters = {
  messages: state =>
    state.messages.sort((a, b) => {
      return a.sentOn - b.sentOn;
    }),
  newMessage: state => state.newMessage
};

const actions = {
  [Actions.MESSAGE_RECEIVED]({ commit }, data) {
    commit(Mutations.ADD_MESSAGE, data);
  },

  [Actions.CHATHISTORY_RECEIVED]({ commit }, data) {
    data.forEach(message => commit(Mutations.ADD_MESSAGE, message));
  },

  [Actions.CHANGE_NEW_MESSAGE]({ commit }, data) {
    commit(Mutations.SET_NEW_MESSAGE, data);
  },

  [Actions.SEND_NEW_MESSAGE]({ commit, getters }) {
    if (!getters.newMessage || !getters.newMessage.trim()) return;

    Chat.sendMessage(getters.newMessage.trim());
    commit(Mutations.SET_NEW_MESSAGE, null);
  }
};

const mutations = {
  [Mutations.ADD_MESSAGE](state, payload) {
    state.messages.push(payload);
  },

  [Mutations.SET_NEW_MESSAGE](state, payload) {
    state.newMessage = payload;
  }
};

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};
