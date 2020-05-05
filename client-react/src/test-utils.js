import React from 'react';
import theme from './design/theme';
import { ThemeProvider } from 'emotion-theming';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from './store/store.js';
import * as faker from 'faker';
import avatars from './shared/avatars';
import { MESSAGE_TYPE } from './shared/socket-constants';

export const renderWithTheme = (ui) => render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

export const renderContainer = (ui, store = createStore()) => {
  return {
    ...renderWithTheme(<Provider store={store}>{ui}</Provider>),
    store,
  };
};

export const createMessage = ({ type = MESSAGE_TYPE.TEXT, text = faker.lorem.sentences() } = {}) => ({
  id: faker.random.uuid(),
  text,
  type,
  sentOn: new Date().toISOString(),
  sender: createUser(),
});

const randomAvatarId = () => {
  const ids = avatars.map(({ id }) => id);
  return ids[Math.floor(Math.random() * ids.length)];
};

export const createUser = () => ({
  username: faker.internet.userName(),
  avatarId: randomAvatarId(),
});
