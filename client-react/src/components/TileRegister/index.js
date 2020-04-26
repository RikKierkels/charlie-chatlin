import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../Input';
import Button from '../Button';
import RegisterIcon from '../../assets/icons/door-open.svg';
import { tile } from '../../design/shared-styles';

const TileRegister = (onSubmit) => {
  const [username, setUsername] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(username);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Input required value={username} onValueChange={setUsername} />
      <Button>
        <RegisterIcon />
      </Button>
    </StyledForm>
  );
};

export default TileRegister;

const StyledForm = styled.form`
  ${tile};
  background-color: ${({ theme }) => theme.color.poisonGreen};
  color: ${({ theme }) => theme.color.white};
  padding: ${({ theme }) => theme.spacing.md};
`;
