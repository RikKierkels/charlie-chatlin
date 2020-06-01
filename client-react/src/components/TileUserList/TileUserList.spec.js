import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithThemeAndRedux } from '../../test-utils';
import { createStore } from '../../store/store';
import TileUserList from './index';
import avatars from '../../shared/avatars';
import chat from '../../shared/chat';

jest.mock('../../shared/chat');

test('fetches all the active users', () => {
  renderWithThemeAndRedux(<TileUserList />);

  // Due to the restraint on mocking socket IO we have to test an implementation detail here :(.
  expect(chat.getUsers).toHaveBeenCalledTimes(1);
});

test('renders a list of users', () => {
  const users = [
    { username: 'Tabs', avatarId: avatars[0].id },
    { username: 'Sbat', avatarId: avatars[1].id },
  ];
  const store = createStore({ chat: { users } });

  renderWithThemeAndRedux(<TileUserList />, store);

  users.forEach((user, i) => {
    expect(screen.getByText(user.username)).toBeInTheDocument();
    expect(screen.getByAltText(avatars[i].name)).toBeInTheDocument();
  });
});

test('renders no users when there are no active users', () => {
  renderWithThemeAndRedux(<TileUserList />, createStore());

  expect(screen.queryAllByRole('listitem')).toHaveLength(0);
});
