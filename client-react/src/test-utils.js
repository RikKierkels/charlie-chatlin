import React from 'react';
import theme from './design/theme';
import { ThemeProvider } from 'emotion-theming';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from './store/store.js';
import * as faker from 'faker';
import avatars from './shared/avatars';
import { MESSAGE_TYPE } from './shared/socket-constants';
import { random } from './shared/utils';

export const renderWithTheme = (ui) => render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

export const renderWithThemeAndRedux = (ui, store = createStore()) => {
  return {
    ...renderWithTheme(<Provider store={store}>{ui}</Provider>),
    store,
  };
};

export const createMessage = ({
  type = MESSAGE_TYPE.TEXT,
  text = faker.lorem.sentences(),
  sentOn = new Date().toISOString(),
} = {}) => ({
  id: faker.random.uuid(),
  text,
  type,
  sentOn,
  sender: createUser(),
});

const randomAvatarId = () => {
  const ids = avatars.map(({ id }) => id);
  return random(ids);
};

export const createUser = () => ({
  username: faker.internet.userName(),
  avatarId: randomAvatarId(),
});
