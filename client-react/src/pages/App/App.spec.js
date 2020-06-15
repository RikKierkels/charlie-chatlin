import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithThemeAndRedux } from '../../test/utils';
import App from './index';
import { createStore } from '../../store/store';

jest.mock('../../shared/chat');

// Sadly tests are tightly coupled to redux as there is no maintained lib. that enables the mocking of
// socket io.

test('shows the register container initially ', () => {
  renderWithThemeAndRedux(<App />);
  expect(screen.getByText(/welcome to the mediaan masterclass/i)).toBeInTheDocument();
});

test('shows the chat container after registering as a user', () => {
  const store = createStore({ user: { username: 'Tabs', avatarId: 'doge' } });
  renderWithThemeAndRedux(<App />, store);

  expect(screen.getByText(/tabs/i)).toBeInTheDocument();
});
