/* const avatarImages = require.context(
  '../../public/img/avatars',
  false,
  /^.*\.png$/
);

 */
import Register from '@/constants/register';

const avatars = [
  { id: 'doge', username: 'Doge' },
  {
    id: 'yelling-woman',
    username: 'Screaming Woman'
  },
  {
    id: 'cat-one',
    username: 'Screamed At Cat'
  },
  {
    id: 'distracted-boyfriend-one',
    username: 'Distracted Boyfriend'
  },
  {
    id: 'distracted-boyfriend-two',
    username: "Distracted Boyfriend's Girlfriend"
  },
  {
    id: 'drakeposting-one',
    username: 'Rejecting Drake'
  },
  {
    id: 'drakeposting-two',
    username: 'Approving Drake'
  },
  {
    id: 'roll-safe-one',
    username: 'Roll Safe'
  },
  {
    id: 'ancient-aliens',
    username: 'Ancient Aliens Guy'
  },

  {
    id: 'fry',
    username: 'Fry'
  },

  {
    id: 'good-guy-greg',
    username: 'Good Guy Greg'
  },

  {
    id: 'scumbag-steve',
    username: 'Scumbag Steve'
  },

  {
    id: 'harold',
    username: 'Harold'
  },

  {
    id: 'pigeon-guy',
    username: 'Pigeon Guy'
  },
  {
    id: 'overly-attached-girlfriend',
    username: 'Overly Attached Girlfriend'
  },
  {
    id: 'would-be-great-guy',
    username: 'Would Be Great Guy'
  },
  {
    id: 'bad-luck-brain',
    username: 'Bad Luck Brain'
  },
  {
    id: 'change-sponge-mind',
    username: 'Change My Mind Sponge Bob'
  },
  {
    id: 'left-exit-car',
    username: 'Left Exit Car'
  },
  {
    id: 'facepalm-picard',
    username: 'Facepalm Picard'
  }
];

const state = {
  avatars: avatars.map(a => {
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
  [Register.Actions.SELECT_AVATAR]({ commit }, avatar) {
    commit(Register.Mutations.SELECT_AVATAR, avatar);
  }
};
const mutations = {
  [Register.Mutations.SELECT_AVATAR](state, payload) {
    /*
      1. iterate all avatars
      2. if the ids match, set isSelected to true
      3. else, set isSelected to false
    */
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
