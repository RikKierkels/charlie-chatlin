import React from 'react';
import { screen, waitFor } from '@testing-library/dom';
import { renderWithTheme } from '../../test/utils';
import TileUserJoined from './index';

test('has message text', () => {
  const text = 'Tabs has joined the room!';

  renderWithTheme(<TileUserJoined message={{ text }} />);

  expect(screen.getByText(text)).toBeInTheDocument();
});

test('has a gif as background image', async () => {
  const { container } = renderWithTheme(<TileUserJoined message={{ text: '' }} />);

  await waitFor(() => expect(container.firstElementChild).toHaveStyleRule('background-image', /.gif/));
});
