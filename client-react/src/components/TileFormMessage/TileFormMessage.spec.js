import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithTheme } from '../../test-utils';
import TileFormMessage from './index';
import userEvent from '@testing-library/user-event';

const textarea = () => screen.getByLabelText(/message/i);
const submitButton = () => screen.getByRole('button', { name: /send/i });

test('should focus the textarea', () => {
  renderWithTheme(<TileFormMessage onSubmit={() => {}} />);
  expect(textarea()).toHaveFocus();
});

test('trims the message before submitting it', async () => {
  const onSubmitSpy = jest.fn();
  renderWithTheme(<TileFormMessage onSubmit={onSubmitSpy} />);

  await userEvent.type(textarea(), "     I've got some whitespace     ");
  userEvent.click(submitButton());
  expect(onSubmitSpy).toHaveBeenCalledWith("I've got some whitespace");
});

test('submits the form when the enter key is pressed', async () => {
  const onSubmitSpy = jest.fn();
  renderWithTheme(<TileFormMessage onSubmit={onSubmitSpy} />);

  await userEvent.type(textarea(), 'I should submit');
  fireEvent.keyDown(textarea(), { key: 'Enter', code: 'Enter' });

  expect(onSubmitSpy).toHaveBeenCalledTimes(1);
  expect(onSubmitSpy).toHaveBeenCalledWith('I should submit');
});

test('does not submit the form when the enter key and the shift key are pressed', async () => {
  const onSubmitSpy = jest.fn();
  renderWithTheme(<TileFormMessage onSubmit={onSubmitSpy} />);

  await userEvent.type(textarea(), "I shouldn't submit");
  fireEvent.keyDown(textarea(), { key: 'Enter', code: 'Enter', shiftKey: true });

  expect(onSubmitSpy).toHaveBeenCalledTimes(0);
});
