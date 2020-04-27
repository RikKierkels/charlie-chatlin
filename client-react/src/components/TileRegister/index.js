import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../Input';
import Button from '../Button';
import { ReactComponent as RegisterIcon } from '../../assets/icons/door-open.svg';
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
      <SubmitButton>
        <StyledRegisterIcon />
      </SubmitButton>
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

const SubmitButton = styled(Button)`
  background-color: ${({ theme }) => theme.color.grassGreen};
`;

const StyledRegisterIcon = styled(RegisterIcon)`
  fill: ${({ theme }) => theme.color.white};
  width: 1.5rem;
`;
