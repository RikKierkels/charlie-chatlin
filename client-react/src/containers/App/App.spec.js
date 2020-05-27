import React from 'react';
import { screen } from '@testing-library/react';
import mockServer, { SOCKET_OPEN } from '../../shared/mock-server';
import { renderWithThemeAndRedux } from '../../test-utils';
import chat from '../../shared/chat';
import { waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import App from './index';
import { random } from '../../shared/utils';

const handleRegister = jest.fn(({ data: user, socket }) => {
  socket.emit('register-success', { user, chatHistory: [] });
});

const usernameInput = () => screen.getByLabelText(/username/i);

test('shows the register container initially ', () => {
  renderWithThemeAndRedux(<App />);
  expect(usernameInput()).toBeInTheDocument();
});

test('shows the chat container after registering as a user', async () => {
  const { store } = renderWithThemeAndRedux(<App />);
  const socket = mockServer.start({ onRegister: handleRegister, onGetUsers: () => {} });

  chat.connect(socket, store);
  await waitFor(() => expect(socket.readyState).toBe(SOCKET_OPEN));

  const randomAvatar = random(screen.getAllByRole('button', { name: /avatar/i }));
  userEvent.click(randomAvatar);
  await userEvent.type(usernameInput(), 'L33tK1ll4r');
  userEvent.click(screen.getByRole('button', { name: /register/i }));

  const messageInput = await screen.findByLabelText(/message/i);
  expect(messageInput).toBeInTheDocument();
  mockServer.stop();
});
