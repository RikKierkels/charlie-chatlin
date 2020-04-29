import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../Input';
import Button from '../Button';
import { ReactComponent as RegisterIcon } from '../../assets/icons/door-open.svg';
import Tile from '../Tile';
import theme from '../../design/theme';

const TileRegister = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(username);
  };

  return (
    <Tile backgroundColor={theme.color.poisonGreen}>
      <StyledForm onSubmit={handleSubmit}>
        <Input required value={username} onValueChange={setUsername} />
        <SubmitButton type="submit" aria-label="Register">
          <StyledRegisterIcon />
        </SubmitButton>
      </StyledForm>
    </Tile>
  );
};

export default TileRegister;

const StyledForm = styled.form`
  color: ${({ theme }) => theme.color.white};
`;

const SubmitButton = styled(Button)`
  background-color: ${({ theme }) => theme.color.grassGreen};
`;

const StyledRegisterIcon = styled(RegisterIcon)`
  fill: ${({ theme }) => theme.color.white};
  width: 1.5rem;
`;
