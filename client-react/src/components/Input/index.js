import React from 'react';
import styled from 'styled-components';

const Input = ({ type = 'text', value, setValue, ...props }) => {
  const handleChange = (event) => setValue(event.target.value);

  return <StyledInput type={type} value={value} onChange={handleChange} {...props} />;
};

export default Input;

const StyledInput = styled.input``;
