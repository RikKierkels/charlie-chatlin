import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithTheme } from '../../test/test-utils';
import TileMessage from './index';
import { MESSAGE_TYPE } from '../../shared/socket-constants';

test('renders the message details', () => {
  const message = {
    id: '1',
    text: "I'm a message",
    type: MESSAGE_TYPE.TEXT,
    sentOn: new Date(2020, 5, 9, 20, 20),
    sender: { username: 'Tabs', avatarId: 'doge' },
  };

  renderWithTheme(<TileMessage message={message} />);

  expect(screen.getByText(message.sender.username)).toBeInTheDocument();
  expect(screen.getByText(message.text)).toBeInTheDocument();
  expect(screen.getByText('20:20')).toBeInTheDocument();
});
