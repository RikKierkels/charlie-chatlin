import React from 'react';
import { screen } from '@testing-library/react';
import { renderContainer } from '../../test-utils';
import App from './index';
import { createStore } from '../../store/store';

test('shows the register page if the user has not registered', () => {
  renderContainer(<App />, createStore());

  screen.getByRole('button', { name: /register/i });
});

test('shows the chat page if the user has registered', () => {
  const user = { username: 'Dog', avatarId: 'dog' };

  renderContainer(<App />, createStore({ user: { ...user } }));

  screen.getByRole('button', { name: /send message/i });
});
