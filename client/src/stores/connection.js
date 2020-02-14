import Connection from '@/constants/connection';

const state = {
  connectionStatus: null
};

const getters = {
  connectionStatus: state => state.connectionStatus
};

const actions = {
  [Connection.Actions.STATE_CHANGED]({ commit }, data) {
    commit(Connection.Mutations.SET_STATUS, data);
  }
};

const mutations = {
  [Connection.Mutations.SET_STATUS](state, payload) {
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
