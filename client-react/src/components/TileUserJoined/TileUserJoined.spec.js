import React from 'react';
import { screen, waitFor } from '@testing-library/dom';
import { renderWithTheme } from '../../test-utils';
import TileUserJoined from './index';

test('has message text', () => {
  const text = 'Tabs has joined the room!';
  fetch.mockResponse(JSON.stringify({ data: {} }));

  renderWithTheme(<TileUserJoined message={{ text }} />);

  expect(screen.getByText(text)).toBeInTheDocument();
});

test('has a gif as background', async () => {
  const gif = 'https://www.giphy.com/applause.gif';
  fetch.mockResponse(JSON.stringify({ data: { images: { ['downsized_medium']: { url: gif } } } }));

  const { container } = renderWithTheme(<TileUserJoined message={{ text: '' }} />);

  await waitFor(() => expect(container.firstElementChild).toHaveStyleRule('background-image', `url("${gif}")`));
});
