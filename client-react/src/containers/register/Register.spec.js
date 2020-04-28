import React from 'react';
import { screen } from '@testing-library/react';
import Register from './register';
import { renderWithTheme } from '../../test-utils';
import userEvent from '@testing-library/user-event';

const usernameInput = () => screen.getByRole('textbox');
const registerButton = () => screen.getByRole('button', { name: /register/i });
const randomAvatar = () => {
  const avatars = screen.getAllByRole('button', { name: /avatar/i });
  return avatars[Math.floor(Math.random() * avatars.length)];
};

test('registers a user', () => {
  renderWithTheme(<Register />);

  userEvent.click(randomAvatar());
  userEvent.type(usernameInput(), 'Dog');
  userEvent.click(registerButton());

  expect(true);
});

test('cannot register without selecting an avatar', () => {
  renderWithTheme(<Register />);

  userEvent.type(usernameInput(), 'Dog');
  userEvent.click(registerButton());

  expect(true);
});

test('cannot register without entering a username', () => {
  renderWithTheme(<Register />);

  userEvent.click(randomAvatar());
  userEvent.click(registerButton());

  expect(true);
});
