import Actions from '@/constants/actions';
import Mutations from '@/constants/mutations';

const state = {
  messages: []
};

const getters = {
  messages: state => state.messages
};

const actions = {
  [Actions.MESSAGE_RECEIVED]({ commit }, data) {
    console.log('received single message', data);
    commit(Mutations.UPSERT_MESSAGE, data);
  },
  [Actions.CHATHISTORY_RECEIVED]({ commit }, data) {
    commit(Mutations.UPSERT_MESSAGE, data);
    console.log('chat history received', data);
  }
};

const mutations = {
  [Mutations.UPSERT_MESSAGE](state, payload) {
    console.log('upserting message', state, payload);
  }
};

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};
