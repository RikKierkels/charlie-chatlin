import React from 'react';
import Tile from './index';
import { renderWithTheme } from '../../test-utils';
import theme from '../../design/theme';

test('sets the background color when provided', () => {
  const color = theme.color.poisonGreen;
  const { container } = renderWithTheme(<Tile backgroundColor={color} />);

  expect(container.firstElementChild).toHaveStyle(`background-color: ${color}`);
});

test('sets a random background when not provided', () => {
  const { container } = renderWithTheme(<Tile />);

  expect(container.firstElementChild).toHaveStyle(`background-color:`);
});
