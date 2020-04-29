import React from 'react';
import { screen } from '@testing-library/react';
import Register from './register';
import { renderWithReduxAndTheme } from '../../shared/test-utils';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

const renderRegisterContainer = () => {
  const history = createMemoryHistory();
  return {
    ...renderWithReduxAndTheme(
      <Router history={history}>
        <Register />
      </Router>,
    ),
    history,
  };
};

const usernameInput = () => screen.getByRole('textbox');
const registerButton = () => screen.getByRole('button', { name: /register/i });
const randomAvatar = () => {
  const avatars = screen.getAllByRole('button', { name: /avatar/i });
  return avatars[Math.floor(Math.random() * avatars.length)];
};

test('registers a user', () => {
  const { history } = renderRegisterContainer();

  userEvent.click(randomAvatar());
  userEvent.type(usernameInput(), 'Dog');
  userEvent.click(registerButton());

  expect(history.location.pathname).toBe('/chat');
});

test('cannot register without selecting an avatar and a username', () => {
  const { history } = renderRegisterContainer();

  userEvent.click(registerButton());

  expect(history.location.pathname).not.toBe('/chat');
});

test('cannot register without selecting an avatar', () => {
  const { history } = renderRegisterContainer();

  userEvent.type(usernameInput(), 'Dog');
  userEvent.click(registerButton());

  expect(history.location.pathname).not.toBe('/chat');
});

test('cannot register without entering a username', () => {
  const { history } = renderRegisterContainer();

  userEvent.click(randomAvatar());
  userEvent.click(registerButton());

  expect(history.location.pathname).not.toBe('/chat');
});
