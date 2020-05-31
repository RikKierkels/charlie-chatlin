import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import chat from '../../shared/chat';
import { MESSAGE_TYPE } from '../../shared/socket-constants';
import { createStore } from '../../store/store';
import { renderWithThemeAndRedux } from '../../test-utils';
import Chat from './index';

jest.mock('../../shared/chat');

const messageTextArea = () => screen.getByLabelText('');
const submitButton = () => screen.getByRole('button', { name: '' });

test('renders different types of messages', () => {
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
  const store = createStore({ chat: messages });

  renderWithThemeAndRedux(<Chat />, store);

  messages.forEach((message) => expect(screen.getByText(message.text)).toBeInTheDocument());
});

test('can send a new message', async () => {
  const messageText = 'Hey guys!';
  renderWithThemeAndRedux(<Chat />);

  await userEvent.type(messageTextArea(), messageText);
  userEvent.click(submitButton());

  expect(chat.sendMessage).toHaveBeenCalledTimes(1);
  expect(chat.sendMessage).toHaveBeenCalledWith(messageText);
});

test('cannot send message when the message is empty', async () => {
  renderWithThemeAndRedux(<Chat />);

  await userEvent.type(messageTextArea(), '');
  userEvent.click(submitButton());

  expect(chat.sendMessage).toHaveBeenCalledTimes(0);
});
