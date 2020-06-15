import React, { useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { StyledButton, StyledTextarea, violet } from '../../design/shared-styles';
import TileForm from '../TileForm';
import { ReactComponent as SendIcon } from '../../assets/icons/paper-plane.svg';

const TileFormMessage = ({ onSubmit }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = () => onSubmit(message.trim());
  const handleKeyDown = (event) => {
    if (event.key !== 'Enter' || event.shiftKey) return;
    event.preventDefault();
    handleSubmit();
  };

  return (
    <TileForm appearance={violet} onSubmit={handleSubmit}>
      <StyledTextarea
        rows={5}
        required
        placeholder="Start typing to create your message"
        aria-label="message"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyDown={handleKeyDown}
        ref={(textarea) => textarea && textarea.focus()}
      />
      <SubmitButton type="submit" aria-label="Send">
        <StyledSendIcon />
      </SubmitButton>
    </TileForm>
  );
};

TileFormMessage.propTypes = { onSubmit: PropTypes.func.isRequired };

export default TileFormMessage;

const SubmitButton = styled(StyledButton)`
  margin-top: ${({ theme }) => theme.spacing.sm};
  align-self: flex-end;
  background-color: ${({ theme }) => theme.color.electricVioletLight};
`;

const StyledSendIcon = styled(SendIcon)`
  fill: ${({ theme }) => theme.color.cyan};
  width: 1.5rem;
`;
