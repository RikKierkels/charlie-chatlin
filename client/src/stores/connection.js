import Actions from '@/constants/actions';
import Mutations from '@/constants/mutations';

const state = {
  connectionStatus: null
};

const getters = {
  connectionStatus: state => state.connectionStatus
};

const actions = {
  [Actions.CONNECTION_STATE_CHANGED]({ commit }, data) {
    commit(Mutations.SET_CONNECTION_STATE, data);
  }
};

const mutations = {
  [Mutations.SET_CONNECTION_STATE](state, payload) {
    state.connectionStatus = payload;
  }
};

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};
