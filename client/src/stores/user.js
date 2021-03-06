import Chat from '@/utils/chat';
import Actions from '@/constants/actions';
import Mutations from '@/constants/mutations';

const state = {
  user: null,
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

  [Actions.LOAD_USERS]() {
    Chat.getRegisteredUsers();
  },

  [Actions.USERS_RECEIVED]({ commit }, onlineUsers) {
    commit(Mutations.SET_USERS, onlineUsers);
  },

  [Actions.USER_JOINED]({ commit }, user) {
    commit(Mutations.ADD_USER, user);
  },

  [Actions.USER_LEFT]({ commit }, user) {
    commit(Mutations.REMOVE_USER, user);
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
    if (state.onlineUsers == null) {
      state.onlineUsers = [];
    }

    if (state.onlineUsers.some(u => u.username === payload.username)) {
      return;
    }

    state.onlineUsers.push(payload);
  },

  [Mutations.REMOVE_USER](state, payload) {
    if (state.onlineUsers == null) return;

    state.onlineUsers = state.onlineUsers.filter(
      u => u.username !== payload.username
    );
  }
};

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};
