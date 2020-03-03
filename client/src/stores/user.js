import Actions from '@/constants/actions';
import Mutations from '@/constants/mutations';

const state = {
  // our own user
  user: null,
  // the other users
  otherUsers: null
};

const getters = {
  user: state => state.user,
  otherUsers: state => state.otherUsers
};

const actions = {
  [Actions.REGISTER_SUCCESS]({ commit }, user) {
    console.log('Actions.REGISTER_SUCCESS', user);
    commit(Mutations.SET_USER, user);
  },

  [Actions.USERS_RECEIVED]({ commit }, otherUsers) {
    console.log('Actions.USERS_RECEIVED', otherUsers);
    commit(Mutations.SET_USERS, otherUsers);
  }
};
const mutations = {
  [Mutations.SET_USER](state, payload) {
    state.user = payload;
  },

  [Mutations.SET_USERS](state, payload) {
    state.otherUsers = payload;
  }
};

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};
