import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithThemeAndRedux } from '../../test/utils';
import TileUserProfile from './index';
import { createStore } from '../../store/store';

test('renders the users username', () => {
  const store = createStore({ user: { username: 'Tabs', avatarId: 'doge' } });

  renderWithThemeAndRedux(<TileUserProfile />, store);

  expect(screen.getByText(/tabs/i)).toBeInTheDocument();
});
