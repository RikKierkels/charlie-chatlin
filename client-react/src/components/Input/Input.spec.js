import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import Input from './index';
import userEvent from '@testing-library/user-event';

const InputWrapper = () => {
  const [value, setValue] = useState('');

  return (
    <>
      {value && <span>{value}</span>}
      <Input value={value} setValue={setValue} />
    </>
  );
};

test('updates value when the user types', async () => {
  render(<InputWrapper />);

  await userEvent.type(screen.getByRole('textbox'), 'Hello World!');

  screen.getByText('Hello World!');
});
