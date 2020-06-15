import Tile from '../Tile';
import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const TileForm = ({ appearance, children, onSubmit }) => {
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

TileForm.propTypes = {
  appearance: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default TileForm;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.color.white};
`;
