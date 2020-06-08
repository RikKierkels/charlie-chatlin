import React from 'react';
import { screen } from '@testing-library/dom';
import { renderWithTheme } from '../../test-utils';
import TileUserJoined from './index';

test('has message text', () => {
  const text = 'Tabs has joined the room!';
  fetch.mockResponseOnce(JSON.stringify({ data: {} }));

  renderWithTheme(<TileUserJoined message={{ text }} />);

  expect(screen.getByText(text)).toBeInTheDocument();
});
