import Actions from '@/constants/actions';
import Mutations from '@/constants/mutations';

const state = {
  user: null
};

const getters = {
  user: state => state.user
};

const actions = {
  [Actions.REGISTER_SUCCESS]({ commit }, user) {
    console.log('Actions.REGISTER_SUCCESS', user);
    commit(Mutations.SET_USER, user);
  }
};
const mutations = {
  [Mutations.SET_USER](state, payload) {
    state.user = payload;
  }
};

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};
