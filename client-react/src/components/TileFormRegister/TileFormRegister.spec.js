import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithTheme } from '../../test-utils';
import TileFormRegister from './index';

test('should focus the input', () => {
  renderWithTheme(<TileFormRegister />);
  expect(screen.getByLabelText('username')).toHaveFocus();
});
