import React from 'react';
import { act, screen } from '@testing-library/react';
import { renderWithReduxAndTheme } from '../../test-utils';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Register from './register';
import { waitFor } from '@testing-library/dom';
import chat from '../../shared/chat';
import mockServer from '../../shared/mock-server';

beforeEach(() => {
  mockServer.stop();
});

const handleRegister = (socket, data) => socket.emit('register-success', { user: data, chatHistory: [] });

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
  const { history } = renderRegisterContainer();

  const socket = mockServer.start({ onRegister: handleRegister });
  chat.connect(socket);
  await waitFor(() => expect(socket.readyState).toBe(1));

  userEvent.click(randomAvatar());
  await userEvent.type(usernameInput(), 'Dog');
  userEvent.click(registerButton());

  await waitFor(() => expect(history.location.pathname).toBe('/chat'), { timeout: 2000 });
});

// test('cannot register without selecting an avatar and a username', async () => {
//   const socket = mockServer.start({ register: (data) => console.log('mock is working bois', data) });
//   chat.connect(socket);
//
//   const { history } = renderRegisterContainer();
//
//   userEvent.click(registerButton());
//
//   expect(history.location.pathname).not.toBe('/chat');
// });
//
// test('cannot register without selecting an avatar', async () => {
//   const socket = mockServer.start({ register: (data) => console.log('mock is working bois', data) });
//   chat.connect(socket);
//
//   const { history } = renderRegisterContainer();
//
//   await userEvent.type(usernameInput(), 'Dog');
//   userEvent.click(registerButton());
//
//   expect(history.location.pathname).not.toBe('/chat');
// });
//
// test('cannot register without entering a username', () => {
//   const socket = mockServer.start({ register: (data) => console.log('mock is working bois', data) });
//   chat.connect(socket);
//
//   const { history } = renderRegisterContainer();
//
//   userEvent.click(randomAvatar());
//   userEvent.click(registerButton());
//
//   expect(history.location.pathname).not.toBe('/chat');
// });
