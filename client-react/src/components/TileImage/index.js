import React from 'react';
import styled from '@emotion/styled';
import Tile from '../Tile';
import PropTypes from 'prop-types';
import { biscay } from '../../design/shared-styles';

const TileImage = ({ image, alt = '' }) => {
  return (
    <Tile appearance={biscay}>
      <StyledImage src={image} alt={alt} />
    </Tile>
  );
};

TileImage.propTypes = { image: PropTypes.string.isRequired, alt: PropTypes.string };

export default TileImage;

const StyledImage = styled.img`
  width: 100%;
`;
