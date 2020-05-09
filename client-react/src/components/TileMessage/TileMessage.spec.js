import React from 'react';
import { screen } from '@testing-library/react';
import { createMessage, renderWithTheme } from '../../test-utils';
import TileMessage from './index';

test('shows the username', () => {
  const message = createMessage();

  renderWithTheme(<TileMessage message={message} />);

  screen.getByText(message.sender.username);
});

test('shows the message', () => {
  const message = createMessage();

  renderWithTheme(<TileMessage message={message} />);

  screen.getByText(message.text);
});

test('shows the formatted time that the message was sent on', () => {
  const sentOn = new Date(2020, 5, 9, 20, 20);
  const message = createMessage({ sentOn });

  renderWithTheme(<TileMessage message={message} />);

  screen.getByText('20:20');
});
