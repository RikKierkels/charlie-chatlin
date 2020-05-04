import React from 'react';
import { screen } from '@testing-library/react';
import mockServer, { SOCKET_OPEN } from '../../shared/mock-server';
import { renderContainer } from '../../test-utils';
import chat from '../../shared/chat';
import { waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import App from './index';

const handleRegister = jest.fn((socket, data) => {
  socket.emit('register-success', { user: data, chatHistory: [] });
});

const messageInput = () => screen.getByLabelText(/message/i);
const usernameInput = () => screen.getByLabelText(/username/i);
const registerButton = () => screen.getByRole('button', { name: /register/i });
const randomAvatar = () => {
  const avatars = screen.getAllByRole('button', { name: /avatar/i });
  return avatars[Math.floor(Math.random() * avatars.length)];
};

test('shows the register container initially ', () => {
  renderContainer(<App />);
  usernameInput();
});

test('shows the chat after registering as a user', async () => {
  const { store } = renderContainer(<App />);
  const socket = mockServer.start({ onRegister: handleRegister });
  chat.connect(socket, store);
  await waitFor(() => expect(socket.readyState).toBe(SOCKET_OPEN));

  userEvent.click(randomAvatar());
  await userEvent.type(usernameInput(), 'Dog');
  userEvent.click(registerButton());

  await waitFor(() => messageInput());
  mockServer.stop();
});
