import React from 'react';
import { screen, waitFor } from '@testing-library/dom';
import { renderWithTheme } from '../../test-utils';
import TileUserJoined from './index';

test('renders the message text', () => {
  const text = 'Tabs has joined the room!';
  renderWithTheme(<TileUserJoined message={{ text }} />);

  expect(screen.getByText(text)).toBeInTheDocument();
});

test('shows a gif as the background image', async () => {
  const gif = 'http://mock.giphy.com/tabs.gif';
  window.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ data: { images: { ['downsized_medium']: gif } } }),
    }),
  );

  const { container } = renderWithTheme(<TileUserJoined message={{ text: 'Tabs has joined the room!' }} />);

  expect(container.firstElementChild).toHaveStyleRule('background-image', `url("${gif}")`);
});
