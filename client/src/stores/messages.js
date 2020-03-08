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
