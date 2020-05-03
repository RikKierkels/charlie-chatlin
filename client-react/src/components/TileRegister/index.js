import React, { useState } from 'react';
import styled from '@emotion/styled';
import Input from '../Input';
import Button from '../Button';
import { ReactComponent as RegisterIcon } from '../../assets/icons/door-open.svg';
import Tile from '../Tile';
import { lima } from '../../design/shared-styles';

const TileRegister = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(username);
  };

  return (
    <Tile appearance={lima}>
      <StyledForm onSubmit={handleSubmit}>
        <Input
          required
          value={username}
          placeholder="Your username"
          aria-label="username"
          onValueChange={setUsername}
        />
        <SubmitButton type="submit" aria-label="Register">
          <StyledRegisterIcon />
        </SubmitButton>
      </StyledForm>
    </Tile>
  );
};

export default TileRegister;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.color.white};
`;

const SubmitButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing.sm};
  align-self: flex-end;
  background-color: ${({ theme }) => theme.color.conifer};
`;

const StyledRegisterIcon = styled(RegisterIcon)`
  fill: ${({ theme }) => theme.color.white};
  width: 1.5rem;
`;
