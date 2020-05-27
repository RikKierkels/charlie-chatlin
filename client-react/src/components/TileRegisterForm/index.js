import React, { useState } from 'react';
import styled from '@emotion/styled';
import { ReactComponent as RegisterIcon } from '../../assets/icons/door-open.svg';
import Tile from '../Tile';
import { lima, StyledButton, StyledInput } from '../../design/shared-styles';

const TileRegisterForm = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(username);
  };

  return (
    <Tile appearance={lima}>
      <StyledForm onSubmit={handleSubmit}>
        <StyledInput
          type="text"
          required
          placeholder="Your username"
          aria-label="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <SubmitButton type="submit" aria-label="Register">
          <StyledRegisterIcon />
        </SubmitButton>
      </StyledForm>
    </Tile>
  );
};

export default TileRegisterForm;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.color.white};
Ø`;

const SubmitButton = styled(StyledButton)`
  margin-top: ${({ theme }) => theme.spacing.sm};
  align-self: flex-end;
  background-color: ${({ theme }) => theme.color.conifer};
`;

const StyledRegisterIcon = styled(RegisterIcon)`
  fill: ${({ theme }) => theme.color.white};
  width: 1.5rem;
`;
