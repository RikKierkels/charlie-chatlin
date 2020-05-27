import React from 'react';
import { screen } from '@testing-library/react';
import { createMessage, renderWithTheme } from '../../test-utils';
import TileMessage from './index';

test('renders the message details', () => {
  const sentOn = new Date(2020, 5, 9, 20, 20);
  const message = createMessage({ sentOn });

  renderWithTheme(<TileMessage message={message} />);

  expect(screen.getByText(message.sender.username)).toBeInTheDocument();
  expect(screen.getByText(message.text)).toBeInTheDocument();
  expect(screen.getByText('20:20')).toBeInTheDocument();
});
