import React from 'react';
import styled from '@emotion/styled';

const Input = ({ type = 'text', value, onValueChange, ...props }) => {
  const handleChange = (event) => onValueChange(event.target.value);

  return <StyledInput type={type} value={value} onChange={handleChange} {...props} />;
};

export default Input;

const StyledInput = styled.input`
  border: 0;
  outline: none;
  font-size: 1.3rem;
  background-color: inherit;
  color: inherit;
`;
