import React from 'react';
import { css } from '@emotion/core';
import { renderWithTheme } from '../../test/utils';
import Tile from './index';

test('sets the provided appearance', () => {
  const appearance = css`
    background-color: green;
    color: red;
  `;

  const { container } = renderWithTheme(<Tile appearance={appearance} />);

  expect(container.firstElementChild).toHaveStyleRule('color', 'red');
  expect(container.firstElementChild).toHaveStyleRule('background-color', 'green');
});

test('sets an appearance when none is provided', () => {
  const hasValue = /#.+/;
  const { container } = renderWithTheme(<Tile />);

  expect(container.firstElementChild).toHaveStyleRule('color', hasValue);
  expect(container.firstElementChild).toHaveStyleRule('background-color', hasValue);
});
