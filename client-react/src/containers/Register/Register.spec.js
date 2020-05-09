import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithThemeAndRedux } from '../../test-utils';
import userEvent from '@testing-library/user-event';
import Register from './index';
import { waitFor } from '@testing-library/dom';
import chat from '../../shared/chat';
import mockServer, { SOCKET_OPEN } from '../../shared/mock-server';
import { random } from '../../shared/utils';

beforeEach(() => {
  mockServer.stop();
  mockServer.reset();
});

const handleRegister = jest.fn(({ data: user, socket }) => {
  socket.emit('register-success', { user, chatHistory: [] });
});

const usernameInput = () => screen.getByLabelText(/username/i);
const registerButton = () => screen.getByRole('button', { name: /register/i });
const randomAvatar = () => random(screen.getAllByRole('button', { name: /avatar/i }));

test('cannot register without selecting an avatar and a username', async () => {
  const { store } = renderWithThemeAndRedux(<Register />);
  const socket = mockServer.start({ onRegister: handleRegister });

  chat.connect(socket, store);
  await waitFor(() => expect(socket.readyState).toBe(SOCKET_OPEN));

  userEvent.click(registerButton());

  expect(handleRegister).toHaveBeenCalledTimes(0);
});

test('cannot register without selecting an avatar', async () => {
  const { store } = renderWithThemeAndRedux(<Register />);
  const socket = mockServer.start({ onRegister: handleRegister });

  chat.connect(socket, store);
  await waitFor(() => expect(socket.readyState).toBe(SOCKET_OPEN));

  await userEvent.type(usernameInput(), 'L33tK1ll4r');
  userEvent.click(registerButton());

  expect(handleRegister).toHaveBeenCalledTimes(0);
});

test('cannot register without entering a username', async () => {
  const { store } = renderWithThemeAndRedux(<Register />);
  const socket = mockServer.start({ onRegister: handleRegister });

  chat.connect(socket, store);
  await waitFor(() => expect(socket.readyState).toBe(SOCKET_OPEN));

  userEvent.click(randomAvatar());
  userEvent.click(registerButton());

  expect(handleRegister).toHaveBeenCalledTimes(0);
});
