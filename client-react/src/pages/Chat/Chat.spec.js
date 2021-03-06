import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import chat from '../../shared/chat';
import { MESSAGE_TYPE } from '../../shared/socket-constants';
import { createStore } from '../../store/store';
import { renderWithThemeAndRedux } from '../../test/utils';
import Chat from './index';

jest.mock('../../shared/chat');

const user = { username: 'Tabs', avatarId: 'doge' };
const messageTextArea = () => screen.getByLabelText(/message/i);
const submitButton = () => screen.getByRole('button', { name: /send/i });

test('renders different types of messages', async () => {
  const messages = [
    {
      id: '1',
      text: 'Tabs has joined the chat!',
      type: MESSAGE_TYPE.USER_JOINED,
      sentOn: new Date(2020, 5, 9, 20, 19),
      sender: { username: 'Tabs', avatarId: 'doge' },
    },
    {
      id: '2',
      text: 'Hey guys',
      type: MESSAGE_TYPE.TEXT,
      sentOn: new Date(2020, 5, 9, 20, 20),
      sender: { username: 'Tabs', avatarId: 'doge' },
    },
    {
      id: '3',
      text: 'Hello goodman!',
      type: MESSAGE_TYPE.TEXT,
      sentOn: new Date(2020, 5, 9, 20, 21),
      sender: { username: 'Darrow', avatarId: 'yelling-woman' },
    },
  ];

  renderWithThemeAndRedux(<Chat />, createStore({ user, messages }));

  for (const { text } of messages) {
    expect(await screen.findByText(text)).toBeInTheDocument();
  }
});

test('can send a new message', async () => {
  const messageText = 'Hey guys!';
  renderWithThemeAndRedux(<Chat />, createStore({ user }));

  await userEvent.type(messageTextArea(), messageText);
  userEvent.click(submitButton());

  expect(chat.sendMessage).toHaveBeenCalledTimes(1);
  expect(chat.sendMessage).toHaveBeenCalledWith(messageText);
});

test('cannot send message when the message is empty', async () => {
  renderWithThemeAndRedux(<Chat />, createStore({ user }));

  await userEvent.type(messageTextArea(), '');
  userEvent.click(submitButton());

  expect(chat.sendMessage).toHaveBeenCalledTimes(0);
});
