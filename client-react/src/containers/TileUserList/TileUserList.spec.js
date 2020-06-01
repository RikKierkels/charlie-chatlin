import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithThemeAndRedux } from '../../test-utils';
import { createStore } from '../../store/store';
import TileUserList from './index';
import avatars from '../../shared/avatars';

jest.mock('../../shared/chat');

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
