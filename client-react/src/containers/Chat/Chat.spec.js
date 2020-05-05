import React from 'react';
import { screen } from '@testing-library/react';
import { createMessage, createUser, renderContainer } from '../../test-utils';
import mockServer, { SOCKET_OPEN } from '../../shared/mock-server';
import chat from '../../shared/chat';
import { waitFor } from '@testing-library/dom';
import Chat from './index';
import { createStore } from '../../store/store';
import userEvent from '@testing-library/user-event';

beforeEach(() => {
  mockServer.stop();
  mockServer.reset();
});

const handleConnect = (chatHistory) => {
  return jest.fn(({ socket }) => {
    socket.emit('register-success', { user: createUser(), chatHistory });
  });
};
const handleGetActiveUsers = (users) => {
  return jest.fn(({ callback }) => {
    callback(null, users);
  });
};
const handleMessage = jest.fn(({ data: text, socket }) => {
  socket.emit('message', createMessage({ text }));
});

const messageInput = () => screen.getByLabelText('message');
const sendMessageButton = () => screen.getByRole('button', { name: /send/i });

test('shows chat history', async () => {
  const history = [createMessage(), createMessage()];
  const socket = mockServer.start({ onConnect: handleConnect(history) });
  const { store } = renderContainer(<Chat />);

  chat.connect(socket, store);
  await waitFor(() => expect(socket.readyState).toBe(SOCKET_OPEN));

  for (const { text } in history) {
    await waitFor(() => screen.getByText(text));
  }
});

test('shows a list of active users', async () => {
  const users = [createUser(), createUser()];
  const socket = mockServer.start({ onGetActiveUsers: handleGetActiveUsers(users) });
  const { store } = renderContainer(<Chat />);

  chat.connect(socket, store);
  await waitFor(() => expect(socket.readyState).toBe(SOCKET_OPEN));

  for (const { username } in users) {
    await waitFor(() => screen.getByText(username));
  }
});

test('send message appears in the chat', async () => {
  const socket = mockServer.start({ onMessage: handleMessage });
  const { store } = renderContainer(<Chat />, createStore({ user: createUser() }));

  chat.connect(socket, store);
  await waitFor(() => expect(socket.readyState).toBe(SOCKET_OPEN));

  await userEvent.type(messageInput(), 'Sup d0g mah n4m3 is L33tK1ll4r');
  userEvent.click(sendMessageButton());

  await waitFor(() => screen.getByText(/sup d0g mah n4m3 is L33tK1ll4r/i));
});

test('shows a user joined message when a new user joins', async () => {
  const user = createUser();
  const socket = mockServer.start();
  const { store } = renderContainer(<Chat />);

  chat.connect(socket, store);
  await waitFor(() => expect(socket.readyState).toBe(SOCKET_OPEN));
  mockServer.emitUserJoinedEvent(user);

  await waitFor(() => screen.getByText(`${user.username} joined the chat!`));
});
