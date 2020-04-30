import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithReduxAndTheme } from '../../test-utils';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import chat from '../../shared/chat';
import Register from './register';
import { setUser } from '../../store/userSlice';

jest.mock('../../shared/chat.js');

beforeEach(() => {
  chat.register.mockClear();
});

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

test('registers a user', async () => {
  const { history, store } = renderRegisterContainer();

  userEvent.click(randomAvatar());
  await userEvent.type(usernameInput(), 'Dog');
  userEvent.click(registerButton());

  expect(history.location.pathname).toBe('/chat');
});

test('cannot register without selecting an avatar and a username', () => {
  const { history } = renderRegisterContainer();

  userEvent.click(registerButton());

  expect(history.location.pathname).not.toBe('/chat');
});

test('cannot register without selecting an avatar', async () => {
  const { history } = renderRegisterContainer();

  await userEvent.type(usernameInput(), 'Dog');
  userEvent.click(registerButton());

  expect(history.location.pathname).not.toBe('/chat');
});

test('cannot register without entering a username', () => {
  const { history } = renderRegisterContainer();

  userEvent.click(randomAvatar());
  userEvent.click(registerButton());

  expect(history.location.pathname).not.toBe('/chat');
});
