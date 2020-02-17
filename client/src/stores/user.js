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
    console.log('in acxtions register', user);
    commit(Mutations.SET_USER, user);
  }
};
const mutations = {
  [Mutations.SET_USER](state, payload) {
    state.user = payload;
    console.log('user is now', state.user);
  }
};

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};
