import React from 'react';
import styled from '@emotion/styled';

const Button = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

export default Button;

const StyledButton = styled.button`
  width: 3.5rem;
  height: 3.5rem;
  border: 0;
  border-radius: 50%;
  background-color: inherit;
  color: inherit;
`;
