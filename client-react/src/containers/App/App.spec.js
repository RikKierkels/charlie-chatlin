import React from 'react';
import { screen } from '@testing-library/react';
import mockServer, { SOCKET_OPEN } from '../../shared/mock-server';
import { renderWithThemeAndRedux } from '../../test-utils';
import chat from '../../shared/chat';
import { waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import App from './index';

const handleRegister = jest.fn(({ data: user, socket }) => {
  socket.emit('register-success', { user, chatHistory: [] });
});

const messageInput = () => screen.getByLabelText(/message/i);
const usernameInput = () => screen.getByLabelText(/username/i);
const registerButton = () => screen.getByRole('button', { name: /register/i });
const randomAvatar = () => {
  const avatars = screen.getAllByRole('button', { name: /avatar/i });
  return avatars[Math.floor(Math.random() * avatars.length)];
};

test('shows the register container initially ', () => {
  renderWithThemeAndRedux(<App />);
  usernameInput();
});

test('shows the chat container after registering as a user', async () => {
  const { store } = renderWithThemeAndRedux(<App />);
  const socket = mockServer.start({ onRegister: handleRegister, onGetUsers: () => {} });

  chat.connect(socket, store);
  await waitFor(() => expect(socket.readyState).toBe(SOCKET_OPEN));

  userEvent.click(randomAvatar());
  await userEvent.type(usernameInput(), 'L33tK1ll4r');
  userEvent.click(registerButton());

  await waitFor(() => messageInput());
  mockServer.stop();
});
