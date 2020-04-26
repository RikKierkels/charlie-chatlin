import React from 'react';
import { render } from '@testing-library/react';
import Button from './index';

test("should render it's children", () => {
  const { container } = render(
    <Button>
      <span>Hello World!</span>
    </Button>,
  );

  expect(container.firstChild).toMatchSnapshot();
});
