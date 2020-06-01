import Tile from '../Tile';
import React from 'react';
import styled from '@emotion/styled';

const TileForm = ({ appearance, onSubmit, children }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <Tile appearance={appearance}>
      <StyledForm onSubmit={handleSubmit}>{children}</StyledForm>
    </Tile>
  );
};

export default TileForm;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.color.white};
`;
