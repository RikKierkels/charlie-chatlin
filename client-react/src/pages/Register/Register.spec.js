import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithThemeAndRedux } from '../../test-utils';
import userEvent from '@testing-library/user-event';
import Register from './index';
import chat from '../../shared/chat';
import avatars from '../../shared/avatars';

jest.mock('../../shared/chat.js');

beforeEach(() => {
  jest.clearAllMocks();
});

const usernameInput = () => screen.getByLabelText(/username/i);
const registerButton = () => screen.getByRole('button', { name: /register/i });
const avatar = () => screen.getByRole('button', { name: /doge/i });

test('renders all avatars', () => {
  renderWithThemeAndRedux(<Register />);

  avatars
    .map((avatar) => avatar.name)
    .forEach((avatarName) =>
      expect(screen.getByRole('button', { name: `Select ${avatarName} as your avatar` })).toBeInTheDocument(),
    );
});

test('registers a user', async () => {
  renderWithThemeAndRedux(<Register />);

  await userEvent.type(usernameInput(), 'Tabs');
  userEvent.click(avatar());
  userEvent.click(registerButton());

  expect(chat.registerUser).toHaveBeenCalledTimes(1);
  expect(chat.registerUser).toHaveBeenCalledWith('Tabs', 'doge');
});

test('cannot register without selecting an avatar and a username', () => {
  renderWithThemeAndRedux(<Register />);

  userEvent.click(registerButton());

  expect(chat.registerUser).toHaveBeenCalledTimes(0);
});

test('cannot register without selecting an avatar', async () => {
  renderWithThemeAndRedux(<Register />);

  await userEvent.type(usernameInput(), 'Tabs');
  userEvent.click(registerButton());

  expect(chat.registerUser).toHaveBeenCalledTimes(0);
});

test('cannot register without entering a username', () => {
  renderWithThemeAndRedux(<Register />);

  userEvent.click(avatar());
  userEvent.click(registerButton());

  expect(chat.registerUser).toHaveBeenCalledTimes(0);
});
