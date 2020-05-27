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

const getUsernameInput = () => screen.getByLabelText(/username/i);
const getRegisterButton = () => screen.getByRole('button', { name: /register/i });
const getRandomAvatar = () => random(screen.getAllByRole('button', { name: /avatar/i }));

test('cannot register without selecting an avatar and a username', async () => {
  const { store } = renderWithThemeAndRedux(<Register />);
  const socket = mockServer.start({ onRegister: handleRegister });

  chat.connect(socket, store);
  await waitFor(() => expect(socket.readyState).toBe(SOCKET_OPEN));

  userEvent.click(getRegisterButton());

  expect(handleRegister).toHaveBeenCalledTimes(0);
});

test('cannot register without selecting an avatar', async () => {
  const { store } = renderWithThemeAndRedux(<Register />);
  const socket = mockServer.start({ onRegister: handleRegister });

  chat.connect(socket, store);
  await waitFor(() => expect(socket.readyState).toBe(SOCKET_OPEN));

  await userEvent.type(getUsernameInput(), 'L33tK1ll4r');
  userEvent.click(getRegisterButton());

  expect(handleRegister).toHaveBeenCalledTimes(0);
});

test('cannot register without entering a username', async () => {
  const { store } = renderWithThemeAndRedux(<Register />);
  const socket = mockServer.start({ onRegister: handleRegister });

  chat.connect(socket, store);
  await waitFor(() => expect(socket.readyState).toBe(SOCKET_OPEN));

  userEvent.click(getRandomAvatar());
  userEvent.click(getRegisterButton());

  expect(handleRegister).toHaveBeenCalledTimes(0);
});
