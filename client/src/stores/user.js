import Actions from '@/constants/actions';
import Mutations from '@/constants/mutations';

const state = {
  // our own user
  user: null,
  // the other users
  onlineUsers: null
};

const getters = {
  user: state => state.user,
  onlineUsers: state => state.onlineUsers
};

const actions = {
  [Actions.REGISTER_SUCCESS]({ commit }, user) {
    commit(Mutations.SET_USER, user);
  },

  [Actions.USERS_RECEIVED]({ commit }, onlineUsers) {
    commit(Mutations.SET_USERS, onlineUsers);
  },

  [Actions.USER_JOINED]({ commit }, user) {
    commit(Mutations.ADD_USER, user);
  }
};
const mutations = {
  [Mutations.SET_USER](state, payload) {
    state.user = payload;
  },

  [Mutations.SET_USERS](state, payload) {
    state.onlineUsers = payload;
  },

  [Mutations.ADD_USER](state, payload) {
    if (state.onlineUsers) {
      if (state.onlineUsers.find(u => u.username === payload.username)) {
        // the user already exists
      } else {
        state.onlineUsers.push(payload);
      }
    }
  }
};

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};
