import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithThemeAndRedux } from '../../test-utils';
import TileUserProfile from './index';
import { createStore } from '../../store/store';

test('shows the registered users username', () => {
  const store = createStore({ user: { username: 'L33tK1ll4r', avatarId: 'cat-one' } });

  renderWithThemeAndRedux(<TileUserProfile />, store);

  expect(screen.getByText('L33tK1ll4r')).toBeInTheDocument();
});
