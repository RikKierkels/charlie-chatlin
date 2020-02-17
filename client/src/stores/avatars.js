import Actions from '@/constants/actions';
import Mutations from '@/constants/mutations';
import theAvatars from '@/constants/avatars';

const state = {
  avatars: theAvatars.map(a => {
    return {
      id: a.id,
      image: `/img/avatars/${a.id}.png`,
      username: a.username,
      isAvailable: true,
      isSelected: false
    };
  })
};

const getters = {
  avatars: state => state.avatars,
  availableAvatars: state => state.avatars.filter(a => a.isAvailable),
  selectedAvatar: state => state.avatars.find(a => a.isSelected)
};

const actions = {
  [Actions.SELECT_AVATAR]({ commit }, avatar) {
    commit(Mutations.SET_SELECTED_AVATAR, avatar);
  },

  [Actions.USER_JOINED]({ commit }, user) {
    commit(Mutations.SET_UNAVAILABLE_AVATAR, user);
  }
};

const mutations = {
  [Mutations.SET_UNAVAILABLE_AVATAR](state, payload) {
    const a = state.avatars.find(a => a.id === payload.avatarId);
    if (a) a.isAvailable = false;
  },
  [Mutations.SET_SELECTED_AVATAR](state, payload) {
    state.avatars.forEach(a => {
      a.isSelected = a.id === payload.id;
    });
  }
};

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};
