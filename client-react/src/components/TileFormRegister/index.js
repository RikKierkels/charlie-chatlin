import React, { useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { ReactComponent as RegisterIcon } from '../../assets/icons/door-open.svg';
import { lima, StyledButton, StyledInput } from '../../design/shared-styles';
import TileForm from '../TileForm';

const TileFormRegister = ({ onSubmit }) => {
  const [username, setUsername] = useState('');

  return (
    <TileForm appearance={lima} onSubmit={() => onSubmit(username.trim())}>
      <StyledInput
        type="text"
        required
        placeholder="Your username"
        aria-label="username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        ref={(input) => input && input.focus()}
      />
      <SubmitButton type="submit" aria-label="Register">
        <StyledRegisterIcon />
      </SubmitButton>
    </TileForm>
  );
};

TileFormRegister.propTypes = { onSubmit: PropTypes.func.isRequired };

export default TileFormRegister;

const SubmitButton = styled(StyledButton)`
  margin-top: ${({ theme }) => theme.spacing.sm};
  align-self: flex-end;
  background-color: ${({ theme }) => theme.color.conifer};
`;

const StyledRegisterIcon = styled(RegisterIcon)`
  fill: ${({ theme }) => theme.color.white};
  width: 1.5rem;
`;
