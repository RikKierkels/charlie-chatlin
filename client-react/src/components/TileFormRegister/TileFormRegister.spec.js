import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithTheme } from '../../test-utils';
import TileFormRegister from './index';
import userEvent from '@testing-library/user-event';

const username = () => screen.getByLabelText('username');

test('should focus the input', () => {
  renderWithTheme(<TileFormRegister onSubmit={() => {}} />);
  expect(username()).toHaveFocus();
});

test('should trim the username before submitting it', () => {
  const onSubmitSpy = jest.fn();
  renderWithTheme(<TileFormRegister onSubmit={onSubmitSpy} />);

  userEvent.type(username(), '     Tabs      ');
  userEvent.click(screen.getByRole('button', { name: /register/i }));

  expect(onSubmitSpy).toHaveBeenCalledWith('Tabs');
});
